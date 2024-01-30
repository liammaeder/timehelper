const express           = require('express');
const router            = express.Router();
const DatabaseHelper    = require('../../middelwares/DatabaseHelpers');
const dbHelper          = new DatabaseHelper;

router.get('/', (req, res) => {
    res.json({ data: 'Connection to race_status success' });
});

router.post('/getStatus', async (req, res) => {
    const jsonData = req.body;

    try {
        const response = await dbHelper.select(jsonData, "race_status");
        res.status(response.status).json(response.json);
    } catch (err) {
        res.status(500).json({ "Error": err.message });
    }
});

router.get('/getStatuses', async (req, res) => {
    const jsonData = req.body;

    try {
        const response = await dbHelper.selectMulti(jsonData, "race_status");
        res.status(response.status).json(response.json);
    } catch (err) {
        res.status(500).json({ "Error": err.message });
    }
});

module.exports = router;