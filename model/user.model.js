const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey:true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
 telephone:{
        type:DataTypes.STRING,
        require:true
    },
 prenom:{
        type:DataTypes.STRING,
        require:true

    },
 userName:{
        type:DataTypes.STRING,
        require:true

    },
 password:{
        type:DataTypes.STRING,
        require:true

    }
}, {
  tableName: 'users'
});

module.exports = User;

// Méthode statique pour créer un utilisateur
User.createUser = async function (userData) {
  try {
    const user = await this.create({
      userData
    });

    return user; // Renvoyer l'utilisateur créé
  } catch (err) {
    throw new Error(err.message); // Propager l'erreur si nécessaire
  }
};
module.exports = User;
// Méthode statique pour créer un utilisateur
User.userFind = async function (email) {
  try {
    const user = await User.findOne({ where: { email } });
    return user; // Renvoyer l'utilisateur créé
  } catch (err) {
    throw new Error(err.message); // Propager l'erreur si nécessaire
  }
};
module.exports = User;