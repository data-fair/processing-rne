const download = require('./src/download')
const process = require('./src/process')
const upload = require('./src/upload')

exports.run = async ({ processingConfig, tmpDir, axios, log, patchConfig }) => {
  await log.step('Configuration')
  await log.info(`Jeu de données à traiter : ${processingConfig.datasetID}`)
  await log.info(`Etat jeu(x) de données : ${processingConfig.fileMerge}`)

  await download(processingConfig, tmpDir, axios, log)
  await process(processingConfig, tmpDir, axios, log, patchConfig)
  await upload(processingConfig, tmpDir, axios, log, patchConfig)
}
