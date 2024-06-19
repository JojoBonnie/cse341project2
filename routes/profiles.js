const express = require("express");
const router = express.Router();
const profilesController = require("../controllers/profiles");

/**
 * @swagger
 * /profiles:
 *   get:
 *     tags: [Profiles]
 *     description: ""
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Internal Server Error
 */
router.get("/", profilesController.getAllProfiles);

/**
 * @swagger
 * /profiles/{id}:
 *   get:
 *     tags: [Profiles]
 *     description: ""
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.get("/:id", profilesController.getProfile);

/**
 * @swagger
 * /profiles:
 *   post:
 *     tags: [Profiles]
 *     description: ""
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Profile'
 *     responses:
 *       201:
 *         description: Created
 *       500:
 *         description: Internal Server Error
 */
router.post("/", profilesController.createProfile);

/**
 * @swagger
 * /profiles/{id}:
 *   put:
 *     tags: [Profiles]
 *     description: ""
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Profile'
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Internal Server Error
 */
router.put("/:id", profilesController.updateProfile);

/**
 * @swagger
 * /profiles/{id}:
 *   delete:
 *     tags: [Profiles]
 *     description: ""
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Internal Server Error
 */
router.delete("/:id", profilesController.deleteProfile);

module.exports = router;
