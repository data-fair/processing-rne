const nom = {
  key: 'nom_elu',
  title: "Nom de l'élu",
  description: "Nom de l'élu",
  type: 'string'
}

const prenom = {
  key: 'prenom_elu',
  title: "Prénom de l'élu",
  description: "Prénom de l'élu",
  type: 'string'
}

const sexe = {
  key: 'sexe_elu',
  title: 'Code sexe',
  description: "Sexe de l'élu",
  type: 'string'
}

const dateNaissance = {
  key: 'date_naissance_elu',
  title: 'Date de naissance',
  description: "Date de naissance de l'élu",
  type: 'date',
  'x-refersTo': 'http://schema.org/Date'
}

const categorieSocioProfessionnelle = {
  key: 'code_categorie_socio_professionnelle',
  title: 'Code de la catégorie socio-professionnelle',
  description: "Code de la profession de l'élu",
  type: 'integer'
}

const libelleCategorieSocioProfessionnelle = {
  key: 'libelle_categorie_socio_professionnelle',
  title: 'Libellé de la catégorie socio-professionnelle',
  description: "Profession de l'élu",
  type: 'string'
}

const age = {
  key: 'age',
  title: 'Age',
  description: "Age de l'élu",
  type: 'integer'
}

const mandats = {
  key: 'mandats',
  title: 'Mandats',
  description: "Différents mandats de l'élu",
  type: 'string',
  separator: ';'
}

const nbMandats = {
  key: 'nombre_de_mandats',
  title: 'Nombre de mandats',
  description: "Nombre de mandats de l'élu",
  type: 'integer',
  ignoreDetection: true
}

const datesMandats = {
  key: 'dates_de_debut_mandat',
  title: 'Dates de début de mandat',
  description: "Dates de début de mandat de l'élu",
  type: 'date',
  separator: ';'
}

const mandat = {
  key: 'mandat',
  title: 'Mandat',
  description: "Mandat de l'élu",
  type: 'string'
}

const dateMandat = {
  key: 'date_debut_mandat',
  title: 'Date de début de mandat',
  description: "Date de début de mandat de l'élu",
  type: 'date'
}

const identifiant = {
  key: 'identifiant',
  title: 'Identifiant',
  description: 'Identifiant de la personne',
  type: 'string'
}

const codeDepartement = {
  key: 'code_departement',
  title: 'Code département',
  description: 'Code du département',
  type: 'string',
  'x-refersTo': 'http://rdf.insee.fr/def/geo#codeDepartement'
}

const libelleDepartement = {
  key: 'libelle_departement',
  title: 'Libellé département',
  description: 'Libellé du département',
  type: 'string'
}

const codeSectionDepartement = {
  key: 'code_section_departementale',
  title: 'Code section départementale',
  description: 'Code de la section départementale',
  type: 'string',
  'x-refersTo': 'http://rdf.insee.fr/def/geo#codeDepartement'
}

const libelleSectionDepartement = {
  key: 'libelle_section_departementale',
  title: 'Libellé section départementale',
  description: 'Libellé de la section départementale',
  type: 'string'
}

const codeCommune = {
  key: 'code_commune',
  title: 'Code commune',
  description: 'Code de la commune',
  type: 'string',
  'x-refersTo': 'http://rdf.insee.fr/def/geo#codeCommune'
}

const libelleCommune = {
  key: 'libelle_commune',
  title: 'Libellé commune',
  description: 'Libellé de la commune',
  type: 'string'
}

const codeCommuneRattachement = {
  key: 'code_commune_rattachement',
  title: 'Code commune de rattachement',
  description: 'Code de la commune de rattachement',
  type: 'string',
  'x-refersTo': 'http://rdf.insee.fr/def/geo#codeCommune'
}

const libelleCommuneRattachement = {
  key: 'libelle_commune_rattachement',
  title: 'Libellé commune de rattachement',
  description: 'Libellé de la commune de rattachement',
  type: 'string'
}

const codeCanton = {
  key: 'code_canton',
  title: 'Code canton',
  description: 'Code du canton',
  type: 'string'
}

const libelleCanton = {
  key: 'libelle_canton',
  title: 'Libellé canton',
  description: 'Libellé du canton',
  type: 'string'
}

const codeCollectiviteAStatutParticulier = {
  key: 'code_collectivite_a_statut_particulier',
  title: 'Code collectivité à statut particulier',
  description: 'Code de la collectivité à statut particulier',
  type: 'string'
}

const libelleCollectiviteAStatutParticulier = {
  key: 'libelle_collectivite_a_statut_particulier',
  title: 'Libellé collectivité à statut particulier',
  description: 'Libellé de la collectivité à statut particulier',
  type: 'string'
}

const codeRegion = {
  key: 'code_region',
  title: 'Code région',
  description: 'Code de la région',
  type: 'string',
  'x-refersTo': 'http://rdf.insee.fr/def/geo#codeRegion'
}

const libelleRegion = {
  key: 'libelle_region',
  title: 'Libellé région',
  description: 'Libellé de la région',
  type: 'string'
}

const codeCirconscriptionLegislative = {
  key: 'code_circonscription_legislative',
  title: 'Code circonscription législative',
  description: 'Code de la circonscription législative',
  type: 'string'
}

const libelleCirconscriptionLegislative = {
  key: 'libelle_circonscription_legislative',
  title: 'Libellé circonscription législative',
  description: 'Libellé de la circonscription législative',
  type: 'string'
}

const fonction = {
  key: 'fonction',
  title: 'Fonction',
  description: "Fonction de l'élu",
  type: 'string'
}

const dateFonction = {
  key: 'date_debut_fonction',
  title: 'Date de début de fonction',
  description: "Date de début de fonction de l'élu",
  type: 'date'
}

const lieuNaisance = {
  key: 'lieu_naissance_elu',
  title: 'Lieu de naissance',
  description: "Lieu de naissance de l'élu",
  type: 'string'
}

const codeNuance = {
  key: 'code_nuance_mandat',
  title: 'Code nuance',
  description: 'Code nuance du mandat',
  type: 'string'
}

const libelleNuance = {
  key: 'libelle_nuance_mandat',
  title: 'Libellé nuance',
  description: 'Libellé nuance du mandat',
  type: 'string'
}

const codeNationalite = {
  key: 'nationalite_elu',
  title: 'Code nationalité',
  description: 'Code nationalité',
  type: 'string'
}

const numeroSiren = {
  key: 'numero_siren',
  title: 'Numéro SIREN',
  description: 'Numéro SIREN',
  type: 'string'
}

const libelleEPCI = {
  key: 'libelle_epci',
  title: 'Libellé EPCI',
  description: 'Libellé EPCI',
  type: 'string'
}

const codeSection = {
  key: 'code_section',
  title: 'Code section',
  description: 'Code de la section - collectivité à statut particulier',
  type: 'string'
}

const libelleSection = {
  key: 'libelle_section',
  title: 'Libellé section',
  description: 'Libellé de la section - collectivité à statut particulier',
  type: 'string'
}

const codeCirconscriptionMetropolitaine = {
  key: 'code_circonscription_metropolitaine',
  title: 'Code circonscription métropolitaine',
  description: 'Code de la circonscription métropolitaine',
  type: 'string'
}

const libelleCirconscriptionMetropolitaine = {
  key: 'libelle_circonscription_metropolitaine',
  title: 'Libellé circonscription métropolitaine',
  description: 'Libellé de la circonscription métropolitaine',
  type: 'string'
}

const libelleSecteur = {
  key: 'libelle_secteur',
  title: 'Libellé secteur',
  description: 'Libellé du secteur',
  type: 'string'
}

const codeCirconscriptionConsulaire = {
  key: 'code_circonscription_consulaire',
  title: 'Code circonscription consulaire',
  description: 'Code de la circonscription consulaire',
  type: 'integer',
  ignoreDetection: true
}

const libelleCirconscriptionConsulaire = {
  key: 'libelle_circonscription_consulaire',
  title: 'Libellé circonscription consulaire',
  description: 'Libellé de la circonscription consulaire',
  type: 'string'
}

const codeCirconscriptionAfe = {
  key: 'code_circonscription_afe',
  title: 'Code circonscription AFE',
  description: "Code de la circonscription de l'Assemblée des Français de l'étranger",
  type: 'integer',
  ignoreDetection: true
}

const libelleCirconscriptionAfe = {
  key: 'libelle_circonscription_afe',
  title: 'Libellé circonscription AFE',
  description: "Libellé de la circonscription de l'Assemblée des Français de l'étranger",
  type: 'string'
}

exports.schemas = {
  elu: [nom, prenom, sexe, dateNaissance, age, categorieSocioProfessionnelle, libelleCategorieSocioProfessionnelle, mandats, nbMandats, datesMandats, lieuNaisance, codeNuance, libelleNuance, identifiant],
  'conseiller-departemental': [codeDepartement, libelleDepartement, codeCanton, libelleCanton, nom, prenom, sexe, dateNaissance, age, categorieSocioProfessionnelle, libelleCategorieSocioProfessionnelle, mandat, dateMandat, fonction, dateFonction, lieuNaisance, codeNuance, libelleNuance, identifiant],
  municipal: [codeDepartement, libelleDepartement, codeCollectiviteAStatutParticulier, libelleCollectiviteAStatutParticulier, codeCommune, libelleCommune, nom, prenom, sexe, dateNaissance, age, categorieSocioProfessionnelle, libelleCategorieSocioProfessionnelle, mandat, dateMandat, fonction, dateFonction, codeNationalite, lieuNaisance, codeNuance, libelleNuance, identifiant],
  regional: [codeRegion, libelleRegion, codeSectionDepartement, libelleSectionDepartement, nom, prenom, sexe, dateNaissance, age, categorieSocioProfessionnelle, libelleCategorieSocioProfessionnelle, mandat, dateMandat, fonction, dateFonction, lieuNaisance, codeNuance, libelleNuance, identifiant],
  depute: [codeDepartement, libelleDepartement, codeCollectiviteAStatutParticulier, libelleCollectiviteAStatutParticulier, codeCirconscriptionLegislative, libelleCirconscriptionLegislative, nom, prenom, sexe, dateNaissance, age, categorieSocioProfessionnelle, libelleCategorieSocioProfessionnelle, mandat, dateMandat, lieuNaisance, codeNuance, libelleNuance, identifiant],
  epci: [codeDepartement, libelleDepartement, codeCollectiviteAStatutParticulier, libelleCollectiviteAStatutParticulier, numeroSiren, libelleEPCI, codeCommuneRattachement, libelleCommuneRattachement, nom, prenom, sexe, dateNaissance, age, categorieSocioProfessionnelle, libelleCategorieSocioProfessionnelle, mandat, dateMandat, fonction, dateFonction, lieuNaisance, codeNuance, libelleNuance, identifiant],
  'membre-assemblees': [codeRegion, libelleRegion, codeDepartement, libelleDepartement, codeCollectiviteAStatutParticulier, libelleCollectiviteAStatutParticulier, codeSection, libelleSection, codeCirconscriptionMetropolitaine, libelleCirconscriptionMetropolitaine, nom, prenom, sexe, dateNaissance, age, categorieSocioProfessionnelle, libelleCategorieSocioProfessionnelle, mandat, dateMandat, fonction, dateFonction, lieuNaisance, codeNuance, libelleNuance, identifiant],
  maire: [codeDepartement, libelleDepartement, codeCollectiviteAStatutParticulier, libelleCollectiviteAStatutParticulier, codeCommune, libelleCommune, nom, prenom, sexe, dateNaissance, age, lieuNaisance, categorieSocioProfessionnelle, libelleCategorieSocioProfessionnelle, mandat, dateMandat, dateFonction, codeNuance, libelleNuance, identifiant],
  'representant-parlement-europeen': [nom, prenom, sexe, dateNaissance, age, categorieSocioProfessionnelle, libelleCategorieSocioProfessionnelle, mandat, dateMandat, lieuNaisance, codeNuance, libelleNuance, identifiant],
  senateur: [codeDepartement, libelleDepartement, codeCollectiviteAStatutParticulier, libelleCollectiviteAStatutParticulier, nom, prenom, sexe, dateNaissance, age, categorieSocioProfessionnelle, libelleCategorieSocioProfessionnelle, mandat, dateMandat, lieuNaisance, codeNuance, libelleNuance, identifiant],
  'conseiller-arrondissement': [codeDepartement, libelleDepartement, codeCommune, libelleCommune, libelleSecteur, nom, prenom, sexe, dateNaissance, age, categorieSocioProfessionnelle, libelleCategorieSocioProfessionnelle, mandat, dateMandat, fonction, dateFonction, lieuNaisance, codeNuance, libelleNuance, identifiant],
  consulaire: [codeCirconscriptionConsulaire, libelleCirconscriptionConsulaire, nom, prenom, sexe, dateNaissance, age, categorieSocioProfessionnelle, libelleCategorieSocioProfessionnelle, mandat, dateMandat, fonction, dateFonction, lieuNaisance, identifiant],
  afe: [codeCirconscriptionAfe, libelleCirconscriptionAfe, nom, prenom, sexe, dateNaissance, age, categorieSocioProfessionnelle, libelleCategorieSocioProfessionnelle, mandat, dateMandat, fonction, dateFonction, lieuNaisance, identifiant]
}

exports.schemasRaw = {
  'conseiller-departemental': [codeDepartement, libelleDepartement, codeCanton, libelleCanton, nom, prenom, sexe, dateNaissance, categorieSocioProfessionnelle, libelleCategorieSocioProfessionnelle, dateMandat, fonction, dateFonction, lieuNaisance, codeNuance, libelleNuance],
  municipal: [codeDepartement, libelleDepartement, codeCollectiviteAStatutParticulier, libelleCollectiviteAStatutParticulier, codeCommune, libelleCommune, nom, prenom, sexe, dateNaissance, categorieSocioProfessionnelle, libelleCategorieSocioProfessionnelle, dateMandat, fonction, dateFonction, codeNationalite, lieuNaisance, codeNuance, libelleNuance],
  regional: [codeRegion, libelleRegion, codeSectionDepartement, libelleSectionDepartement, nom, prenom, sexe, dateNaissance, categorieSocioProfessionnelle, libelleCategorieSocioProfessionnelle, dateMandat, fonction, dateFonction, lieuNaisance, codeNuance, libelleNuance],
  depute: [codeDepartement, libelleDepartement, codeCollectiviteAStatutParticulier, libelleCollectiviteAStatutParticulier, codeCirconscriptionLegislative, libelleCirconscriptionLegislative, nom, prenom, sexe, dateNaissance, categorieSocioProfessionnelle, libelleCategorieSocioProfessionnelle, dateMandat, lieuNaisance, codeNuance, libelleNuance],
  epci: [codeDepartement, libelleDepartement, codeCollectiviteAStatutParticulier, libelleCollectiviteAStatutParticulier, numeroSiren, libelleEPCI, codeCommuneRattachement, libelleCommuneRattachement, nom, prenom, sexe, dateNaissance, categorieSocioProfessionnelle, libelleCategorieSocioProfessionnelle, dateMandat, fonction, dateFonction, lieuNaisance, codeNuance, libelleNuance],
  'membre-assemblees': [codeRegion, libelleRegion, codeDepartement, libelleDepartement, codeCollectiviteAStatutParticulier, libelleCollectiviteAStatutParticulier, codeSection, libelleSection, codeCirconscriptionMetropolitaine, libelleCirconscriptionMetropolitaine, nom, prenom, sexe, dateNaissance, categorieSocioProfessionnelle, libelleCategorieSocioProfessionnelle, dateMandat, fonction, dateFonction, lieuNaisance, codeNuance, libelleNuance],
  maire: [codeDepartement, libelleDepartement, codeCollectiviteAStatutParticulier, libelleCollectiviteAStatutParticulier, codeCommune, libelleCommune, nom, prenom, sexe, dateNaissance, lieuNaisance, categorieSocioProfessionnelle, libelleCategorieSocioProfessionnelle, dateMandat, dateFonction, codeNuance, libelleNuance],
  'representant-parlement-europeen': [nom, prenom, sexe, dateNaissance, categorieSocioProfessionnelle, libelleCategorieSocioProfessionnelle, dateMandat, lieuNaisance, codeNuance, libelleNuance],
  senateur: [codeDepartement, libelleDepartement, codeCollectiviteAStatutParticulier, libelleCollectiviteAStatutParticulier, nom, prenom, sexe, dateNaissance, categorieSocioProfessionnelle, libelleCategorieSocioProfessionnelle, dateMandat, lieuNaisance, codeNuance, libelleNuance],
  'conseiller-arrondissement': [codeDepartement, libelleDepartement, codeCommune, libelleCommune, libelleSecteur, nom, prenom, sexe, dateNaissance, categorieSocioProfessionnelle, libelleCategorieSocioProfessionnelle, dateMandat, fonction, dateFonction, lieuNaisance, codeNuance, libelleNuance],
  consulaire: [codeCirconscriptionConsulaire, libelleCirconscriptionConsulaire, nom, prenom, sexe, dateNaissance, categorieSocioProfessionnelle, libelleCategorieSocioProfessionnelle, dateMandat, fonction, dateFonction, lieuNaisance],
  afe: [codeCirconscriptionAfe, libelleCirconscriptionAfe, nom, prenom, sexe, dateNaissance, categorieSocioProfessionnelle, libelleCategorieSocioProfessionnelle, dateMandat, fonction, dateFonction, lieuNaisance]
}
