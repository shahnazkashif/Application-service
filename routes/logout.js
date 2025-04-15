const express = require('express');
const router = express.Router();
const logoutController = require('../controllers/logoutController');

/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Logout
 *     responses:
 *       200:
 *         description: A Sign out of the application
 */
router.get('/', logoutController.handleLogout);

module.exports = router;