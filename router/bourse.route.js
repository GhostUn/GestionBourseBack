const express = require('express');
const router = express.Router();
const {validateDomaine} = require('../middlewares/domaine.validator')
const bourseController  = require('../controllers/bourse.controller');
const { validateBourse } = require('../middlewares/bourse.middleware');

console.log('✅ domaine.router.js chargé');
console.log('✅ fonction:', bourseController.creationBourse);

router.post('/', validateBourse, bourseController.creationBourse);
console.log('✅ Get');

router.get('/', bourseController.showBourse);
router.get('/:id', bourseController.getBourseById);


module.exports = router;
