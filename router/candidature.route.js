const express = require('express');
const router = express.Router();
const {validateDomaine} = require('../middlewares/domaine.validator')
const bourseController  = require('../controllers/bourse.controller');
const { validateBourse } = require('../middlewares/bourse.middleware');
const CandidatureController = require('../controllers/candidature.controller')
const multer = require('multer');
const path = require('path');

// Stockage des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/fichiers');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});


const upload = multer({ storage });

router.post(
  '/',
  upload.fields([
    { name: 'cv' },
    { name: 'DiplomeRequis' },
    { name: 'denierDiplome' },
    { name: 'lettreRecommandation' },
  ]),
  CandidatureController.postuler
);

// routes.ts
router.get('/:email', CandidatureController.getCandidaturesByEmail);
console.log('✅ domaine.router.js chargé can');
console.log('✅ fonction:', CandidatureController.creationBourse);
router.get('/', CandidatureController.getAllCandidature);
/*
router.post('/', CandidatureController.creationCandidature);
console.log('✅ Get');

router.get('/:id', bourseController.getBourseById);
*/

module.exports = router;
