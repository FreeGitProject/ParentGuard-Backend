const Activity = require('../models/Activity');

// Child app sends activity logs
exports.logActivity = async (req, res) => {
  const { childId, appUsage, callLogs } = req.body;

  try {
    const activity = new Activity({
      childId,
      appUsage,
      callLogs,
    });

    await activity.save();
    res.status(200).json({ msg: 'Activity logged' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Parent fetches child's activity
exports.getActivities = async (req, res) => {
  const { childId } = req.params;

  try {
    const activities = await Activity.find({ childId }).sort({ timestamp: -1 });
    res.json(activities);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};