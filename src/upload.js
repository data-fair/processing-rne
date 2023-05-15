const FormData = require('form-data')
const path = require('path')
const fs = require('fs-extra')
const util = require('util')
const { schemas, mandat } = require('./data.js')

function displayBytes (aSize) {
  aSize = Math.abs(parseInt(aSize, 10))
  if (aSize === 0) return '0 octets'
  const def = [[1, 'octets'], [1000, 'ko'], [1000 * 1000, 'Mo'], [1000 * 1000 * 1000, 'Go'], [1000 * 1000 * 1000 * 1000, 'To'], [1000 * 1000 * 1000 * 1000 * 1000, 'Po']]
  for (let i = 0; i < def.length; i++) {
    if (aSize < def[i][0]) return (aSize / def[i - 1][0]).toLocaleString() + ' ' + def[i - 1][1]
  }
}

module.exports = async (processingConfig, tmpDir, axios, log, patchConfig, id) => {
  const formData = new FormData()

  if (processingConfig.datasetMode === 'update') {
    await log.step('Mise à jour du jeu de données')
  } else {
    await log.step('Création du jeu de données')
  }

  let dataset
  if (id) {
    const datasetSchema = schemas[id]
    formData.append('schema', JSON.stringify(datasetSchema))
    formData.append('title', 'Repertoire National des Elus - ' + mandat[id])
    const filePath = path.join(tmpDir, 'Repertoire-national-des-elus.csv')
    formData.append('dataset', fs.createReadStream(filePath), { filename: 'Repertoire-national-des-elus.csv' })
    formData.getLength = util.promisify(formData.getLength)
    const contentLength = await formData.getLength()
    await log.info(`chargement de ${displayBytes(contentLength)}`)
    dataset = (await axios({
      method: 'post',
      url: `api/v1/datasets/repertoire-national-des-elus-${id}`,
      data: formData,
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      headers: { ...formData.getHeaders(), 'content-length': contentLength }
    })).data
    await fs.removeSync(path.join(tmpDir, 'Repertoire-national-des-elus.csv'))
  } else {
    await log.info('Fichier complet')
    const datasetSchema = schemas.elu
    formData.append('schema', JSON.stringify(datasetSchema))
    formData.append('title', processingConfig.dataset.title)
    const filePath = path.join(tmpDir, 'Repertoire-national-des-elus.csv')
    formData.append('dataset', fs.createReadStream(filePath), { filename: 'Repertoire-national-des-elus.csv' })
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
  }
  if (processingConfig.datasetMode === 'update') {
    await log.info(`jeu de donnée mis à jour, id="${dataset.id}", title="${dataset.title}"`)
  } else {
    await log.info(`jeu de donnée créé, id="${dataset.id}", title="${dataset.title}"`)
  }
}
