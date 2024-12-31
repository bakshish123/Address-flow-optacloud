const Location = require('../models/locationModel');

const saveLocation = async (req, res) => {
  try {
    const { address, category, saveAs } = req.body;

    if (!address || !category || !saveAs) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const location = new Location({
      address,
      category,
      saveAs,
    });
    await location.save();
    res.status(201).json(location);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteLocation = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedLocation = await Location.findByIdAndDelete(id);

    if (!deletedLocation) {
      return res.status(404).json({ message: 'Location not found.' });
    }

    res.status(200).json({ message: 'Location deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const { address, category, saveAs } = req.body;

    if (!address || !category || !saveAs) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const updatedLocation = await Location.findByIdAndUpdate(
      id,
      { address, category, saveAs },
      { new: true, runValidators: true }
    );

    if (!updatedLocation) {
      return res.status(404).json({ message: 'Location not found.' });
    }

    res.status(200).json(updatedLocation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { saveLocation, getLocations, updateLocation, deleteLocation };
