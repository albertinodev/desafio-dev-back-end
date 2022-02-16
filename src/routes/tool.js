
const express = require('express');
const router = express.Router();

const appAdmin = require('../app/admin');

router.get('/app/admin', appAdmin.index);


module.exports = router;