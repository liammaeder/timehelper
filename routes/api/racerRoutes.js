const express   = require('express');
const router    = express.Router();
const dbConn    = require('../../controllers/DatabaseConnector');
const db        = new dbConn;
const tableName = 'racer';

router.use(express.json());

router.post('/testConn', (req, res) => {
    res.status(200).json({ data: 'Connection to racers success' });
});

router.post('/createRacer', async (req, res) => {
    const jsonData = JSON.parse(req.body);
    const values = jsonData.values;

    try {
        await db.create(tableName, values, (error, result) => {
            const response = db.handleCallback(error, result);
            res.status(response.status).json(response.json);
        });
    } catch (error) {
        res.status(500).json({ "Error": error.message });
    }
});

router.post('/getRacer', async (req, res) => {
    const jsonData = JSON.parse(req.body);
    const condition = jsonData.condition;

    try {
        await db.select(tableName, condition, (error, result) => {
            const response = db.handleCallback(error, result);
            res.status(response.status).json(response.json);
        });
    } catch (error) {
        res.status(500).json({ "Error": error.message });
    }
});

router.post('/getRacers', async (req, res) => {
    const jsonData = req.body;
    const condition = jsonData.condition;
    const limit = jsonData.limit;
    const offset = jsonData.offset;

    try {
        await db.selectMulti(tableName, condition, limit, offset, (error, result) => {
            const response = db.handleCallback(error, result);
            res.status(response.status).json(response.json);
        });
    } catch (error) {
        res.status(500).json({"Error": error.message});
    }
});

router.post('/updateRacer', async (req, res) => {
    const jsonData = req.body;
    const conditions = jsonData.conditions;
    const values = jsonData.values;

    try {
        await db.update(tableName, values, conditions, (error, result) => {
            const response = db.handleCallback(error, result);
            res.status(response.status).json(response.json);
        });
    } catch (error) {
        res.status(500).json({"Error": error.message});
    }
});

router.post('/deleteRacer', (req, res) => {
    res.json({data: 'Delete Racer successfully connected'});
});

module.exports = router;