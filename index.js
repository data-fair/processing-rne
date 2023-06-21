const download = require('./lib/download')
const process = require('./lib/process')
const upload = require('./lib/upload')

exports.run = async ({ processingConfig, tmpDir, axios, log, patchConfig }) => {
  await log.step('Configuration')
  await log.info(`Jeu de données à traiter : ${processingConfig.datasetID}`)
  await log.info(`Etat jeu(x) de données : ${processingConfig.fileMerge}`)

  await download(processingConfig, tmpDir, axios, log)
  await process(processingConfig, tmpDir, axios, log, patchConfig)
  await upload(processingConfig, tmpDir, axios, log, patchConfig)
}
