const fs = require('fs-extra')
const path = require('path')
const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)
require('dayjs/locale/fr')
const util = require('util')
const pump = util.promisify(require('pump'))
const stream = require('stream')
const csvStringify = require('csv-stringify/sync').stringify
const { schemas, schemasRaw } = require('./data.js')
const { parse } = require('csv-parse')

const items = []
module.exports = async (processingConfig, tmpDir, axios, log, patchConfig) => {
  const commonFields = [
    'Nom de l\'élu',
    'Prénom de l\'élu',
    'Code sexe',
    'Date de naissance',
    'Code de la catégorie socio-professionnelle',
    'Libellé de la catégorie socio-professionnelle',
    'Date de début du mandat'
  ]
  let delimiter = ';'
  if (processingConfig.separator === ';') delimiter = ','
  await log.step('Traitement des fichiers')
  let dir = await fs.readdir(tmpDir)
  dir = dir.filter(file => file.startsWith('elus'))
  // Put elus-municipal.csv first
  const index = dir.indexOf('elus-municipaux-cm.csv')
  const tmp = dir[0]
  dir[0] = dir[index]
  dir[index] = tmp

  // Update for the dataset of 30 november 2023
  const convertMandatId = {
    'municipaux-cm': 'municipal',
    'conseillers-departementaux-cd': 'conseiller-departemental',
    'conseillers-regionaux-cr': 'regional',
    'deputes-dep': 'depute',
    epci: 'epci',
    'membres-assemblees-ma': 'membre-assemblees',
    maires: 'maire',
    'parlementaires-europeens-rpe': 'representant-parlement-europeen',
    'senateurs-sen': 'senateur',
    'conseiller-arrondissement-ca': 'conseiller-arrondissement',
    'conseillers-fde': 'consulaire',
    afe: 'afe'
  }

  let elus = {}
  for (const file of dir) {
    await log.info(`Traitement de ${file}`)
    const mandatId = convertMandatId[file.split('elus-')[1].split('.')[0]]
    const schemaRaw = schemasRaw[mandatId]
    const schema = schemas[mandatId]
    let delimiterLecture = ','
    if (mandatId === 'consulaire' || mandatId === 'conseiller-arrondissement' || mandatId === 'afe') delimiterLecture = '\t'
    const filesItems = []
    const readStream = await fs.createReadStream(path.join(tmpDir, file), { encoding: 'utf8' })
    let indices
    await pump(
      readStream,
      parse({ delimiter: delimiterLecture }),
      new stream.Transform({
        objectMode: true,
        transform: (line, _, next) => {
          if (line[0].includes('Code') || line[0].includes('Nom')) {
            indices = commonFields.map(f => {
              line = line.map(item => item.replace('’', '\'').replace('Libellé catégorie', 'Libellé de la catégorie'))
              return line.indexOf(f)
            })
            next()
          } else {
            const dateRaw = new Date(line[indices[3]])
            let age = ''
            let dateNaissance = ''
            if (dateRaw.getFullYear() > 1900) {
              age = dayjs().diff(dateRaw, 'years')
              dateNaissance = dateRaw.getFullYear() + '-' + (dateRaw.getMonth() + 1).toString().padStart(2, '0') + '-' + dateRaw.getDate().toString().padStart(2, '0')
            }
            const id = `${line[indices[1]]} ${line[indices[0]]} ${dateNaissance}`
            elus[id] = elus[id] || Object.assign({
              Mandats: [],
              DatesMandats: []
            }, ...commonFields.map((f, i) => ({ [f]: line[indices[i]] })))
            if (processingConfig.fileMerge === 'all' || processingConfig.fileMerge === 'split') {
              const item = Object.assign({}, ...schemaRaw.map((field, i) => ({ [field.key]: line[i] })))
              let dateDebutMandatRaw
              if (mandatId === 'consulaire' || mandatId === 'conseiller-arrondissement' || mandatId === 'afe') {
                dateDebutMandatRaw = new Date(item.date_debut_mandat)
              } else {
                dateDebutMandatRaw = new Date(dayjs(item.date_debut_mandat, 'DD/MM/YYYY').format('YYYY-MM-DD'))
              }
              const dateDebutMandat = dateDebutMandatRaw.getFullYear() + '-' + (dateDebutMandatRaw.getMonth() + 1).toString().padStart(2, '0') + '-' + dateDebutMandatRaw.getDate().toString().padStart(2, '0')
              if (item.date_debut_fonction) {
                let dateDebutFonctionRaw
                if (mandatId === 'consulaire' || mandatId === 'conseiller-arrondissement' || mandatId === 'afe') {
                  dateDebutFonctionRaw = new Date(item.date_debut_fonction)
                } else {
                  dateDebutFonctionRaw = new Date(dayjs(item.date_debut_fonction, 'DD/MM/YYYY').format('YYYY-MM-DD'))
                }
                item.date_debut_fonction = dateDebutFonctionRaw.getFullYear() + '-' + (dateDebutFonctionRaw.getMonth() + 1).toString().padStart(2, '0') + '-' + dateDebutFonctionRaw.getDate().toString().padStart(2, '0')
              }
              delete item.date_debut_mandat
              item.age = age
              item.date_naissance_elu = dateNaissance
              item.mandat = mandatId
              item.date_debut_mandat = dateDebutMandat
              item.identifiant = id
              if (elus[id].Mandats.indexOf(mandatId) < 0) {
                elus[id].Mandats.push(mandatId)
                elus[id].DatesMandats.push(dateDebutMandat)
              }
              filesItems.push(item)
            }
            next()
          }
        }
      })
    )
    if (processingConfig.fileMerge === 'all' || processingConfig.fileMerge === 'split') {
      const tmpWriteStream = await fs.createWriteStream(path.join(tmpDir, 'RNE-' + mandatId + '.csv'), { encoding: 'utf8' })
      await tmpWriteStream.write(csvStringify(filesItems, { header: true, delimiter: delimiter, columns: schema.map(field => field.key) }))
    }
  }
  if (processingConfig.fileMerge === 'all' || processingConfig.fileMerge === 'merge') {
    await log.info('Fusion des fichiers')
    const writeStream = await fs.createWriteStream(path.join(tmpDir, 'RNE.csv'), { encoding: 'utf8' })
    Object.values(elus).forEach(elu => {
      if (elu.Mandats.includes('maire')) {
        const index = elu.Mandats.indexOf('municipal')
        elu.Mandats.splice(index, 1)
        elu.DatesMandats.splice(index, 1)
      }
      const dateRaw = new Date(elu[commonFields[3]].split(' ')[0])
      let date = ''
      let age = ''
      if (dateRaw.getFullYear() > 1900) {
        date = dateRaw.getFullYear() + '-' + (dateRaw.getMonth() + 1).toString().padStart(2, '0') + '-' + dateRaw.getDate().toString().padStart(2, '0')
        age = dayjs().diff(dateRaw, 'years')
      }
      const item = [
        elu[commonFields[0]],
        elu[commonFields[1]],
        elu[commonFields[2]],
        date,
        age,
        elu[commonFields[4]],
        elu[commonFields[5]],
        elu.Mandats.join(';'),
        elu.Mandats.length,
        elu.DatesMandats.join(';'),
        elu[commonFields[7]] ? elu[commonFields[7]] : '',
        elu[commonFields[8]] ? elu[commonFields[8]] : '',
        elu[commonFields[9]] ? elu[commonFields[9]] : '',
        elu[commonFields[1]] + ' ' + elu[commonFields[0]] + ' ' + date
      ]
      items.push(item)
    })
    const fields = schemas.elu.map((field) => field.key)
    await writeStream.write(csvStringify(items, { header: true, delimiter: delimiter, columns: fields }))
    await writeStream.end()
    elus = {}
  }
  await log.info('Traitement des fichiers terminé')
}
