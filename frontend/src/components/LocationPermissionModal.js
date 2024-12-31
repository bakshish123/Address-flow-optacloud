


import React, { useState } from 'react';

const LocationPermissionModal = ({ onLocationChange, onLocationError, setIsManualSearch }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const enableLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onLocationChange(latitude, longitude);
          setIsModalOpen(false);
        },
        (error) => {
          let errorMessage = '';
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location access denied. Please enable location permissions.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information is unavailable. Trying IP-based location.';
              getLocationFromIP();
              break;
            case error.TIMEOUT:
              errorMessage = 'Request timed out. Please try again.';
              break;
            default:
              errorMessage = 'An unknown error occurred while retrieving location.';
          }
          onLocationError(errorMessage);
        },
        { timeout: 10000 }
      );
    } else {
      onLocationError('Geolocation is not supported by this browser.');
    }
  };

  const getLocationFromIP = () => {
    fetch('http://ip-api.com/json')
      .then((response) => response.json())
      .then((data) => {
        onLocationChange(data.lat, data.lon);
        setIsModalOpen(false);
      })
      .catch((error) => {
        onLocationError('Unable to determine location via IP.');
        setIsModalOpen(false);
      });
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ${isModalOpen ? '' : 'hidden'}`}>
      <div className="bg-white rounded-lg w-11/12 sm:w-1/3 p-6 shadow-lg flex flex-col items-center space-y-6 relative">
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
        <h2 className="text-2xl font-semibold text-center text-blue-700">Location Permission Required</h2>
        <p className="text-sm text-center text-gray-600">
          To automatically update your delivery address, we need access to your location.
        </p>

        <div className="flex justify-between space-x-4 w-full">
          <button
            onClick={enableLocation}
            className="w-full py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 focus:outline-none"
          >
            Enable Location
          </button>
          <button
            onClick={() => {
              setIsManualSearch(true);
              setIsModalOpen(false);
            }}
            className="w-full py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
          >
            Search Manually
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationPermissionModal;
