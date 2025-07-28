const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Domaine = sequelize.define('Domaine', {
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
 codeDomaine:{
        type:DataTypes.STRING,
        require:true
    }
}, {
  tableName: 'domaine'
});

module.exports = Domaine;

// Méthode statique pour créer un utilisateur
// ✅ Méthode personnalisée (nom unique, ne remplace rien)
Domaine.creerDomaine = async function (data) {
  try {
    const domaine = await this.create(data); // Utilise la méthode native interne
    return domaine;
  } catch (err) {
    throw new Error('Erreur lors de la création du domaine : ' + err.message);
  }
};
Domaine.getDomaine = async function () {
  try {
    const domaines = await this.findAll(); // Utilise la méthode native interne
    console.log('domaines', domaines)
    return domaines;
  } catch (err) {
    throw new Error('Erreur lors de la création du domaine : ' + err.message);
  }
};
module.exports = Domaine;