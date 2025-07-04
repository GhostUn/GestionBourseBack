const Candidature = require('../model/candidature.model');
const bcrypt = require('bcrypt');

exports.creationCandidature = async (req, res) => {
console.log('req.body.password', req.body.nomEt)
  try {

    
    
    const newCandidature= await Candidature.createCandidature(req.body);
    console.log('first', newCandidature)
    res.status(201).json(newCandidature);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.showBourse = async (req, res) => {
  const bourses = await Bourse.findAll();
  console.log('bourses', bourses)
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
