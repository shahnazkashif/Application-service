const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController.js');

/**
 * @swagger
 * /register:
 *   post:
 *     summary: create a new user
 *     responses:
 *       200:
 *         description: create a new user. username, password are requried
 */
router.post('/', registerController.handleNewUser);

module.exports = router;