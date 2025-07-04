const Bourse = require('../model/bourse.model');
const bcrypt = require('bcrypt');

exports.creationBourse = async (req, res) => {
console.log('req.body.password', req.body.nomBourse)
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
