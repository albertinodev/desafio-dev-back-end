
const express = require('express');
const router = express.Router();

const appAdmin = require('../app/admin');

router.get('/app/admin', appAdmin.index);
router.get('/app/admin/profile', appAdmin.profile);
router.get('/app/admin/invoices', appAdmin.invoices);
router.get('/app/admin/participants', appAdmin.participants);
router.get('/app/admin/requisitions', appAdmin.requisitions);
router.post('/app/check/requisition', appAdmin.checkRequisition);
router.post('/app/admin/delete/participant', appAdmin.deleteParticipant);

module.exports = router;