const db = require('../config/db');

const Device = {
    getDeviceInfoUI: (deviceId, callback) => {
        const query = `
            SELECT
                device_id,
                device_model,
                device_internal_storage,
                device_external_storage,
                device_user_app_count,
                device_battery_level,
                device_temprature,
                device_ram,
                device_storage_used,
                device_manufacturer,
                device_os_version,
                device_ip,
                device_mac,
                device_lat,
                device_long,
                device_Sim1_IMEI,
                device_Sim2_IMEI,
                device_sno,
                device_sim1_no,
                device_sim2_no,
                DATE_FORMAT(created_dt, '%d-%m-%Y %T') AS created_dt,
                TIMESTAMPDIFF(MINUTE, created_dt, CURRENT_TIMESTAMP) AS minute_diff
            FROM device_info
            WHERE device_id = ?
        `;
        db.query(query, [deviceId], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]);
        });
    }
};

module.exports = Device;
