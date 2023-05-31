exports.mandat = {
  cm: 'Conseiller Municipal',
  epci: 'Conseiller communautaire',
  cd: 'Conseiller départemental',
  cr: 'Conseiller régional',
  ma: 'Conseiller de l\'Assemblée de Corse',
  rpe: 'Représentant au Parlement européen',
  sen: 'Sénateur',
  dep: 'Député',
  maire: 'Maire'
}

const nom = {
  key: 'nom_de_l_elu',
  title: "Nom de l'élu",
  description: "Nom de l'élu",
  type: 'string'
}

const prenom = {
  key: 'prenom_de_l_elu',
  title: "Prénom de l'élu",
  description: "Prénom de l'élu",
  type: 'string'
}

const sexe = {
  key: 'code_sexe',
  title: 'Code sexe',
  description: "Sexe de l'élu",
  type: 'string'
}

const dateNaissance = {
  key: 'date_de_naissance',
  title: 'Date de naissance',
  description: "Date de naissance de l'élu",
  type: 'date',
  'x-refersTo': 'http://schema.org/Date'
}

const categorieSocioProfessionnelle = {
  key: 'code_de_la_categorie_socio-professionnelle',
  title: 'Code de la catégorie socio-professionnelle',
  description: "Code de la profession de l'élu",
  type: 'integer'
}

const libelleCategorieSocioProfessionnelle = {
  key: 'libelle_de_la_categorie_socio-professionnelle',
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
  type: 'integer'
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
  key: 'date_de_debut_mandat',
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
  key: 'date_de_debut_fonction',
  title: 'Date de début de fonction',
  description: "Date de début de fonction de l'élu",
  type: 'date'
}

const codeNationalite = {
  key: 'code_nationalite',
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

exports.schemas = {
  elu: [nom, prenom, sexe, dateNaissance, age, categorieSocioProfessionnelle, libelleCategorieSocioProfessionnelle, mandats, nbMandats, datesMandats, identifiant],
  cd: [codeDepartement, libelleDepartement, codeCanton, libelleCanton, nom, prenom, sexe, dateNaissance, age, categorieSocioProfessionnelle, libelleCategorieSocioProfessionnelle, mandat, dateMandat, fonction, dateFonction, identifiant],
  cm: [codeDepartement, libelleDepartement, codeCollectiviteAStatutParticulier, libelleCollectiviteAStatutParticulier, codeCommune, libelleCommune, nom, prenom, sexe, dateNaissance, age, categorieSocioProfessionnelle, libelleCategorieSocioProfessionnelle, mandat, dateMandat, fonction, dateFonction, codeNationalite, identifiant],
  cr: [codeRegion, libelleRegion, codeDepartement, libelleDepartement, nom, prenom, sexe, dateNaissance, age, categorieSocioProfessionnelle, libelleCategorieSocioProfessionnelle, mandat, dateMandat, fonction, dateFonction, identifiant],
  dep: [codeDepartement, libelleDepartement, codeCollectiviteAStatutParticulier, libelleCollectiviteAStatutParticulier, codeCirconscriptionLegislative, libelleCirconscriptionLegislative, nom, prenom, sexe, dateNaissance, age, categorieSocioProfessionnelle, libelleCategorieSocioProfessionnelle, mandat, dateMandat, identifiant],
  epci: [codeDepartement, libelleDepartement, codeCollectiviteAStatutParticulier, libelleCollectiviteAStatutParticulier, numeroSiren, libelleEPCI, codeCommune, libelleCommune, nom, prenom, sexe, dateNaissance, age, categorieSocioProfessionnelle, libelleCategorieSocioProfessionnelle, mandat, dateMandat, fonction, dateFonction, identifiant],
  ma: [codeRegion, libelleRegion, codeDepartement, libelleDepartement, codeCollectiviteAStatutParticulier, libelleCollectiviteAStatutParticulier, codeSection, libelleSection, codeCirconscriptionMetropolitaine, libelleCirconscriptionMetropolitaine, nom, prenom, sexe, dateNaissance, age, categorieSocioProfessionnelle, libelleCategorieSocioProfessionnelle, mandat, dateMandat, fonction, dateFonction, identifiant],
  maire: [codeDepartement, libelleDepartement, codeCollectiviteAStatutParticulier, libelleCollectiviteAStatutParticulier, codeCommune, libelleCommune, nom, prenom, sexe, dateNaissance, age, categorieSocioProfessionnelle, libelleCategorieSocioProfessionnelle, mandat, dateMandat, identifiant],
  rpe: [nom, prenom, sexe, dateNaissance, age, categorieSocioProfessionnelle, libelleCategorieSocioProfessionnelle, mandat, dateMandat, identifiant],
  sen: [codeDepartement, libelleDepartement, codeCollectiviteAStatutParticulier, libelleCollectiviteAStatutParticulier, nom, prenom, sexe, dateNaissance, age, categorieSocioProfessionnelle, libelleCategorieSocioProfessionnelle, mandat, dateMandat, identifiant]
}

exports.schemasRaw = {
  cd: [codeDepartement, libelleDepartement, codeCanton, libelleCanton, nom, prenom, sexe, dateNaissance, categorieSocioProfessionnelle, libelleCategorieSocioProfessionnelle, dateMandat, fonction, dateFonction],
  cm: [codeDepartement, libelleDepartement, codeCollectiviteAStatutParticulier, libelleCollectiviteAStatutParticulier, codeCommune, libelleCommune, nom, prenom, sexe, dateNaissance, categorieSocioProfessionnelle, libelleCategorieSocioProfessionnelle, dateMandat, fonction, dateFonction, codeNationalite],
  cr: [codeRegion, libelleRegion, codeDepartement, libelleDepartement, nom, prenom, sexe, dateNaissance, categorieSocioProfessionnelle, libelleCategorieSocioProfessionnelle, dateMandat, fonction, dateFonction],
  dep: [codeDepartement, libelleDepartement, codeCollectiviteAStatutParticulier, libelleCollectiviteAStatutParticulier, codeCirconscriptionLegislative, libelleCirconscriptionLegislative, nom, prenom, sexe, dateNaissance, categorieSocioProfessionnelle, libelleCategorieSocioProfessionnelle, dateMandat],
  epci: [codeDepartement, libelleDepartement, codeCollectiviteAStatutParticulier, libelleCollectiviteAStatutParticulier, numeroSiren, libelleEPCI, codeCommune, libelleCommune, nom, prenom, sexe, dateNaissance, categorieSocioProfessionnelle, libelleCategorieSocioProfessionnelle, dateMandat, fonction, dateFonction],
  ma: [codeRegion, libelleRegion, codeDepartement, libelleDepartement, codeCollectiviteAStatutParticulier, libelleCollectiviteAStatutParticulier, codeSection, libelleSection, codeCirconscriptionMetropolitaine, libelleCirconscriptionMetropolitaine, nom, prenom, sexe, dateNaissance, categorieSocioProfessionnelle, libelleCategorieSocioProfessionnelle, dateMandat, fonction, dateFonction],
  maire: [codeDepartement, libelleDepartement, codeCollectiviteAStatutParticulier, libelleCollectiviteAStatutParticulier, codeCommune, libelleCommune, nom, prenom, sexe, dateNaissance, categorieSocioProfessionnelle, libelleCategorieSocioProfessionnelle, dateMandat],
  rpe: [nom, prenom, sexe, dateNaissance, categorieSocioProfessionnelle, libelleCategorieSocioProfessionnelle, dateMandat, fonction, dateFonction],
  sen: [codeDepartement, libelleDepartement, codeCollectiviteAStatutParticulier, libelleCollectiviteAStatutParticulier, nom, prenom, sexe, dateNaissance, categorieSocioProfessionnelle, libelleCategorieSocioProfessionnelle, dateMandat]
}
