const express = require('express');
const router = express.Router();
const DatabaseHelper = require('../../middelwares/DatabaseHelpers');
const dbHelper = new DatabaseHelper;

router.use(express.json());

router.post('/test', (req, res) => {
    res.json({data: 'Connection to participants success'});
});

router.post('/createParticipant', async (req, res) => {
    const jsonData = req.body;

    try {
        const response = await dbHelper.create(jsonData, 'participant');
        res.status(response.status).json(response.json);
    } catch (error) {
        res.status(500).json({"Error": error.message});
    }
});

router.post('/getParticipant', async (req, res) => {
    const jsonData = req.body;

    try {
        const response = await dbHelper.select(jsonData, 'participant');
        res.status(response.status).json(response.json[0]);
    } catch (error) {
        res.status(500).json({"Error": error.message});
    }
});

router.post('/getParticipants', async (req, res) => {
    const jsonData = req.body;

    try {
        const response = await dbHelper.selectMulti(jsonData, 'participant');
        res.status(response.status).json(response.json[0]);
    } catch (error) {
        res.status(500).json({"Error": error.message});
    }
});

router.post('/updateParticipant', async (req, res) => {
    const jsonData = req.body;

    try {
        const response = await dbHelper.update(jsonData, 'participant');
        res.status(response.status).json(response.json);
    } catch (error) {
        res.status(500).json({"Error": error.message});
    }
});

router.post('/deleteParticipant', async (req, res) => {
    const jsonData = req.body;

    try {
        const response = await dbHelper.delete(jsonData, 'participant');
        res.status(response.status).json(response.json);
    } catch (error) {
        res.status(500).json({"Error": error.message});
    }
});

module.exports = router;