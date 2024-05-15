const express           = require('express');
const router            = express.Router();
const RacersCls         = require('../../controllers/Racers');
const Racers            = new RacersCls();

router.use(express.json());

router.post('/test', (req, res) => {
    res.status(200).json({ data: 'Connection to racers success' });
});

router.post('/createRacer', async (req, res) => {
    const jsonData = req.body;

    try {
        const response = await Racers.createRacer(jsonData);
        res.status(response.status).json(response.json);
    } catch (error) {
        res.status(500).json({ "Error": error.message });
    }
});

router.post('/getRacer', async (req, res) => {
    const jsonData = req.body;

    try {
        const response = await Racers.getRacer(jsonData);
        res.status(response.status).json(response.json);
    } catch (error) {
        res.status(500).json({ "Error": error.message });
    }
});

router.post('/getRacers', async (req, res) => {
    const jsonData = req.body;

    try {
        const response = await Racers.getRacers(jsonData);
        res.status(response.status).json(response.json);
    } catch (error) {
        res.status(500).json({"Error": error.message});
    }
});

router.post('/getRacersNotInRace', async (req, res) => {
    const jsonData = req.body;

    try {
        const response = await Racers.getRacersNotInRace(jsonData);
        res.status(response.status).json(response.json);
    } catch (error) {
        res.status(500).json({"Error": error.message});
    }
});

router.post('/updateRacer', async (req, res) => {
    const jsonData = req.body;

    try {
        const response = await Racers.updateRacer(jsonData);
        res.status(response.status).json(response.json);
    } catch (error) {
        res.status(500).json({"Error": error.message});
    }
});

router.post('/linkRacer', async (req, res) => {
    const jsonData = req.body;

    try {
        const response = await Racers.linkRacer(jsonData);
        res.status(response.status).json(response.json);
    } catch (error) {
        res.status(500).json({"Error": error.message});
    }
});

router.post('/deleteRacer', async (req, res) => {
    const jsonData = req.body;

    try {
        const response = await Racers.deleteRacer(jsonData);
        res.status(response.status).json(response.json);
    } catch (error) {
        res.status(500).json({"Error": error.message});
    }
});

module.exports = router;