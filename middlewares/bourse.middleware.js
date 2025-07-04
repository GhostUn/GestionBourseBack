const { body, validationResult } = require('express-validator');

exports.validateBourse = [
  body('nomBourse')
    .notEmpty().withMessage('Le nom de la Bourse est requis'),
  body('montant')
    .notEmpty().withMessage('le montant est requis'),
    body('pays')
    .notEmpty().withMessage('Les pays eligibles sont requis'),
  body('type')
    .notEmpty().withMessage('Le type de bourse est requis'),

      body('dateOuverture')
    .notEmpty().withMessage('La date d\'Ouverture est requise'),
  body('dateCloture')
    .notEmpty().withMessage('La date de cloture est requise'),
    body('niveau')
    .notEmpty().withMessage('Le niveau est requis'),
  body('domaine')
    .notEmpty().withMessage('le domaine est requis'),
    
      body('conditionAge')
    .notEmpty().withMessage('condition d\'Age requis'),
  body('conditionNationalite')
    .notEmpty().withMessage(' les conditions Nationalite sont requis'),
    
    body('document')
    .notEmpty().withMessage('Les document sont requis'),
  body('remarque')
    .notEmpty().withMessage('La remarque est requise'),
      body('universitePartenaire')
    .notEmpty().withMessage('L\'universite Partenaire est requis'),
  body('NombreDePlace')
    .notEmpty().withMessage('le Nombre De Place est requis'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array().map(err => ({ champ: err.param, message: err.msg }))
      });
    }
    next();
  }
];
