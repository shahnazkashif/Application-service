const express = require('express');
const router = express.Router();
const verifyRoles = require('../../middlewares/verifyRoles');
const ROLES_LIST = require('../../config/roles_list');
const validateSubscription = require('../../middlewares/validateProfile/validateSubscription');
const ctrl = require('../../controllers/subscriptionController');

router.post('/', verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), validateSubscription, ctrl.createSubscription);
router.get('/', ctrl.getAllSubscriptions);
router.get('/:id', ctrl.getSubscriptionById);
router.put('/:id', verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), validateSubscription, ctrl.updateSubscription);
router.delete('/:id', verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), ctrl.softDeleteSubscription);
router.patch('/:id/restore', verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), ctrl.restoreSubscription);
router.patch('/:id/status', verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), ctrl.toggleSubscriptionStatus);

module.exports = router;


