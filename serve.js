const express = require('express');
require('dotenv').config();
const sequelize = require('./config/db.config');
const userRoutes = require('./router/user.route');
const niveauRoutes = require("./router/niveauEtude")
const cors = require('cors'); 
const authRoutes = require('./router/auth.route')
const domaineRoutes = require('./router/domaine.route')
const boursesRoutes = require('./router/bourse.route')
const candidatureRoutes = require('./router/candidature.route')

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use(cors()); 

app.use(cors({
  origin: 'http://localhost:3001' // par exemple pour Vite
}));
 
app.use(express.json());
app.use('/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/DomaineBourse', domaineRoutes);
app.use('/api/NiveauEtude', niveauRoutes);
app.use('/api/Bourses', boursesRoutes);
app.use('/api/Candidatures', candidatureRoutes);


sequelize.authenticate()
  .then(() => {
    console.log('✅ Connecté à MySQL');
    return sequelize.sync(); // crée les tables
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error('Erreur DB :', err));
