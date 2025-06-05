// middlewares/validateProfile/validatePersonalInfo.js
const { body } = require('express-validator');

module.exports = [
 // body('userId').notEmpty().withMessage('userId is required').isMongoId(),

  body('personalInfo.title').notEmpty().withMessage('Title is required').isMongoId(),
  body('personalInfo.surname').notEmpty().withMessage('Surname is required'),
  body('personalInfo.forename').notEmpty().withMessage('Forename is required'),
  body('personalInfo.gender').notEmpty().withMessage('Gender is required').isMongoId(),
  body('personalInfo.dateOfBirth')
    .notEmpty().withMessage('Date of birth is required')
    .matches(/^\d{2}\/\d{2}\/\d{4}$/).withMessage('Use format DD/MM/YYYY'),
  //body('personalInfo.deceasedDate')
    //.optional()
    //.matches(/^\d{2}\/\d{2}\/\d{4}$/).withMessage('Use format DD/MM/YYYY'),
];
