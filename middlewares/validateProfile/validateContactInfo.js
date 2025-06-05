// middlewares/validateProfile/validateContactInfo.js
const { body } = require('express-validator');

module.exports = [
  body('contactInfo.preferredAddress').optional().isIn(['home', 'work']),
  body('contactInfo.homeAddress.buildingOrHouse')
    .notEmpty().withMessage('Home address building/house is required'),
  body('contactInfo.homeAddress.countyCityOrPostCode')
    .notEmpty().withMessage('Home address county/city/postcode is required'),
  body('contactInfo.emailWork')
    .if(body('contactInfo.emailPersonal').not().exists())
    .notEmpty().withMessage('Work email is required if no personal email provided')
    .isEmail().withMessage('Invalid work email'),
  body('contactInfo.emailPersonal')
    .optional()
    .isEmail().withMessage('Invalid personal email'),
  body('contactInfo.mobile').notEmpty().withMessage('Mobile number is required'),
];
