const express = require('express');
const router = express.Router();
const { logActivity, getActivities } = require('../controllers/activity');

// /api/activity/log (Child app)
router.post('/log', logActivity);

// /api/activity/get/:childId (Parent app)
router.get('/get/:childId', getActivities);

module.exports = router;