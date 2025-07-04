const { body, validationResult } = require('express-validator');

exports.validateUser = [
  body('name')
    .notEmpty().withMessage('Le nom est requis')
    .isLength({ min: 2 }).withMessage('Le nom doit avoir au moins 2 caractères'),
  body('email')
    .notEmpty().withMessage('L’email est requis')
    .isEmail().withMessage('L’email doit être valide'),

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
