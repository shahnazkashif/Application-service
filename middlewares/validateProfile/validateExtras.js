// middlewares/validateProfile/validateExtras.js
const { body } = require('express-validator');

module.exports = [
  body('extras.termsAccepted')
    .equals('true')
    .withMessage('Terms must be accepted'),
];
