const router = require('express').Router();

const patient = require('./patients');
const donors = require('./donors');
const bloodBanks = require('./bloodBanks');

router.get('/patients', patient.getPatient);
router.post('/patient/Add', patient.InsertPatient);

router.get('/donors', donors.getAlldonrs);
router.post('/donor/Add', donors.InsertDoner);

router.get('/bloodBanks', bloodBanks.getAllBloodBank);
router.post('/bloodBank/Add', bloodBanks.InsertBloodBank);

module.exports = router;
