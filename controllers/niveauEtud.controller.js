const NiveauEtude = require('../model/niveauEtude.model');

/*exports.createDomaine = async (req, res) => {
console.log('req.body.libelle', req.body.libelle)
  try {
    const DomaineBourse = await Domaine.domaineCreate(req.body);
    res.status(201).json(DomaineBourse);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
*/

exports.creationNiveauEtudes = async (req, res) => {
  try {
    const NiveauEt = await NiveauEtude.createNiveau(req.body); // ✅ Appel de la méthode du modèle
    res.status(201).json(NiveauEt);
  } catch (err) {
    console.error('Erreur lors de la création du domaine :', err)
    res.status(400).json({ error: err.message });
  }
};
exports.showNiveauEtudes = async (req , res) => {

  try {
    console.error('Niveau Etudes')
    const Niveau = await NiveauEtude.getNiveauEtude(); // ✅ Appel de la méthode du modèle
    console.log('Niveau cont', Niveau)
    res.status(201).json(Niveau);
  } catch (err) {
    console.error('Erreur lors de la recuperartion du domaine :', err)
    res.status(400).json({ error: err.message });
  }
 
};
