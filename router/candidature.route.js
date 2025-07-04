const express = require('express');
const router = express.Router();
const {validateDomaine} = require('../middlewares/domaine.validator')
const bourseController  = require('../controllers/bourse.controller');
const { validateBourse } = require('../middlewares/bourse.middleware');
const CandidatureController = require('../controllers/candidature.controller')

console.log('✅ domaine.router.js chargé');
console.log('✅ fonction:', CandidatureController.creationBourse);

router.post('/', CandidatureController.creationCandidature);
console.log('✅ Get');

router.get('/', bourseController.showBourse);
router.get('/:id', bourseController.getBourseById);


module.exports = router;
