const express       = require('express');
const router        = express.Router();
const dbConn        = require('../../controllers/DatabaseConnector');
const db            = new dbConn;

router.get('/', (req, res) => {
    res.json({ data: 'Connection to races success' });
});

router.post('/createRace', async (req, res) => {
    const jsonData = JSON.parse(req.body);
    const condition = jsonData.condition;
    const values = jsonData.values;
    const sql = `INSERT INTO race SET ${Object.entries(values).map(([key, value]) => `${key} = '${value}'`).join(', ')} WHERE ${Object.entries(condition).map(([key, value]) => `${key} = '${value}'`).join(' AND ')}`;

    try {
        await db.connect();
        await db.select(sql, jsonData, (error, result) => {
            if (error) {
                res.status(500);
                res.json({ message: error});
            } else {
                res.status(200);
                res.json({
                    message: "Race created successfully",
                    result: result
                });
            }
        });
    } catch (error) {
        res.json({"Error": error.message});
    }
});

router.put('/updateRace', async (req, res) => {
    const jsonData = JSON.parse(req.body);
    const condition = jsonData.condition;
    const values = jsonData.values;
    const sql = `UPDATE race SET ${Object.entries(values).map(([key, value]) => `${key} = '${value}'`).join(', ')} WHERE ${Object.entries(condition).map(([key, value]) => `${key} = '${value}'`).join(' AND ')}`

    try {
        await db.connect();
        await db.query(sql, (error, result) => {
            if (error) {
                res.status(500);
                res.json({message: error});
            } else {
                res.status(200);
                res.json({
                    message: "Race updated successfully",
                    result: result
                });
            }
        });
    } catch (error) {
        res.json({"Error": error.message});
    }
});

router.put('/updateRace', async (req, res) => {
    const jsonData = JSON.parse(req.body);
    const idArray = jsonData.idArray;
    const values = jsonData.values;
    const sql = `UPDATE race SET ${Object.entries(values).map(([key, value]) => `${key} = '${value}'`).join(', ')} WHERE id IN (${idArray.join(', ')})}`;

    try {
        await db.connect();
        await db.query(sql, (error, result) => {
            if (error) {
                res.status(500);
                res.json({message: error});
            } else {
                res.status(200);
                res.json({
                    message: "Races updated successfully",
                    result: result
                });
            }
        });
    } catch (error) {
        res.json({"Error": error.message});
    }
});

router.delete('/deleteRace', async (req, res) => {
    const jsonData = JSON.parse(req.body);
    const id = jsonData.id;
    const sql = `DELETE FROM race WHERE id = ${id}`;

    try {
        await db.connect();
        await db.query(sql, (error, result) => {
            if (error) {
                res.status(500);
                res.json({message: error});
            } else {
                res.status(200);
                res.json({
                    message: "Race deleted successfully",
                    result: result
                });
            }
        });
    } catch (error) {
        res.json({"Error": error.message});
    }
});

router.delete('/deleteRaces', async (req, res) => {
    const jsonData = JSON.parse(req.body);
    const idArray = jsonData.idArray;
    const sql = `DELETE FROM race WHERE id IN (${idArray.join(', ')})`;

    try {
        await db.connect();
        await db.query(sql, (error, result) => {
            if (error) {
                res.status(500);
                res.json({message: error});
            } else {
                res.status(200);
                res.json({
                    message: "Races deleted successfully",
                    result: result
                });
            }
        });
    } catch (error) {
        res.json({"Error": error.message});
    }
});

router.get('/getRaces', async (req, res) => {
    const jsonData = JSON.parse(req.body);
    const limit = jsonData.limit;
    const offset = jsonData.offset;
    const sql = `SELECT * FROM race LIMIT ${limit} OFFSET ${offset}`

    try {
        await db.connect();
        await db.query(sql, (error, result) => {
            if (error) {
                res.status(500);
                res.json({message: error});
            } else {
                res.status(200);
                res.json({
                    message: "Races retrieved successfully",
                    result: result
                });
            }
        });
    } catch (error) {
        res.json({"Error": error.message});
    }
});

router.get('/getRace', async (req, res) => {
    const jsonData = JSON.parse(req.body);
    const id = jsonData.id;
    const sql = `SELECT * FROM race WHERE id = ${id}}`

    try {
        await db.connect();
        await db.query(sql, (error, result) => {
            if (error) {
                res.status(500);
                res.json({message: error});
            } else {
                res.status(200);
                res.json({
                    message: "Race retrieved successfully",
                    result: result
                });
            }
        });
    } catch (error) {
        res.json({"Error": error.message});
    }
});

module.exports = router;