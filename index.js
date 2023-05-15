const download = require('./src/download')
const process = require('./src/process')
const upload = require('./src/upload')

exports.run = async ({ processingConfig, tmpDir, axios, log, patchConfig }) => {
  await log.step('Configuration')
  await log.info(`Jeu de données à traiter : ${processingConfig.datasetID}`)
  await log.info(`Fusion jeu de données : ${processingConfig.fileMerge}`)

  await download(processingConfig, tmpDir, axios, log)
  await process(processingConfig, tmpDir, axios, log, patchConfig)

  if (processingConfig.fileMerge) {
    await log.info('Fusion du jeu de données')
  } else {
    await log.info('Le jeu de données est divisé en plusieurs fichiers')
  }

  await upload(processingConfig, tmpDir, axios, log, patchConfig)
}
