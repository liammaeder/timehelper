const express           = require('express');
const router            = express.Router();
const DatabaseHelper    = require('../../middelwares/DatabaseHelpers');
const dbHelper          = new DatabaseHelper;

router.use(express.json());

router.post('/test', (req, res) => {
    res.status(200).json({ data: 'Connection to racers success' });
});

router.post('/createRacer', async (req, res) => {
    const jsonData = req.body;

    try {
        const response = await dbHelper.create(jsonData, 'race');
        res.status(response.status).json(response.json);
    } catch (error) {
        res.status(500).json({ "Error": error.message });
    }
});

router.post('/getRacer', async (req, res) => {
    const jsonData = req.body;
    console.log(jsonData);

    try {
        const response = await dbHelper.select(jsonData, 'racer');
        res.status(response.status).json(response.json[0]);
    } catch (error) {
        res.status(500).json({ "Error": error.message });
    }
});

router.post('/getRacers', async (req, res) => {
    const jsonData = req.body;

    try {
        const response = await dbHelper.selectMulti(jsonData, 'racer');
        res.status(response.status).json(response.json);
    } catch (error) {
        res.status(500).json({"Error": error.message});
    }
});

router.post('/updateRacer', async (req, res) => {
    const jsonData = req.body;

    try {
        const response =await dbHelper.update(jsonData, 'racer');
        res.status(response.status).json(response.json);
    } catch (error) {
        res.status(500).json({"Error": error.message});
    }
});

router.post('/deleteRacer', (req, res) => {
    res.json({data: 'Delete Racer successfully connected'});
});

module.exports = router;