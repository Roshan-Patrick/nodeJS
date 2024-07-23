const Device = require('../models/deviceModel');

const deviceController = {
    getDeviceInfoUI: (req, res) => {
        const { device_id } = req.body;
        Device.getDeviceInfoUI(device_id, (err, deviceInfo) => {
            if (err) {
                console.error('Error fetching device info:', err);
                return res.status(500).send('Internal server error');
            }
            res.json({
                msg:[deviceInfo]
            });
        });
    }
};

module.exports = deviceController;
