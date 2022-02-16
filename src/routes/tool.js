
const express = require('express');
const router = express.Router();

const appAdmin = require('../app/admin');

router.get('/get', appAdmin.index);


module.exports = router;