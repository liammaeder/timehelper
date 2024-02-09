const express           = require('express');
const router            = express.Router();
const DatabaseHelper    = require('../../middelwares/DatabaseHelpers');
const dbHelper          = new DatabaseHelper;

router.post('/', (req, res) => {
    res.json({ data: 'Connection to participant_type success' });
});

router.post('/getParticipantType', async (req, res) => {
    const jsonData = req.body;

    try {
        const response = await dbHelper.select(jsonData, "participant_type");
        res.status(response.status).json(response.json);
    } catch (err) {
        res.status(500).json({ "Error": err.message });
    }
});

router.post('/getParticipantTypes', async (req, res) => {
    const jsonData = req.body;

    try {
        const response = await dbHelper.selectMulti(jsonData, "participant_type");
        res.status(response.status).json(response.json);
    } catch (err) {
        res.status(500).json({ "Error": err.message });
    }
});

module.exports = router;