const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Bourse = sequelize.define('Bourse', {
id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,  // ✅ permet à MySQL de générer la valeur
      allowNull: false
    },
  nomBourse: {
    type: DataTypes.STRING,
    allowNull: false
  },
    montant: {
    type: DataTypes.STRING,
    allowNull: false
  },
    pays: {
    type: DataTypes.STRING,
    allowNull: false
  },
    type: {
    type: DataTypes.STRING,
    allowNull: false
  },
    dateOuverture: {
    type: DataTypes.STRING,
    allowNull: false
  },
    dateCloture: {
    type: DataTypes.STRING,
    allowNull: false
  },
    niveau: {
    type: DataTypes.STRING,
    allowNull: false
  },
    domaine: {
    type: DataTypes.STRING,
    allowNull: false
  },
    conditionAge: {
    type: DataTypes.STRING,
    allowNull: false
  },
    conditionNationalite: {
    type: DataTypes.STRING,
    allowNull: false
  },
    document: {
    type:  DataTypes.TEXT,
    allowNull: false
  },
    remarque: {
    type: DataTypes.TEXT,
    allowNull: false
  },
    universitePartenaire:{
    type: DataTypes.STRING,
    allowNull: false
  },
    NombreDePlace:{
    type: DataTypes.STRING,
    allowNull: false
  },
  

}, {
  tableName: 'bourse'
});

module.exports = Bourse;

// Méthode statique pour créer un utilisateur
Bourse.createBourse = async function (userData) {
  console.log('userData model', userData)
  try {
    const newBourse = await this.create({
      ...userData   // ✅ Déstructure les champs pour correspondre aux colonnes
    });
    
    console.log('newBourse créé :', newBourse);
    return newBourse;
  } catch (err) {
    throw new Error(err.message);
  }
};
// Méthode statique pour créer un utilisateur
Bourse.showBourse = async function () {
  try {
    const bourses = await Bourse.findAll();
    return bourses; // Renvoyer l'utilisateur créé
  } catch (err) {
    throw new Error(err.message); // Propager l'erreur si nécessaire
  }
};
module.exports = Bourse;