const express   = require('express');
const router    = express.Router();

router.get('/', (req, res) => {
    res.json({ data: 'Connection to racers success' });
});

router.get('/createRacer', (req, res) => {
    res.json({data: 'Create Racer successfully connected'});
});

router.get('/updateRacer', (req, res) => {
    res.json({data: 'Update Racer successfully connected'});
});
router.get('/deleteRacer', (req, res) => {
    res.json({data: 'Delete Racer successfully connected'});
});
router.get('/getRacer', (req, res) => {
    res.json({data: 'Get Racer successfully connected'});
});

module.exports = router;