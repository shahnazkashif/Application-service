const express = require('express');
const router = express.Router();
const verifyRoles = require('../../middlewares/verifyRoles');
const ROLES_LIST = require('../../config/roles_list');

const validateProfile = require('../../middlewares/validateProfile/validateProfile');
const {
  createProfile,
  getAllProfiles,
  getProfileById,
  updateProfile,
  softDeleteProfile,
  restoreProfile,
  toggleStatus
} = require('../../controllers/ProfileController');

//router.get('/test', (req, res) => {
  //  res.send('Profile route is working');
  //});


router.post('/', verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), validateProfile, createProfile);
router.get('/', getAllProfiles);
router.get('/:id', getProfileById);
router.put('/:id', verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), validateProfile, updateProfile);
router.patch('/delete/:id', verifyRoles(ROLES_LIST.Admin), softDeleteProfile);
router.patch('/restore/:id', verifyRoles(ROLES_LIST.Admin), restoreProfile);
router.patch('/status/:id', verifyRoles(ROLES_LIST.Admin), toggleStatus);

module.exports = router;


