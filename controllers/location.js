const Location = require('../models/Location');

// Child app sends location updates
exports.updateLocation = async (req, res) => {
  const { childId, lat, lng } = req.body;

  try {
    const location = new Location({
      childId,
      coordinates: { lat, lng },
    });

    await location.save();
    res.status(200).json({ msg: 'Location updated' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Parent fetches child's location history
exports.getLocations = async (req, res) => {
  const { childId } = req.params;

  try {
    const locations = await Location.find({ childId }).sort({ timestamp: -1 });
    res.json(locations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};