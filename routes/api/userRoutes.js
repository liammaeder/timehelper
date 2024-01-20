const express   = require('express');
const router    = express.Router();

router.get('/', (req, res) => {
    res.json({ data: 'Connection to users success' });
});

router.get('/createUser', (req, res) => {
    res.json({data: 'Create User successfully connected'});
});

router.get('/updateUser', (req, res) => {
    res.json({data: 'Update User successfully connected'});
});

router.get('/deleteUser', (req, res) => {
    res.json({data: 'Delete User successfully connected'});
});

router.get('/getUser', (req, res) => {
    res.json({data: 'Get User successfully connected'});
});

module.exports = router;