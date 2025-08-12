const Bourse = require('../model/bourse.model');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

exports.creationBourse = async (req, res) => {
//console.log('req.body.password', req.body.nomBourse)
  try {
    
    const newbourse = await Bourse.createBourse(req.body);
    console.log('first', newbourse)
    res.status(201).json(newbourse);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.showBourse = async (req, res) => {
  const bourses = await Bourse.findAll();
//  console.log('bourses', bourses)
  res.json(bourses);
};

exports.getBourseById = async (req, res) => {
  try {
    const { id } = req.params
    const bourse = await Bourse.findByPk(id)

    if (!bourse) {
      return res.status(404).json({ message: 'Bourse non trouvée' })
    }

    res.json(bourse)
  } catch (error) {
    console.error('Erreur backend :', error)
    res.status(500).json({ message: 'Erreur serveur' })
  }
}


exports.searchBourse = async (req, res) => {
    const {
    search,
    type,
    pays,
    niveau,
    taux,
    duree,
    
  } = req.query;

  try {
    const whereClause = {
      nomBourse: { [Op.like]: `%${search}%` }
    };

    if (type) whereClause.type = type;
    if (pays) whereClause.pays = pays;
    if (niveau) whereClause.niveau = niveau;
    if (taux) whereClause.taux = taux;
    if (duree) whereClause.duree = duree;

    const bourses = await Bourse.findAll({ where: whereClause });

    res.json(bourses);

  } catch (error) {
    
    console.error('Erreur dans searchBourse:', error);
    res.status(500).json({ error: 'Erreur lors de la recherche.' });
  }
};
exports.getBoursesWithFilters = async (req, res) => {
  try {
    const filters = req.query;

    // Construire la clause WHERE pour Sequelize
    const whereClause = {};

    if (filters.type) whereClause.type = filters.type;
    if (filters.pays) whereClause.pays = filters.pays;
    if (filters.niveau) whereClause.niveau = filters.niveau;
    if (filters.taux) whereClause.taux = filters.taux;
    if (filters.duree) whereClause.duree = filters.duree;

    // Recherche par mot-clé (search)
    if (filters.search) {
      whereClause.nomBourse = { [Sequelize.Op.like]: `%${filters.search}%` };
    }

    // Récupérer les bourses filtrées
    const filteredBourses = await Bourse.findAll({ where: whereClause });

    res.json(filteredBourses);
  } catch (error) {
    console.error('Erreur lors de la recherche des bourses :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};