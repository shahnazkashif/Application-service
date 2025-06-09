const { body } = require('express-validator');

module.exports = [
  body('profileId')
    .notEmpty().withMessage('Profile ID is required')
    .isMongoId().withMessage('Profile ID must be a valid Mongo ID'),

  body('professionalDetails.grade')
    .notEmpty().withMessage('Grade is required')
    .isMongoId().withMessage('Grade must be a valid lookup ID'),

  body('professionalDetails.otherGrade')
    .notEmpty().withMessage('Other Grade is required')
    .isMongoId().withMessage('Other Grade must be a valid lookup ID'),

  body('professionalDetails.workLocation')
    .optional()
    .isMongoId().withMessage('Work Location must be a valid lookup ID'),

  body('professionalDetails.otherWorkLocation')
    .optional()
    .isMongoId().withMessage('Other Work Location must be a valid lookup ID'),

  body('professionalDetails.branchId')
    .optional()
    .isMongoId().withMessage('Branch must be a valid lookup ID'),

  body('professionalDetails.regionId')
    .optional()
    .isMongoId().withMessage('Region must be a valid lookup ID'),

  body('professionalDetails.studyLocation')
    .optional()
    .isMongoId().withMessage('Study Location must be a valid lookup ID'),

  body('professionalDetails.graduationDate')
    .optional()
    .matches(/^\d{2}\/\d{2}\/\d{4}$/)
    .withMessage('Graduation date must be in DD/MM/YYYY format'),

  body('professionalDetails.workLocationPhone')
    .optional()
    .isString().withMessage('Work location phone must be a string'),

  body('professionalDetails.primarySection')
    .optional().isString(),

  body('professionalDetails.secondarySection')
    .optional().isString(),

  body('professionalDetails.otherSection')
    .optional().isString(),

  body('professionalDetails.pensionNo')
    .optional().isString()
];
