const FormData = require('form-data')
const path = require('path')
const fs = require('fs-extra')
const util = require('util')
const { schemas } = require('./data.js')

function displayBytes (aSize) {
  aSize = Math.abs(parseInt(aSize, 10))
  if (aSize === 0) return '0 octets'
  const def = [[1, 'octets'], [1000, 'ko'], [1000 * 1000, 'Mo'], [1000 * 1000 * 1000, 'Go'], [1000 * 1000 * 1000 * 1000, 'To'], [1000 * 1000 * 1000 * 1000 * 1000, 'Po']]
  for (let i = 0; i < def.length; i++) {
    if (aSize < def[i][0]) return (aSize / def[i - 1][0]).toLocaleString() + ' ' + def[i - 1][1]
  }
}

module.exports = async (processingConfig, tmpDir, axios, log, patchConfig) => {
  let files, dataset

  async function getFiles () {
    let length = 0
    let required = 0
    if (processingConfig.datasetMode === 'update') {
      await log.step('Mise à jour du jeu de données')
    } else {
      await log.step('Création du jeu de données')
    }
    if (processingConfig.fileMerge === 'merge') {
      await log.info('Fusion dans un jeu de données')
      required = 1
    } else if (processingConfig.fileMerge === 'split') {
      await log.info('Découpage en jeux de données')
      required = 12
    } else {
      await log.info('Création d\'un jeu de données par fichier et fusion')
      required = 13
    }
    while (length !== required) {
      files = await fs.readdir(tmpDir)
      files = files.filter(file => file.includes('RNE'))
      length = files.length
    }
    files = await fs.readdir(tmpDir)
    files = files.filter(file => file.includes('RNE'))
  }

  await getFiles(processingConfig.fileMerge)

  await log.info(`Nombre de fichiers à traiter : ${files.length}`)
  for (const file of files) {
    if (file.includes('RNE-')) {
      if (processingConfig.fileMerge === 'split' || processingConfig.fileMerge === 'all') {
        await log.info(`Chargement du fichier ${file}`)
        const formData = new FormData()
        const id = file.split('RNE-')[1].split('.')[0]
        const datasetSchema = schemas[id]
        formData.append('schema', JSON.stringify(datasetSchema))
        formData.append('title', 'RNE - ' + id)
        const filePath = path.join(tmpDir, file)
        formData.append('dataset', fs.createReadStream(filePath), { filename: 'RNE-' + id + '.csv' })
        formData.getLength = util.promisify(formData.getLength)
        const contentLength = await formData.getLength()
        await log.info(`chargement de ${displayBytes(contentLength)}`)
        dataset = (await axios({
          method: 'post',
          url: `api/v1/datasets/rne-${id}`,
          data: formData,
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
          headers: { ...formData.getHeaders(), 'content-length': contentLength }
        })).data
      }
    } else {
      if (processingConfig.fileMerge === 'merge' || processingConfig.fileMerge === 'all') {
        await log.info('Chargment du fichier fusionné : ' + file)
        const formData = new FormData()
        const datasetSchema = schemas.elu
        formData.append('schema', JSON.stringify(datasetSchema))
        formData.append('title', processingConfig.dataset.title)
        const filePath = path.join(tmpDir, 'RNE.csv')
        formData.append('dataset', fs.createReadStream(filePath), { filename: 'RNE.csv' })
        formData.getLength = util.promisify(formData.getLength)
        const contentLength = await formData.getLength()
        await log.info(`chargement de ${displayBytes(contentLength)}`)
        dataset = (await axios({
          method: 'post',
          url: (processingConfig.dataset && processingConfig.dataset.id) ? `api/v1/datasets/${processingConfig.dataset.id}` : 'api/v1/datasets',
          data: formData,
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
          headers: { ...formData.getHeaders(), 'content-length': contentLength }
        })).data
        await patchConfig({ datasetMode: 'update', dataset: { id: dataset.id, title: dataset.title } })
      }
    }
    if (processingConfig.datasetMode === 'update') {
      await log.info(`jeu de donnée mis à jour, id="${dataset.id}", title="${dataset.title}"`)
    } else {
      await log.info(`jeu de donnée créé, id="${dataset.id}", title="${dataset.title}"`)
    }
  }
  if (processingConfig.clearFiles) {
    await fs.remove(tmpDir)
  }
}
