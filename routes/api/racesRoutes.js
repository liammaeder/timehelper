const express   = require('express');
const router    = express.Router();

router.get('/', (req, res) => {
    res.json({ data: 'Connection to races success' });
});

router.get('/createRace', (req, res) => {
    res.json({data: 'Create Race successfully connected'});
});

router.get('/updateRace', (req, res) => {
    res.json({data: 'Update Race successfully connected'});
});

router.get('/deleteRace', (req, res) => {
    res.json({data: 'Delete Race successfully connected'});
});

router.get('/getRace', (req, res) => {
    res.json({data: 'Get Race successfully connected'});
});

module.exports = router;