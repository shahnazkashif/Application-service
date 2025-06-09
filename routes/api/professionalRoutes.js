const express = require('express');
const router = express.Router();
const verifyRoles = require('../../middlewares/verifyRoles');
const ROLES_LIST = require('../../config/roles_list');
const validateProfessional = require('../../middlewares/validateProfile/validateProfessionalInfo');
const controller = require('../../controllers/professionalDetailsController');

router.post('/', verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), validateProfessional, controller.createProfessional);
router.get('/', controller.getAllProfessionals);
router.get('/:id', controller.getProfessionalById);
router.put('/:id', verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), validateProfessional, controller.updateProfessional);
router.patch('/:id/delete', verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), controller.softDeleteProfessional);
router.patch('/:id/restore', verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), controller.restoreProfessional);
router.patch('/:id/status', verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), controller.toggleStatus);

module.exports = router;





