process.env.NODE_ENV = 'test'
const config = require('config')
const testUtils = require('@data-fair/processings-test-utils')
const rneProcessing = require('../')

describe('RNE', function () {
  it('should download, process files and upload a csv on the staging', async function () {
    this.timeout(1000000)
    const context = testUtils.context({
      pluginConfig: {
      },
      processingConfig: {
        clearFiles: false,
        datasetMode: 'update',
        dataset: { title: 'Répertoire National des Elus', id: 'repertoire-national-des-elus-fusion' },
        datasetID: 'repertoire-national-des-elus-1',
        separator: ';',
        fileMerge: 'all'
      },
      tmpDir: 'data/'
    }, config, false)
    await rneProcessing.run(context)
  })
})
