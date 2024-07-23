const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/deviceController');
const retailController = require('../controllers/retailShopController');
const auth = require('../middleware/auth');

/**
 * @swagger
 * /api/GetDeviceInfoUI:
 *   post:
 *     summary: Get device information by device ID
 *     tags: [DeviceInfo]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               device_id:
 *                 type: string
 *                 description: The ID of the device
 *     responses:
 *       200:
 *         description: Successful retrieval of device information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 device_id:
 *                   type: string
 *                 device_model:
 *                   type: string
 *                 device_internal_storage:
 *                   type: string
 *                 device_external_storage:
 *                   type: string
 *                 device_user_app_count:
 *                   type: integer
 *                 device_battery_level:
 *                   type: integer
 *                 device_temprature:
 *                   type: number
 *                 device_ram:
 *                   type: string
 *                 device_storage_used:
 *                   type: string
 *                 device_manufacturer:
 *                   type: string
 *                 device_os_version:
 *                   type: string
 *                 device_ip:
 *                   type: string
 *                 device_mac:
 *                   type: string
 *                 device_lat:
 *                   type: string
 *                 device_long:
 *                   type: string
 *                 device_Sim1_IMEI:
 *                   type: string
 *                 device_Sim2_IMEI:
 *                   type: string
 *                 device_sno:
 *                   type: string
 *                 device_sim1_no:
 *                   type: string
 *                 device_sim2_no:
 *                   type: string
 *                 created_dt:
 *                   type: string
 *                 minute_diff:
 *                   type: integer
 *       500:
 *         description: Internal server error
 */
router.post('/GetDeviceInfoUI', auth, deviceController.getDeviceInfoUI);



module.exports = router;
