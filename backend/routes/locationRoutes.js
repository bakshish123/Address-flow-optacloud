const express = require('express');
const router = express.Router();
const { saveLocation, getLocations, updateLocation, deleteLocation } = require('../controllers/locationController');

// Route to save a new location
router.post('/save-location', saveLocation);

// Route to get all locations
router.get('/locations', getLocations);

// Route to update a location by ID
router.patch('/locations/:id', updateLocation);

// Route to delete a specific location by ID
router.delete('/locations/:id', deleteLocation);

module.exports = router;
