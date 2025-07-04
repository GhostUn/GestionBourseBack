const { body, validationResult } = require('express-validator');

exports.validateDomaine = [
  body('libelle')
    .notEmpty().withMessage('le libelle es rrequis')
    .isLength({ min: 2 }).withMessage('Le libelle doit avoir au moins 2 caractères'),
  body('codeDomaine')
    .notEmpty().withMessage('Le code Domainel est requis'),
    
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
