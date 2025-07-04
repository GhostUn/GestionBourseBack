const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Candidature = sequelize.define('Candidature', {
id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,  // ✅ permet à MySQL de générer la valeur
      allowNull: false
    },
  nomEt: {
    type: DataTypes.STRING, // vient de la table Etudiant
    allowNull: false
  },
    nombourse: {
    type: DataTypes.STRING, // vient de la table bourse
    allowNull: false
  },
    email: {
    type: DataTypes.STRING,
    allowNull: false
  },
    document: {
    type: DataTypes.STRING,
    allowNull: false
  },
    phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
    amount: {
    type: DataTypes.STRING,
    allowNull: false
  },
    pays: {
    type: DataTypes.STRING,
    allowNull: false
  },
    modePaiement: {
    type: DataTypes.STRING,
    allowNull: false
  },
    denierDiplome: {
    type: DataTypes.STRING,
    allowNull: false
  },
    DiplomeRequis: {
    type: DataTypes.STRING,
    allowNull: false
  },
    cv: {
    type:  DataTypes.TEXT,
    allowNull: false
  },
    lettreRecommandation: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  

}, {
  tableName: 'Candidature'
});

module.exports = Candidature;

// Méthode statique pour créer un utilisateur
Candidature.createCandidature = async function (userData) {
  console.log('userData model', userData)
  try {
    const newCandidature = await this.create({
      ...userData   // ✅ Déstructure les champs pour correspondre aux colonnes
    });
    
    console.log('newCandidature créé :', newCandidature);
    return newCandidature;
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
module.exports = Candidature;