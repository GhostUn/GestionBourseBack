const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const User = sequelize.define('User', {
 id: {
  type: DataTypes.INTEGER,
  primaryKey: true,
  autoIncrement: true,
  allowNull: false
}
,
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

    },
  role:{
    type:DataTypes.STRING,
    
  }
}, {
  tableName: 'users'
});

module.exports = User;

// Méthode statique pour créer un utilisateur
User.UserCreate = async function (userData) {
  console.log('userData', userData);
  try {
    const user = await this.create(userData); // On passe directement l'objet
    return user;
  } catch (err) {
    console.log('err', err)
    throw new Error(err.message);
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