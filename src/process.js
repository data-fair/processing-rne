const fs = require('fs-extra')
const path = require('path')
const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)
require('dayjs/locale/fr')
const iconv = require('iconv-lite')
const { parse } = require('csv-parse/sync')
const csvStringify = require('csv-stringify/sync').stringify
const { mandat, schemas, schemasRaw } = require('./data.js')
const upload = require('./upload.js')

const items = []
const parserOpts = { delimiter: '\t' }

function formatedValue (value) {
  if (value && value.indexOf('/') > 0) {
    const toks = value.split('/')
    return toks[2] + '-' + toks[1].padStart(2, '0') + '-' + toks[0].padStart(2, '0')
  } else return value && value.replace(/"/g, '""')
}

module.exports = async (processingConfig, tmpDir, axios, log, patchConfig) => {
  const commonFields = ['Nom de l\'élu', 'Prénom de l\'élu', 'Code sexe', 'Date de naissance', 'Code de la catégorie socio-professionnelle', 'Libellé de la catégorie socio-professionnelle', 'Date de début du mandat']
  let delimiter = ';'
  if (processingConfig.separator === ';') delimiter = ','
  await log.step('Traitement des fichiers')
  let dir = await fs.readdir(tmpDir)
  dir = dir.filter(file => file.startsWith('rne'))
  const elus = {}
  for (const file of dir) {
    await log.info(`Traitement de ${file}`)
    const data = iconv.decode(fs.readFileSync(path.join(tmpDir, file)), 'UTF-8')
    const lines = parse(data, parserOpts)
    const header = lines.shift()
    const indices = commonFields.map(f => header.indexOf(f))
    const mandatId = file.split('-')[1].split('.')[0]
    const mandatName = mandat[mandatId]
    const schemaRaw = schemasRaw[mandatId]
    const schema = schemas[mandatId]
    const filesItems = []

    lines.forEach(line => {
      if (line.length === header.length) {
        const id = `${line[indices[1]]} ${line[indices[0]]} ${line[indices[3]]}`
        elus[id] = elus[id] || Object.assign({
          Mandats: [],
          DatesMandats: [],
          Identifiant: id
        }, ...commonFields.map((f, i) => ({ [f]: formatedValue(line[indices[i]]) })))
        if (elus[id].Mandats.indexOf(mandatName) < 0) {
          elus[id].Mandats.push(mandatName)
          elus[id].DatesMandats.push(line[indices[6]])
        }
        if (!processingConfig.fileMerge) {
          const item = Object.assign({}, ...schemaRaw.map((field, i) => ({ [field.key]: formatedValue(line[i]) })))
          const dateDebutMandat = item.date_de_debut_mandat
          delete item.date_de_debut_mandat
          item.age = dayjs().diff(item.date_de_naissance, 'years')
          item.mandat = mandatName
          item.date_de_debut_mandat = dateDebutMandat
          item.identifiant = id
          filesItems.push(item)
        }
      }
    })
    if (!processingConfig.fileMerge) {
      const tmpWriteStream = await fs.openSync(path.join(tmpDir, 'Repertoire-national-des-elus.csv'), 'w')
      await fs.writeSync(tmpWriteStream, csvStringify(filesItems, { header: true, delimiter: delimiter, columns: schema.map(field => field.key) }))
      await upload(processingConfig, tmpDir, axios, log, patchConfig, mandatId)
    }
  }
  await log.info('Ecriture du fichier csv final')
  const writeStream = await fs.openSync(path.join(tmpDir, 'Repertoire-national-des-elus.csv'), 'w')
  Object.values(elus).forEach(elu => {
    const item = [
      elu[commonFields[0]],
      elu[commonFields[1]],
      elu[commonFields[2]],
      elu[commonFields[3]],
      elu[commonFields[3]] ? dayjs().diff(elu[commonFields[3]], 'years') : '',
      elu[commonFields[4]],
      elu[commonFields[5]],
      elu.Mandats.join(';'),
      elu.DatesMandats.join(';'),
      elu.Identifiant
    ]
    items.push(item)
  })
  const fields = schemas.elu.map((field) => field.key)
  await fs.writeSync(writeStream, csvStringify(items, { header: true, delimiter: delimiter, columns: fields }))
}
