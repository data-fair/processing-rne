process.env.NODE_ENV = 'test'
const config = require('config')
const rneProcessing = require('../')

describe('RNE', function () {
  it('should download, process files and upload a csv on the staging', async function () {
    this.timeout(1000000)

    const testsUtils = await import('@data-fair/lib/processings/tests-utils.js')
    const context = testsUtils.context({
      pluginConfig: {
      },
      processingConfig: {
        clearFiles: false,
        datasetMode: 'update',
        dataset: { title: 'Répertoire National des Elus' },
        datasetID: 'repertoire-national-des-elus-1',
        separator: ';',
        fileMerge: 'all'
      },
      tmpDir: 'data/'
    }, config, false)
    await rneProcessing.run(context)
  })
})
