const Retail = require('../models/RetailshopModel');

const shopController = {
    countByDistrict: (req, res) => {
        const { districtId } = req.body;
        Retail.countByDistrict(districtId, (err, count) => {
            if (err) {
                console.error('Error counting shops by district:', err);
                return res.status(500).send('Internal server error');
            }
            res.json({ count });
        });
    },
    // countAllShops: (req, res) => {
    //     Shop.countAllShops((err, count) => {
    //         if (err) {
    //             console.error('Error counting shops:', err);
    //             return res.status(500).send('Internal server error');
    //         }
    //         res.json({ count });
    //     });
    // },
    countDevices: (req, res) => {
        const { districtId } = req.body;
        Retail.countDevices(districtId, (err, results) => {
            if (err) {
                console.error('Error counting devices:', err);
                return res.status(500).send('Internal server error');
            }
            res.json({
                msg: "success",
                TotalOnlinePOSRetails : results[0].Total,
                TotalRegPOSRetail : results[1].Total
                
            });
        });
    },
    getDeviceStatus: (req, res) => {
        Retail.getDeviceStatus((err, results) => {
            if (err) {
                console.error('Error fetching device status:', err);
                return res.status(500).send('Internal server error');
            }
            res.json(results);
        });
    },


    getPaginatedDeviceStatus: (req, res) => {
        const { page = 1, limit = 10, searchBy = '', sortBy = 'device_id', sortOrder = 'asc', status = 'all' } = req.body;
        Retail.getPaginatedDeviceStatus(page, limit, searchBy, sortBy, sortOrder,status, (err, results) => {
            if (err) {
                console.error('Error fetching paginated device status:', err);
                return res.status(500).send('Internal server error');
            }
            res.json(results);
        });
    },



    getRetailOnlineList: (req, res) => {
        Retail.getRetailOnlineList((err, results) => {
            if (err) {
                console.error('Error fetching retail online list:', err);
                return res.status(500).send('Internal server error');
            }
            res.json(results);
        });
    },
    getRetailOfflineList: (req, res) => {
        Retail.getRetailOfflineList((err, results) => {
            if (err) {
                console.error('Error fetching retail online list:', err);
                return res.status(500).send('Internal server error');
            }
            res.json(results);
        });
    }
};

module.exports = shopController;
