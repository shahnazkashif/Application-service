const { body } = require('express-validator');

module.exports = [
  body('profileId')
    .notEmpty().withMessage('Profile ID is required')
    .isMongoId().withMessage('Profile ID must be a valid Mongo ID'),

  body('subscriptionProduct')
    .notEmpty().withMessage('Subscription product is required'),

  body('membershipNo')
    .notEmpty().withMessage('Membership number is required'),

  body('membershipCategory')
    .notEmpty().withMessage('Membership category is required'),

  body('dateJoined')
    .notEmpty().withMessage('Date joined is required')
    .matches(/^\d{2}\/\d{2}\/\d{4}$/).withMessage('Date joined must be in DD/MM/YYYY format'),

  body('dateLeft')
    .optional()
    .matches(/^\d{2}\/\d{2}\/\d{4}$/).withMessage('Date left must be in DD/MM/YYYY format'),

  body('paymentType')
    .optional()
    .isIn(['Payroll Deduction', 'Direct Debit', 'Card Payment'])
    .withMessage('Invalid payment type'),

  body('paymentFrequency')
    .optional()
    .isIn(['Monthly', 'Quarterly', 'Annually'])
    .withMessage('Invalid payment frequency'),

  body('payrollNo')
    .optional()
    .isString().withMessage('Payroll number must be a string'),

  body('meta.createdBy')
    .optional()
    .isMongoId().withMessage('createdBy must be a valid Mongo ID'),

  body('meta.updatedBy')
    .optional()
    .isMongoId().withMessage('updatedBy must be a valid Mongo ID'),

  body('meta.isActive')
    .optional()
    .isBoolean().withMessage('isActive must be a boolean'),

  body('meta.deleted')
    .optional()
    .isBoolean().withMessage('deleted must be a boolean'),
];
