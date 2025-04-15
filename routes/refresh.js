const express = require('express');
const router = express.Router();
const refreshTokenController = require('../controllers/refreshTokenController');

/**
 * @swagger
 * /refresh:
 *   get:
 *     summary: Refresh token
 *     responses:
 *       200:
 *         description: Get the refresh token
 */
router.get('/', refreshTokenController.handleRefreshToken);

module.exports = router;