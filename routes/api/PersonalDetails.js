const express = require("express");
const router = express.Router();
const ROLES_LIST = require('../../config/roles_list.js');
const verifyRoles = require('../../middlewares/verifyRoles.js');
const { applicationValidationRules } = require('../../middlewares/validateApplication.js');

const {
    createApplication,
    getAllApplications,
    getApplicationById,
    updateApplication,
    softDeleteApplication   
} = require('../../controllers/PersonalDetailsController');
  
// Apply routes
router.post('/', verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), applicationValidationRules, createApplication);
router.get('/',  getAllApplications);
router.get('/:id', verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), getApplicationById);
router.put('/:id', verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), applicationValidationRules, updateApplication);
router.delete('/:id', verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), softDeleteApplication);



module.exports = router;
