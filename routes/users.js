// User routes
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [Users]
 *     description: ""
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Internal Server Error
 */
router.get('/', usersController.getAllUsers);

/**
 * @swagger
 * /users:
 *   post:
 *     tags: [Users]
 *     description: ""
 *     produces:
 *       - application/json
 *     responses:
 *       201:
 *         description: Created
 *       500:
 *         description: Internal Server Error
 */
router.post('/', usersController.createUser);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags: [Users]
 *     description: ""
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.get('/:id', usersController.getUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags: [Users]
 *     description: ""
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Internal Server Error
 */
router.put('/:id', usersController.updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags: [Users]
 *     description: ""
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Internal Server Error
 */
router.delete('/:id', usersController.deleteUser);

module.exports = router;