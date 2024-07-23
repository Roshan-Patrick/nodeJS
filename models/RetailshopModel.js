const db = require('../config/db');

const Shop = {
    countByDistrict: (districtId, callback) => {
        const query = `
            SELECT COUNT(*) as count
            FROM tbl_shop ts
            LEFT JOIN tbl_district td ON ts.district_id = td.id
            WHERE ts.district_id = ?;
        `;
        db.query(query, [districtId], (err, results) => {
            console.log(results);
            if (err) return callback(err);
            callback(null, results[0].count);
        });
    },
    // countAllShops: (callback) => {
    //     const query = `
    //         SELECT COUNT(*) as count
    //         FROM tbl_shop ts
    //         LEFT JOIN tbl_district td ON ts.district_id = td.id;
    //     `;
    //     db.query(query, (err, results) => {
    //         if (err) return callback(err);
    //         callback(null, results[0].count);
    //     });
    // },
    countDevices: (districtId, callback) => {
        const query = `
SELECT  COUNT(*) AS "Total" FROM device_info di LEFT JOIN entity_master em ON em.device_number=di.device_id WHERE  TIME_TO_SEC((TIMEDIFF(NOW(),di.created_dt))) < 660 AND em.entity_type_code = "RETAIL_SHOP" AND di.device_model LIKE "%TEG%" 
UNION 
SELECT COUNT(*) AS "Total" FROM device_info di LEFT JOIN entity_master em ON em.device_number=di.device_id WHERE em.entity_type_code = "RETAIL_SHOP" AND di.device_model LIKE "%TEG%"
        `;
        db.query(query, (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    getDeviceStatus: (callback) => {
        const query = `
            SELECT
                di.device_id,
                di.device_lat,
                di.device_long,
                di.device_Sim1_IMEI,
                di.device_Sim2_IMEI,
                di.device_sim1_no,
                di.device_sim2_no,
                em.entity_code AS device_shopcode,
                em.location_name,
                DATE_FORMAT(di.created_dt, "%d-%m-%Y") AS created_dt_new,
                DATE_FORMAT(di.created_dt, "%T") AS created_time,
                (SELECT IF((TIME_TO_SEC(TIMEDIFF(NOW(), di.created_dt))) < 660, "Online", "Offline")) AS "Status"
            FROM
                device_info di
            LEFT JOIN
                entity_master em ON em.device_number = di.device_id
            WHERE
                em.entity_type_code = "RETAIL_SHOP"
                AND di.device_model LIKE "%TEG%"
        `;
        db.query(query, (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    getPaginatedDeviceStatus: (page, limit, searchBy, sortBy, sortOrder, status, callback) => {
        const offset = (page - 1) * limit;
        const searchQuery = searchBy ? `AND (di.device_id LIKE ? OR DATE_FORMAT(di.created_dt, '%d-%m-%Y') LIKE ? OR DATE_FORMAT(di.created_dt, '%T') LIKE ?)` : '';
        const searchParams = searchBy ? [`%${searchBy}%`, `%${searchBy}%`, `%${searchBy}%`] : [];
    

        const allowedSortColumns = {
            device_id: 'di.device_id',
            created_dt_time: 'di.created_dt', // Use di.created_dt for combined sorting
        };
        const sortColumn = allowedSortColumns[sortBy] ? allowedSortColumns[sortBy] : 'di.device_id';
        const sortDirection = sortOrder === 'desc' ? 'DESC' : 'ASC';
    
        // Add status condition
        let statusCondition = '';
        if (status === 'online') {
            statusCondition = `AND (TIME_TO_SEC(TIMEDIFF(NOW(), di.created_dt)) < 660)`;
        } else if (status === 'offline') {
            statusCondition = `AND (TIME_TO_SEC(TIMEDIFF(NOW(), di.created_dt)) >= 660)`;
        }
    
        const query = `
            SELECT
                di.device_id,
                di.device_lat,
                di.device_long,
                di.device_Sim1_IMEI,
                di.device_Sim2_IMEI,
                di.device_sim1_no,
                di.device_sim2_no,
                em.entity_code AS device_shopcode,
                em.location_name,
                DATE_FORMAT(di.created_dt, "%d-%m-%Y") AS created_dt_new,
                DATE_FORMAT(di.created_dt, "%T") AS created_time,
                (SELECT IF((TIME_TO_SEC(TIMEDIFF(NOW(), di.created_dt))) < 660, "Online", "Offline")) AS "Status"
            FROM
                device_info di
            LEFT JOIN
                entity_master em ON em.device_number = di.device_id
            WHERE
                em.entity_type_code = "RETAIL_SHOP"
                AND di.device_model LIKE "%TEG%"
                ${searchQuery}
                ${statusCondition}
            ORDER BY ${sortColumn} ${sortDirection}
            LIMIT ? OFFSET ?
        `;
    
        const countQuery = `
            SELECT COUNT(*) AS totalCount
            FROM
                device_info di
            LEFT JOIN
                entity_master em ON em.device_number = di.device_id
            WHERE
                em.entity_type_code = "RETAIL_SHOP"
                AND di.device_model LIKE "%TEG%"
                ${statusCondition}
        `;
    
        const searchCountQuery = `
            SELECT COUNT(*) AS searchCount
            FROM
                device_info di
            LEFT JOIN
                entity_master em ON em.device_number = di.device_id
            WHERE
                em.entity_type_code = "RETAIL_SHOP"
                AND di.device_model LIKE "%TEG%"
                ${searchQuery}
                ${statusCondition}
        `;
    
        db.query(countQuery, (err, countResults) => {
            if (err) return callback(err);
    
            const totalCount = countResults[0].totalCount;
    
            db.query(searchCountQuery, searchParams, (err, searchCountResults) => {
                if (err) return callback(err);
    
                const searchCount = searchCountResults[0].searchCount;
    
                db.query(query, [...searchParams, limit, offset], (err, results) => {
                    if (err) return callback(err);
    
                    callback(null, {
                        totalCount,
                        searchCount: searchBy ? searchCount : totalCount,
                        devices: results
                    });
                });
            });
        });
    }
    
,


    getRetailOnlineList: (callback) => {
        const query = `
            SELECT
                di.device_id,
                di.device_lat,
                di.device_long,
                di.device_Sim1_IMEI,
                di.device_Sim2_IMEI,
                di.device_sim1_no,
                di.device_sim2_no,
                em.entity_code AS device_shopcode,
                em.location_name,
                DATE_FORMAT(di.created_dt, "%d-%m-%Y") AS created_dt_new,
                DATE_FORMAT(di.created_dt, "%T") AS created_time,
                (SELECT IF ((TIME_TO_SEC((TIMEDIFF(NOW(), di.created_dt)))) < 660, "Online", "Offline")) AS "Status"
            FROM device_info di
            LEFT JOIN entity_master em ON em.device_number = di.device_id
            WHERE TIME_TO_SEC((TIMEDIFF(NOW(), di.created_dt))) < 660
            AND em.entity_type_code = "RETAIL_SHOP"
            AND di.device_model LIKE "%TEG%"
        `;
        db.query(query, (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    getRetailOfflineList: (callback) => {
        const query = `
            SELECT
                di.device_id,
                di.device_lat,
                di.device_long,
                di.device_Sim1_IMEI,
                di.device_Sim2_IMEI,
                di.device_sim1_no,
                di.device_sim2_no,
                em.entity_code AS device_shopcode,
                em.location_name,
                DATE_FORMAT(di.created_dt, "%d-%m-%Y") AS created_dt_new,
                DATE_FORMAT(di.created_dt, "%T") AS created_time,
                (SELECT IF ((TIME_TO_SEC((TIMEDIFF(NOW(), di.created_dt)))) > 660, "Offline", "Online")) AS "Status"
            FROM device_info di
            LEFT JOIN entity_master em ON em.device_number = di.device_id
            WHERE TIME_TO_SEC((TIMEDIFF(NOW(), di.created_dt))) > 660
            AND em.entity_type_code = "RETAIL_SHOP"
            AND di.device_model LIKE "%TEG%"
        `;
        db.query(query, (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    }
};

module.exports = Shop;
