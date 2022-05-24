const download = require('./src/download')
const processData = require('./src/process')
const upload = require('./src/upload')

exports.run = async ({ processingConfig, tmpDir, axios, log, patchConfig }) => {
  await download(tmpDir, axios, log)
  await processData(tmpDir, log)
  if (!processingConfig.skipUpload) await upload(processingConfig, tmpDir, axios, log, patchConfig)
}