// middlewares/validateApplication.js
const { body } = require('express-validator');

exports.applicationValidationRules = [
  body('surname').notEmpty().withMessage('Surname is required').isLength({ min: 2 }),
  body('forename').notEmpty().withMessage('Forename is required').isLength({ min: 2 }),
  body('gender').notEmpty().withMessage('Gender is required').isIn(['male', 'female', 'other']),
  body('dob').notEmpty().withMessage('DOB is required').isDate().withMessage('Invalid date format'),
  body('mobilenumber')
    .notEmpty().withMessage('Mobile number is required')
    .matches(/^\+?[0-9]{7,15}$/).withMessage('Invalid mobile number format'),
  body('personalemailaddress').optional().isEmail().withMessage('Invalid personal email'),
  body('workemailaddress').optional().isEmail().withMessage('Invalid work email'),
  body('preferredemail').optional().isIn(['personal', 'work'])
]; 

