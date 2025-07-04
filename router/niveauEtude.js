const express = require('express');
const router = express.Router();
const {validateDomaine} = require('../middlewares/domaine.validator')
const NiveauEtude  = require('../controllers/niveauEtud.controller');
const { validateNiveauEtude } = require('../middlewares/niveauEtud.validator');

console.log('✅ domaine.router.js chargé');
console.log('✅ fonction:', NiveauEtude.creationNiveauEtudes);

router.post('/', validateNiveauEtude, NiveauEtude.creationNiveauEtudes);

router.get('/', NiveauEtude.showNiveauEtudes);



module.exports = router;
