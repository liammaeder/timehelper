const express           = require('express');
const router            = express.Router();
const PartCls           = require("../../controllers/Participants");
const Participants      = new PartCls();

router.use(express.json());

router.post('/test', (req, res) => {
    res.json({data: 'Connection to participants success'});
});

router.post('/createParticipant', async (req, res) => {
    const jsonData = req.body;

    try {
        const response = await Participants.createParticipant(jsonData);
        res.status(response.status).json(response.json);
    } catch (error) {
        res.status(500).json({"Error": error.message});
    }
});

router.post('/getParticipant', async (req, res) => {
    const jsonData = req.body;

    try {
        const response = await Participants.getParticipant(jsonData);
        res.status(response.status).json(response.json[0]);
    } catch (error) {
        res.status(500).json({"Error": error.message});
    }
});

router.post('/getParticipants', async (req, res) => {
    const jsonData = req.body;

    try {
        const response = await Participants.getParticipants(jsonData);
        res.status(response.status).json(response.json[0]);
    } catch (error) {
        res.status(500).json({"Error": error.message});
    }
});

router.post('/getParticipantLinks', async (req, res) => {
   const jsonData = req.body;

   try {
       const response = await Participants.getParticipantLinks(jsonData);
       res.status(response.status).json(response.json[0]);
   } catch (error) {
       res.status(500).message(error.message);
   }
});

router.post('/updateParticipant', async (req, res) => {
    const jsonData = req.body;

    try {
        const response = await Participants.updateParticipant(jsonData);
        res.status(response.status).json(response.json);
    } catch (error) {
        res.status(500).json({"Error": error.message});
    }
});

router.post('/deleteParticipant', async (req, res) => {
    const jsonData = req.body;

    try {
        const response = await Participants.deleteParticipants(jsonData);
        res.status(response.status).json(response.json);
    } catch (error) {
        res.status(500).json({"Error": error.message});
    }
});

router.post('/unlinkAllRacers', async (req, res) => {
    const jsonData = req.body;

    try {
        const response = await Participants.unlinkAllRacers(jsonData);
        res.status(response.status).json(response.json);
    } catch (error) {
        res.status(500).json({"Error": error.message})
    }
});

module.exports = router;