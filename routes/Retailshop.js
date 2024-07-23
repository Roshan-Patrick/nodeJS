const express = require('express');
const router = express.Router();
const retailController = require('../controllers/retailShopController');
const auth = require('../middleware/auth');

/**
 * @swagger
 * /api/retail/count:
 *   post:
 *     summary: Count shops by district ID
 *     tags: [Retail]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - districtId
 *             properties:
 *               districtId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful count
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *       500:
 *         description: Internal server error
 */
router.post('/count', auth, retailController.countByDistrict);

// /**
//  * @swagger
//  * /api/shop/countAll:
//  *   get:
//  *     summary: Count all shops
//  *     tags: [Retail]
//  *     security:
//  *       - bearerAuth: []
//  *     responses:
//  *       200:
//  *         description: Successful count
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 count:
//  *                   type: integer
//  *       500:
//  *         description: Internal server error
//  */
// router.get('/countAll', auth, shopController.countAllShops);

/**
 * @swagger
 * /api/retail/PosRetailReg:
 *   post:
 *     summary: Count devices based on the provided criteria
 *     tags: [Retail]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *
 *     responses:
 *       200:
 *         description: Successful count
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   Total:
 *                     type: integer
 *       500:
 *         description: Internal server error
 */
router.post('/PosRetailReg', auth, retailController.countDevices);


/**
 * @swagger
 * /api/retail/PosRetailRegList:
 *   post:
 *     summary: Get device status
 *     tags: [Retail]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful retrieval
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   device_id:
 *                     type: string
 *                   device_lat:
 *                     type: string
 *                   device_long:
 *                     type: string
 *                   device_Sim1_IMEI:
 *                     type: string
 *                   device_Sim2_IMEI:
 *                     type: string
 *                   device_sim1_no:
 *                     type: string
 *                   device_sim2_no:
 *                     type: string
 *                   device_shopcode:
 *                     type: string
 *                   location_name:
 *                     type: string
 *                   created_dt_new:
 *                     type: string
 *                   created_time:
 *                     type: string
 *                   Status:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
router.post('/PosRetailRegList', auth, retailController.getDeviceStatus);

/**
 * @swagger
 * /api/retail/PosRetailOnlineList:
 *   post:
 *     summary: Get retail online list
 *     tags: [Retail]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties: {}
 *     responses:
 *       200:
 *         description: Successful retrieval of retail online list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   device_id:
 *                     type: string
 *                   device_lat:
 *                     type: string
 *                   device_long:
 *                     type: string
 *                   device_Sim1_IMEI:
 *                     type: string
 *                   device_Sim2_IMEI:
 *                     type: string
 *                   device_sim1_no:
 *                     type: string
 *                   device_sim2_no:
 *                     type: string
 *                   device_shopcode:
 *                     type: string
 *                   location_name:
 *                     type: string
 *                   created_dt_new:
 *                     type: string
 *                   created_time:
 *                     type: string
 *                   Status:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
router.post('/PosRetailOnlineList', auth, retailController.getRetailOnlineList);


/**
 * @swagger
 * /api/retail/PosRetailOfflineList:
 *   post:
 *     summary: Get retail online list
 *     tags: [Retail]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties: {}
 *     responses:
 *       200:
 *         description: Successful retrieval of retail online list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   device_id:
 *                     type: string
 *                   device_lat:
 *                     type: string
 *                   device_long:
 *                     type: string
 *                   device_Sim1_IMEI:
 *                     type: string
 *                   device_Sim2_IMEI:
 *                     type: string
 *                   device_sim1_no:
 *                     type: string
 *                   device_sim2_no:
 *                     type: string
 *                   device_shopcode:
 *                     type: string
 *                   location_name:
 *                     type: string
 *                   created_dt_new:
 *                     type: string
 *                   created_time:
 *                     type: string
 *                   Status:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
router.post('/PosRetailOfflineList', auth, retailController.getRetailOfflineList);

/**
 * @swagger
 * /api/retail/PosRetailRegListPaginated:
 *   post:
 *     summary: Get paginated device status
 *     tags: [Retail]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               page:
 *                 type: integer
 *                 description: >
 *                   Page number for pagination (default: 1)
 *               limit:
 *                 type: integer
 *                 description: >
 *                   Number of items per page (default: 10)
 *               searchBy:
 *                  type: string
 *                  description: >
 *                    Search term for device_id   
  *               sortBy:
 *                 type: string
 *                 description: Column to sort by (device_id, created_dt_time)
 *                 enum: [device_id, created_dt_time]
 *               sortOrder:
 *                 type: string
 *                 description: Sort order (asc or desc)
 *                 enum: [asc, desc]
 *     responses:
 *       200:
 *         description: Successful retrieval
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 type: object
 *                 properties:
 *                   totalCount:
 *                      type: integer
 *                      description: Total number of devices
 *                   device_id:
 *                     type: string
 *                   device_lat:
 *                     type: string
 *                   device_long:
 *                     type: string
 *                   device_Sim1_IMEI:
 *                     type: string
 *                   device_Sim2_IMEI:
 *                     type: string
 *                   device_sim1_no:
 *                     type: string
 *                   device_sim2_no:
 *                     type: string
 *                   device_shopcode:
 *                     type: string
 *                   location_name:
 *                     type: string
 *                   created_dt_new:
 *                     type: string
 *                   created_time:
 *                     type: string
 *                   Status:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
router.post('/PosRetailRegListPaginated', auth, retailController.getPaginatedDeviceStatus);


module.exports = router;
