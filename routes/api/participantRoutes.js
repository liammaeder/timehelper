const express   = require('express');
const router    = express.Router();

router.get('/', (req, res) => {
    res.json({ data: 'Connection to users success' });
});

router.get('/createParticipant', (req, res) => {
    res.json({data: 'Create Participant successfully connected'});
});

router.get('/updateParticipant', (req, res) => {
    res.json({data: 'Update Participant successfully connected'});
});

router.get('/deleteParticipant', (req, res) => {
    res.json({data: 'Delete Participant successfully connected'});
});

router.get('/getParticipant', (req, res) => {
    res.json({data: 'Get Participant successfully connected'});
});

module.exports = router;