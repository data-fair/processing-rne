const fs = require('fs-extra')
const path = require('path')
const util = require('util')
const pump = util.promisify(require('pump'))

const withStreamableFile = async (filePath, fn) => {
  // creating empty file before streaming seems to fix some weird bugs with NFS
  await fs.ensureFile(filePath + '.tmp')
  await fn(fs.createWriteStream(filePath + '.tmp'))
  // write in tmp file then move it for a safer operation that doesn't create partial files
  await fs.move(filePath + '.tmp', filePath, { overwrite: true })
}
// processingConfig
module.exports = async (processingConfig, dir = 'data', axios, log) => {
  const res = await axios.get('https://www.data.gouv.fr/api/1/datasets/' + processingConfig.datasetID + '/')

  const ressources = res.data.resources
  await log.step('Téléchargement des fichiers')
  for (const file of ressources) {
    await log.info(`Téléchargement de ${file.title}`)
    const url = new URL(file.url)
    const fileName = path.parse(url.pathname).base
    const filePath = `${dir}/${fileName}`
    await withStreamableFile(filePath, async (writeStream) => {
      const res = await axios({ url: url.href, method: 'GET', responseType: 'stream' })
      await pump(res.data, writeStream)
    })
  }
}
