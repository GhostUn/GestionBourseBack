const express = require('express');
const router = express.Router();
const {validateDomaine} = require('../middlewares/domaine.validator')
const domaineController  = require('../controllers/domaine.controller');
const { validateUser } = require('../middlewares/user.validator');

console.log('✅ domaine.router.js chargé');
console.log('✅ fonction:', domaineController.createDomaine);

router.post('/', validateDomaine, domaineController.createDomaine);

router.get('/', domaineController.showDomaine);



module.exports = router;
