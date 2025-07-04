const Domaine = require('../model/domaine.model');

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

exports.createDomaine = async (req, res) => {
  try {
    const domaineBourse = await Domaine.creerDomaine(req.body); // ✅ Appel de la méthode du modèle
    res.status(201).json(domaineBourse);
  } catch (err) {
    console.error('Erreur lors de la création du domaine :', err)
    res.status(400).json({ error: err.message });
  }
};
exports.showDomaine = async (req , res) => {

  try {
    console.error('Domaines')
    const Domaines = await Domaine.getDomaine(); // ✅ Appel de la méthode du modèle

    res.status(201).json(Domaines);
  } catch (err) {
    console.error('Erreur lors de la recuperartion du domaine :', err)
    res.status(400).json({ error: err.message });
  }
 
};
