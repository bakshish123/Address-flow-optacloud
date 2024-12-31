import React, { useState } from 'react';
import LocationPermissionModal from '../components/LocationPermissionModal';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isManualSearch, setIsManualSearch] = useState(false);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [addressDetails, setAddressDetails] = useState({
    address: '',
    state: '',
    city: '',
    saveAs: '',
  });

  const navigate = useNavigate();

  const handleLocationChange = (lat, lng) => {
    setLocation({ lat, lng });
    setMarkerPosition({ lat, lng });
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const address = results[0].formatted_address;
        const components = results[0].address_components;
        const state = components.find((comp) => comp.types.includes('administrative_area_level_1'))?.long_name || '';
        const city = components.find((comp) => comp.types.includes('locality'))?.long_name || '';
        setAddressDetails({
          address,
          state,
          city,
          saveAs: '',
        });
      }
    });
  };

  const handleLocationError = (error) => {
    setLocationError(error);
  };

  const handleMarkerDragEnd = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setMarkerPosition({ lat, lng });
    setLocation({ lat, lng });
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const address = results[0].formatted_address;
        const components = results[0].address_components;
        const state = components.find((comp) => comp.types.includes('administrative_area_level_1'))?.long_name || '';
        const city = components.find((comp) => comp.types.includes('locality'))?.long_name || '';
        setAddressDetails({
          address,
          state,
          city,
          saveAs: '',
        });
      }
    });
  };

  const handleSaveLocation = () => {
    fetch('http://localhost:5000/api/save-location', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address: addressDetails.address,
        category: location ? 'auto' : 'manual',
        saveAs: addressDetails.saveAs,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        navigate('/locations');
      })
      .catch((error) => {
        console.error('Error saving location:', error);
      });
  };

  return (
    <div className="min-h-screen bg-blue-950 text-white flex flex-col items-center justify-center p-4">
      <div className="mb-4">
        {location ? (
          <p className="text-lg font-semibold text-blue-700">
            Current Location: {location.lat}, {location.lng}
          </p>
        ) : locationError ? (
          <p className="text-lg font-semibold text-red-600">{locationError}</p>
        ) : (
          <p className="text-sm text-center text-white">
            Location not available. Please enable location or search manually.
          </p>
        )}
      </div>
      {isModalOpen && (
        <LocationPermissionModal
          onLocationChange={handleLocationChange}
          onLocationError={handleLocationError}
          setIsManualSearch={setIsManualSearch}
        />
      )}
      {(location || isManualSearch) && (
        <div className="w-full max-w-4xl">
          <div style={{ height: '400px', width: '100%' }} className="rounded-lg overflow-hidden border border-gray-200 shadow-md">
            <LoadScript googleMapsApiKey="AIzaSyBMISrTsHopvdz_6BnbRcwhhNEq23L_V-E">
              <GoogleMap
                mapContainerStyle={{ height: '100%', width: '100%' }}
                center={markerPosition || { lat: 37.7749, lng: -122.4194 }}
                zoom={12}
              >
                <Marker
                  position={markerPosition || { lat: 37.7749, lng: -122.4194 }}
                  draggable={true}
                  onDragEnd={handleMarkerDragEnd}
                />
              </GoogleMap>
            </LoadScript>
          </div>
          <div className="mt-4 bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-blue-700 mb-4">Enter Additional Address Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  value={addressDetails.address}
                  onChange={(e) => setAddressDetails({ ...addressDetails, address: e.target.value })}
                  className="w-full p-2 mt-1 border text-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">State</label>
                <input
                  type="text"
                  value={addressDetails.state}
                  onChange={(e) => setAddressDetails({ ...addressDetails, state: e.target.value })}
                  className="w-full p-2 mt-1 border text-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="State"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  value={addressDetails.city}
                  onChange={(e) => setAddressDetails({ ...addressDetails, city: e.target.value })}
                  className="w-full p-2 mt-1 border text-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="City"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Save As</label>
                <input
                  type="text"
                  value={addressDetails.saveAs}
                  onChange={(e) => setAddressDetails({ ...addressDetails, saveAs: e.target.value })}
                  className="w-full p-2 mt-1 border text-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Save this location as"
                />
              </div>
            </div>
            <button
              onClick={handleSaveLocation}
              className="mt-6 w-full py-2 px-4 bg-red-600 text-white font-medium rounded-md hover:bg-red-700"
              disabled={!addressDetails.address || !addressDetails.state || !addressDetails.city || !addressDetails.saveAs}
            >
              Save Location
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
