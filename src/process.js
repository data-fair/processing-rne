const fs = require('fs-extra')
const path = require('path')
const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)
require('dayjs/locale/fr')
const iconv = require('iconv-lite')

const mandats = {
    '1': 'Conseiller Municipal',
    '2': 'Conseiller communautaire',
    '3': 'Conseiller départemental',
    '4': 'Conseiller régional',
    '5': 'Conseiller de l’Assemblée de Corse',
    '6': 'Représentant au Parlement européen',
    '7': 'Sénateur',
    '8': 'Député',
    '9': 'Maire'
}

function formatedValue(value){
    if(value && value.indexOf('/')>0){
      const toks = value.split('/')
      return toks[2]+'-'+toks[1].padStart(2, '0')+'-'+toks[0].padStart(2, '0')
    } else return value && value.replace(/"/g,'""')
}

module.exports = async (tmpDir,log) => {
    const writeStream = fs.createWriteStream(path.join(tmpDir, 'Repertoire-national-des-elus.csv'))
    const fields = [`Nom de l'élu`, `Prénom de l'élu`, `Code sexe`, `Date de naissance`, `Code de la catégorie socio-professionnelle`, `Libellé de la catégorie socio-professionnelle`]
    const commonFields = [].concat(fields, 'Age', Object.values(mandats), ['Nombre de mandats', 'Fonctions', 'Nombre de fonctions', 'Identifiant'])
    writeStream.write(commonFields.map(elemHeader => `"${elemHeader}"`).join(',') + '\n')

    await log.step('Traitement des fichiers')
    let dir = await fs.readdir(tmpDir)
    dir = dir.filter(file => file.startsWith('rne'))
    const elus = {}
    for (const file of dir) {
        await log.step(`Traitement de ${file}`)
        const data = iconv.decode(fs.readFileSync(path.join(tmpDir, file)), 'UTF-8')
        const lines = data.split(/\r\n|\r|\n/g)
        const header = lines.shift().split('\t')
        const indices = fields.map(f => header.indexOf(f))
        
        const mandatIndice = header.indexOf('Date de début du mandat')
        const fonctionIndice = header.indexOf('Libellé de fonction')
        const indexName1 = file.split('-').findIndex(element => { if (element.includes(file.match('cm'))) { return true; } }); if (indexName1 !== -1) { indiceMandat = 1}
        const indexName2 = file.split('-').findIndex(element => { if (element.includes(file.match('epci'))) { return true; } }); if (indexName2 !== -1) {  indiceMandat = 2 }
        const indexName3 = file.split('-').findIndex(element => { if (element.includes(file.match('cd'))) { return true; } }); if (indexName3 !== -1) {  indiceMandat = 3 }
        const indexName4 = file.split('-').findIndex(element => { if (element.includes(file.match('cr'))) { return true; } }); if (indexName4 !== -1) {  indiceMandat = 4 }
        const indexName5 = file.split('-').findIndex(element => { if (element.includes(file.match('ma'))) { return true; } }); if (indexName5 !== -1) {  indiceMandat = 5 }
        const indexName6 = file.split('-').findIndex(element => { if (element.includes(file.match('rpe'))) { return true; } }); if (indexName6 !== -1) {  indiceMandat = 6 }
        const indexName7 = file.split('-').findIndex(element => { if (element.includes(file.match('sen'))) { return true; } }); if (indexName7 !== -1) {  indiceMandat = 7 }
        const indexName8 = file.split('-').findIndex(element => { if (element.includes(file.match('dep'))) { return true; } }); if (indexName8 !== -1) {  indiceMandat = 8}
        const indexName9 = file.split('-').findIndex(element => { if (element.includes(file.match('maires'))) { return true; } }); if (indexName9 !== -1) {  indiceMandat = 9 }
        const mandat = mandats[indiceMandat]
        lines.forEach(line => {
            const values = line.split('\t')
            if(values.length === header.length && values[mandatIndice]){
              const id = `${values[indices[1]]} ${values[indices[0]]} ${values[indices[3]]}`
              elus[id] = elus[id] || Object.assign({
                'Mandats': {},
                'Fonctions': [],
                'Identifiant': id
              }, ...fields.map((f, i) => ({[f]: formatedValue(values[indices[i]])})))
              elus[id].Mandats[mandat] = true
              const fonction = (fonctionIndice >= 0 && values[fonctionIndice]) ? values[fonctionIndice] : mandat
              if (elus[id].Fonctions.indexOf(fonction) < 0) elus[id].Fonctions.push(fonction)
            }
          })      
    }
    Object.values(elus).forEach(elu => {
        if (elu.Mandats.Maire){
          delete elu.Mandats['Conseiller Municipal']
        }
        writeStream.write(fields.map(f => `"${elu[f]}"`).join(','))
        writeStream.write(`,"${elu['Date de naissance'] ? (dayjs().diff(elu['Date de naissance'], 'years')).format() : ''}"`)
        writeStream.write(',' + Object.values(mandats).map(m => `${elu.Mandats[m] || false}`).join(','))
        writeStream.write(`,"${Object.keys(elu.Mandats).length}"`)
        writeStream.write(`,"${elu.Fonctions.join(';')}"`)
        writeStream.write(`,"${elu.Fonctions.length}"`)
        writeStream.write(`,"${elu.Identifiant}"\n`)
      })
      
      writeStream.end()

}
