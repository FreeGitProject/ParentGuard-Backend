const express = require('express');
const router = express.Router();
const { updateLocation, getLocations } = require('../controllers/location');

// /api/location/update (Child app)
router.post('/update', updateLocation);

// /api/location/get/:childId (Parent app)
router.get('/get/:childId', getLocations);

module.exports = router;