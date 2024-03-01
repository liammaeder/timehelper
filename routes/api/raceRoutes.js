const express           = require('express');
const router            = express.Router();
const RacesCls          = require("../../controllers/Races");
const Races             = new RacesCls();

router.use(express.json());

router.post('/testConn', (req, res) => {
    res.status(200).json({ data: 'Connection to races success' });
});

router.post('/createRace', async (req, res) => {
    const jsonData = req.body;

    try {
        const response = await Races.createRace(jsonData);
        res.status(response.status).json(response.json);
    } catch (error) {
        res.status(500).json({"Error": error.message});
    }
});

router.post('/getEditableRace', async (req, res) => {
    const jsonData = req.body;

    try {
        const response = await Races.getEditableRace(jsonData);
        res.status(response.status).json(response.json);
    } catch (error) {
        res.status(500).json({"Error": error.message});
    }
})

router.post('/getRaceParticipants', async (req, res) => {
    const jsonData = req.body;

    try {
        const response = await Races.getRaceParticipants(jsonData);
        res.status(response.status).json(response.json);
    } catch (error) {
        res.status(500).json({"Error": error.message});
    }
});

router.post('/getRace', async (req, res) => {
    const jsonData = req.body;

    try {
        if (parseInt(jsonData.id) <= 0) {
            res.status(404).json({"Error": "no data for Id, " + jsonData.id});
        } else {
            const result = await Races.getRace(jsonData);
            res.status(result.status).json(JSON.parse(result.json));
        }
    } catch (error) {
        res.status(500).json({"Error": error.message});
    }
});

router.post('/getRacesList', async (req, res) => {
    const jsonData = req.body;

    try {
        const response = await Races.getRacesList(jsonData);
        res.status(response.status).json(response.json);
    } catch (error) {
        res.status(500).json({"Error": error.message});
    }
});

router.post('/getRaces', async (req, res) => {
    const jsonData = req.body;

    try {
        const response = await Races.getRaces(jsonData);
        res.status(response.status).json(response.json);
    } catch (error) {
        res.status(500).json({"Error": error.message});
    }
});

router.post('/updateRace', async (req, res) => {
    const jsonData = req.body;

    try {
        const response = await Races.updateRace(jsonData);
        res.status(response.status).json(response.json);
    } catch (error) {
        res.status(500).json({"Error": error.message});
    }
});

router.post('/deleteRaces', async (req, res) => {
    const jsonData = req.body;

    try {
        const response = await Races.deleteRace(jsonData);
        res.status(response.status).json(response.json);
    } catch (error) {
        res.status(500).json({"Error": error.message});
    }
});

module.exports = router;