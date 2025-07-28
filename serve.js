const express = require('express');
require('dotenv').config();
const sequelize = require('./config/db.config');
const cors = require('cors'); 
const path = require('path');

const userRoutes = require('./router/user.route');
const niveauRoutes = require("./router/niveauEtude")
const authRoutes = require('./router/auth.route')
const domaineRoutes = require('./router/domaine.route')
const boursesRoutes = require('./router/bourse.route')
const candidatureRoutes = require('./router/candidature.route')

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use(cors()); 

app.use(cors({
    origin: [
    'http://localhost:3000',               // développement local
    'https://gestionbourse.onrender.com',      // front-end déployé
  ],
}));
 
app.use(express.json());
app.use('/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/DomaineBourse', domaineRoutes);
app.use('/api/NiveauEtude', niveauRoutes);
app.use('/api/Bourses', boursesRoutes);
app.use('/api/Candidatures', candidatureRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//route paiement reussie
app.get('/paiement-success', async (req, res) => {
  const order_id = req.query.order_id;
  if (!order_id) {
    return res.status(400).send("Référence de commande manquante");
  }

  await Candidature.update(
    { statutPaiement: 'payé' },
    { where: { referencePaiement: order_id } }
  );

  res.send("✅ Paiement réussi ! Merci pour votre candidature.");
});


//route échec paiement
app.get('/paiement-echec', async (req, res) => {
  const order_id = req.query.order_id;
  if (!order_id) {
    return res.status(400).send("Référence de commande manquante");
  }

  await Candidature.update(
    { statutPaiement: 'échec' },
    { where: { referencePaiement: order_id } }
  );

  res.send("❌ Le paiement a échoué. Veuillez réessayer.");
});

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
