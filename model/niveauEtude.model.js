const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const NiveauEtude = sequelize.define('NiveauEtud', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  libelle: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
 codeNiveau:{
        type:DataTypes.STRING,
        allowNull: false
    }
}, {
  tableName: 'niveauEtud'
});

module.exports = NiveauEtude;

// Méthode statique pour créer un utilisateur
// ✅ Méthode personnalisée (nom unique, ne remplace rien)
NiveauEtude.createNiveau = async function (data) {
  console.log('niveauEtud model', data)
  try {
    const niveauEtud = await this.create(data); // Utilise la méthode native interne
    return niveauEtud;
  } catch (err) {
    throw new Error('Erreur lors de la création du Niveau d\'etude : ' + err.message);
  }
};
NiveauEtude.getNiveauEtude = async function () {
  try {
    const NiveauEtudes = await this.findAll(); // Utilise la méthode native interne
    console.log('NiveauEtudes', NiveauEtudes)
    return NiveauEtudes;
  } catch (err) {
    throw new Error('Erreur lors de la recupedration des NiveauEtudes : ' + err.message);
  }
};
module.exports = NiveauEtude;