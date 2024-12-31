import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavourite } from '../redux/actions/addressActions';
import AddressCard from '../components/AddressCard';

const SavedAddresses = () => {
  const dispatch = useDispatch();
  const savedAddresses = useSelector((state) => state.address.savedAddresses);
  const [editAddress, setEditAddress] = useState(null); // Tracks the ID of the address being edited
  const [popupData, setPopupData] = useState({
    address: '',
    category: '',
    saveAs: '',
  });

  // Fetch addresses on component load
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/locations');
        dispatch({ type: 'SET_ADDRESSES', payload: response.data });
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };
    fetchAddresses();
  }, [dispatch]);

  // Open edit popup and populate fields
  const handleEditClick = (address) => {
    setEditAddress(address._id);
    setPopupData({
      address: address.address,
      category: address.category,
      saveAs: address.saveAs,
    });
  };

  // Close edit popup
  const handleClosePopup = () => {
    setEditAddress(null);
    setPopupData({ address: '', category: '', saveAs: '' });
  };

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPopupData((prev) => ({ ...prev, [name]: value }));
  };

  // Save updated address and close popup
  const handleSaveClick = async () => {
    try {
      const updatedAddress = await axios.patch(
        `http://localhost:5000/api/locations/${editAddress}`,
        popupData
      );
      dispatch({
        type: 'SET_ADDRESSES',
        payload: savedAddresses.map((address) =>
          address._id === editAddress ? updatedAddress.data : address
        ),
      });
      handleClosePopup();
    } catch (error) {
      console.error('Error updating address:', error);
    }
  };

  // Delete address
  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/locations/${id}`);
      dispatch({
        type: 'SET_ADDRESSES',
        payload: savedAddresses.filter((address) => address._id !== id),
      });
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  // Toggle favourite
  const handleFavouriteClick = (addressId) => {
    dispatch(toggleFavourite(addressId));
  };

  const favouritedAddresses = savedAddresses.filter(
    (address) => address.isFavourite
  );

  return (
    <div className="min-h-screen bg-blue-950 text-white p-6">
      {/* Edit Popup */}
      {editAddress && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Edit Address</h3>
            <div className="space-y-4">
              <input
                type="text"
                name="address"
                value={popupData.address}
                onChange={handleInputChange}
                placeholder="Address"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="category"
                value={popupData.category}
                onChange={handleInputChange}
                placeholder="Category"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="saveAs"
                value={popupData.saveAs}
                onChange={handleInputChange}
                placeholder="Save As"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={handleClosePopup}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveClick}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Address Lists */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 bg-blue-950 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-dark-blue mb-4">
            Saved Addresses
          </h2>
          <ul className="space-y-6">
            {savedAddresses.length > 0 ? (
              savedAddresses.map((address) => (
                <AddressCard
                  key={address._id}
                  address={address}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteClick}
                  onFavourite={handleFavouriteClick}
                />
              ))
            ) : (
              <p className="text-gray-500">No saved addresses found.</p>
            )}
          </ul>
        </div>

        <div className="hidden md:block w-px bg-gray-300 mx-4"></div>

        <div className="flex-1 bg-blue-950 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-dark-blue mb-4">
            Favourited Addresses
          </h2>
          <ul className="space-y-6">
            {favouritedAddresses.length > 0 ? (
              favouritedAddresses.map((address) => (
                <AddressCard
                  key={address._id}
                  address={address}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteClick}
                  onFavourite={handleFavouriteClick}
                />
              ))
            ) : (
              <p className="text-gray-500">No favourited addresses found.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SavedAddresses;



// // SavedAddresses.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useDispatch, useSelector } from 'react-redux';
// import { toggleFavourite } from '../redux/actions/addressActions';
// import AddressCard from '../components/AddressCard';

// const SavedAddresses = () => {
//   const dispatch = useDispatch();
//   const savedAddresses = useSelector((state) => state.address.savedAddresses);
//   const [editAddress, setEditAddress] = useState(null);
//   const [popupData, setPopupData] = useState({
//     address: '',
//     category: '',
//     saveAs: '',
//   });

//   useEffect(() => {
//     const fetchAddresses = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/locations');
//         dispatch({ type: 'SET_ADDRESSES', payload: response.data });
//       } catch (error) {
//         console.error('Error fetching addresses:', error);
//       }
//     };
//     fetchAddresses();
//   }, [dispatch]);

//   const handleEditClick = (address) => {
//     setEditAddress(address._id);
//     setPopupData({
//       address: address.address,
//       category: address.category,
//       saveAs: address.saveAs,
//     });
//   };

//   const handleClosePopup = () => {
//     setEditAddress(null);
//     setPopupData({ address: '', category: '', saveAs: '' });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setPopupData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSaveClick = async () => {
//     try {
//       await axios.patch(`http://localhost:5000/api/locations/${editAddress}`, popupData);
//       handleClosePopup();
//     } catch (error) {
//       console.error('Error updating address:', error);
//     }
//   };

//   const handleDeleteClick = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/locations/${id}`);
//       dispatch({ type: 'SET_ADDRESSES', payload: savedAddresses.filter((address) => address._id !== id) });
//     } catch (error) {
//       console.error('Error deleting address:', error);
//     }
//   };

//   const handleFavouriteClick = (addressId) => {
//     dispatch(toggleFavourite(addressId));
//   };

//   const favouritedAddresses = savedAddresses.filter(address => address.isFavourite);

//   return (
//     <div className="min-h-screen bg-blue-950 text-white p-6">
//       <div className="flex flex-col md:flex-row gap-6">
//         <div className="flex-1 bg-blue-950 p-6 rounded-lg shadow-md">
//           <h2 className="text-2xl font-bold text-dark-blue mb-4">Saved Addresses</h2>
//           <ul className="space-y-6">
//             {savedAddresses.length > 0 ? (
//               savedAddresses.map((address) => (
//                 <AddressCard
//                   key={address._id}
//                   address={address}
//                   onEdit={handleEditClick}
//                   onDelete={handleDeleteClick}
//                   onFavourite={handleFavouriteClick}
//                 />
//               ))
//             ) : (
//               <p className="text-gray-500">No saved addresses found.</p>
//             )}
//           </ul>
//         </div>

//         <div className="hidden md:block w-px bg-gray-300 mx-4"></div>

//         <div className="flex-1 bg-blue-950 rounded-lg shadow-md">
//           <h2 className="text-2xl font-bold text-dark-blue mb-4">Favourited Addresses</h2>
//           <ul className="space-y-6">
//             {favouritedAddresses.length > 0 ? (
//               favouritedAddresses.map((address) => (
//                 <AddressCard
//                   key={address._id}
//                   address={address}
//                   onEdit={handleEditClick}
//                   onDelete={handleDeleteClick}
//                   onFavourite={handleFavouriteClick}
//                 />
//               ))
//             ) : (
//               <p className="text-gray-500">No favourited addresses found.</p>
//             )}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SavedAddresses;



// import React, { useEffect } from 'react';
// import axios from 'axios';
// import { useDispatch, useSelector } from 'react-redux';
// import { toggleFavourite } from '../redux/actions/addressActions';

// const SavedAddresses = () => {
//   const dispatch = useDispatch();
//   const savedAddresses = useSelector((state) => state.address.savedAddresses);
//   const [editAddress, setEditAddress] = React.useState(null);
//   const [popupData, setPopupData] = React.useState({
//     address: '',
//     category: '',
//     saveAs: '',
//   });

//   useEffect(() => {
//     const fetchAddresses = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/locations');
//         // Dispatch an action to store addresses in Redux
//         dispatch({ type: 'SET_ADDRESSES', payload: response.data });
//       } catch (error) {
//         console.error('Error fetching addresses:', error);
//       }
//     };
//     fetchAddresses();
//   }, [dispatch]);

//   const handleEditClick = (address) => {
//     setEditAddress(address._id);
//     setPopupData({
//       address: address.address,
//       category: address.category,
//       saveAs: address.saveAs,
//     });
//   };

//   const handleClosePopup = () => {
//     setEditAddress(null);
//     setPopupData({ address: '', category: '', saveAs: '' });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setPopupData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSaveClick = async () => {
//     try {
//       await axios.patch(`http://localhost:5000/api/locations/${editAddress}`, popupData);
//       handleClosePopup();
//     } catch (error) {
//       console.error('Error updating address:', error);
//     }
//   };

//   const handleDeleteClick = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/locations/${id}`);
//       dispatch({ type: 'SET_ADDRESSES', payload: savedAddresses.filter((address) => address._id !== id) });
//     } catch (error) {
//       console.error('Error deleting address:', error);
//     }
//   };

//   const handleFavouriteClick = (addressId) => {
//     dispatch(toggleFavourite(addressId));
//   };

//   // Filter for favourited addresses
//   const favouritedAddresses = savedAddresses.filter(address => address.isFavourite);

//   return (
//     <div className="min-h-screen bg-blue-950 text-white p-6">
//       <div className="flex flex-col md:flex-row gap-6">
//         {/* Saved Addresses Section */}
//         <div className="flex-1 bg-blue-950 p-6 rounded-lg shadow-md">
//           <h2 className="text-2xl font-bold text-dark-blue mb-4">Saved Addresses</h2>
//           <ul className="space-y-6">
//             {savedAddresses.length > 0 ? (
//               savedAddresses.map((address) => (
//                 <li
//                   key={address._id}
//                   className="p-5 bg-gray-50 border rounded-lg shadow-lg hover:bg-gray-100 transition duration-200"
//                 >
//                   <p className="text-lg font-semibold text-dark-blue">Saved as: {address.saveAs}</p>
//                   <p className="text-gray-700">{address.address}</p>
//                   <p className="text-gray-500">{address.category}</p>
//                   <div className="mt-4 flex gap-4">
//                     <button
//                       onClick={() => handleEditClick(address)}
//                       className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-600 transition duration-200"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDeleteClick(address._id)}
//                       className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
//                     >
//                       Delete
//                     </button>
//                     <button
//                       onClick={() => handleFavouriteClick(address._id)}
//                       className={`px-4 py-2 rounded-md text-white transition duration-200 ${address.isFavourite ? 'bg-yellow-500 hover:bg-yellow-400' : 'bg-gray-500 hover:bg-gray-400'}`}
//                     >
//                       {address.isFavourite ? 'Unfavourite' : 'Favourite'}
//                     </button>
//                   </div>
//                 </li>
//               ))
//             ) : (
//               <p className="text-gray-500">No saved addresses found.</p>
//             )}
//           </ul>
//         </div>
  
//         {/* Partition */}
//         <div className="hidden md:block w-px bg-gray-300 mx-4"></div>
  
//         {/* Favourited Addresses Section */}
//         <div className="flex-1 bg-blue-950 rounded-lg shadow-md">
//           <h2 className="text-2xl font-bold text-dark-blue mb-4">Favourited Addresses</h2>
//           <ul className="space-y-6">
//             {favouritedAddresses.length > 0 ? (
//               favouritedAddresses.map((address) => (
//                 <li
//                   key={address._id}
//                   className="p-5 bg-gray-50 border rounded-lg shadow-lg hover:bg-gray-100 transition duration-200"
//                 >
//                   <p className="text-lg font-semibold text-dark-blue">Saved as: {address.saveAs}</p>
//                   <p className="text-gray-700">{address.address}</p>
//                   <p className="text-gray-500">{address.category}</p>
//                   <div className="mt-4 flex gap-4">
//                     <button
//                       onClick={() => handleEditClick(address)}
//                       className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-600 transition duration-200"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDeleteClick(address._id)}
//                       className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
//                     >
//                       Delete
//                     </button>
//                     <button
//                       onClick={() => handleFavouriteClick(address._id)}
//                       className={`px-4 py-2 rounded-md text-white transition duration-200 ${address.isFavourite ? 'bg-yellow-500 hover:bg-yellow-400' : 'bg-gray-500 hover:bg-gray-400'}`}
//                     >
//                       {address.isFavourite ? 'Unfavourite' : 'Favourite'}
//                     </button>
//                   </div>
//                 </li>
//               ))
//             ) : (
//               <p className="text-gray-500">No favourited addresses found.</p>
//             )}
//           </ul>
//         </div>
//       </div>
  
//       {editAddress && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//             <h3 className="text-xl font-semibold text-dark-blue mb-4">Edit Address</h3>
//             <label className="block mb-4">
//               <span className="text-sm font-medium text-gray-700">Address</span>
//               <input
//                 type="text"
//                 name="address"
//                 value={popupData.address}
//                 onChange={handleInputChange}
//                 className="mt-1 w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-dark-blue"
//               />
//             </label>
//             <label className="block mb-4">
//               <span className="text-sm font-medium text-gray-700">Category</span>
//               <input
//                 type="text"
//                 name="category"
//                 value={popupData.category}
//                 onChange={handleInputChange}
//                 className="mt-1 w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-dark-blue"
//               />
//             </label>
//             <label className="block mb-4">
//               <span className="text-sm font-medium text-gray-700">Saved As</span>
//               <input
//                 type="text"
//                 name="saveAs"
//                 value={popupData.saveAs}
//                 onChange={handleInputChange}
//                 className="mt-1 w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-dark-blue"
//               />
//             </label>
//             <div className="flex justify-end gap-4">
//               <button
//                 onClick={handleClosePopup}
//                 className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition duration-200"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSaveClick}
//                 className="px-4 py-2 bg-dark-blue text-white rounded-md hover:bg-blue-700 transition duration-200"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
  
// };

// export default SavedAddresses;


// import React, { useEffect } from 'react';
// import axios from 'axios';
// import { useDispatch, useSelector } from 'react-redux';
// import { toggleFavourite } from '../redux/actions/addressActions';

// const SavedAddresses = () => {
//   const dispatch = useDispatch();
//   const savedAddresses = useSelector((state) => state.address.savedAddresses);
//   const [editAddress, setEditAddress] = React.useState(null);
//   const [popupData, setPopupData] = React.useState({
//     address: '',
//     category: '',
//     saveAs: '',
//   });

//   useEffect(() => {
//     const fetchAddresses = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/locations');
//         // Dispatch an action to store addresses in Redux
//         dispatch({ type: 'SET_ADDRESSES', payload: response.data });
//       } catch (error) {
//         console.error('Error fetching addresses:', error);
//       }
//     };
//     fetchAddresses();
//   }, [dispatch]);

//   const handleEditClick = (address) => {
//     setEditAddress(address._id);
//     setPopupData({
//       address: address.address,
//       category: address.category,
//       saveAs: address.saveAs,
//     });
//   };

//   const handleClosePopup = () => {
//     setEditAddress(null);
//     setPopupData({ address: '', category: '', saveAs: '' });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setPopupData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSaveClick = async () => {
//     try {
//       await axios.patch(`http://localhost:5000/api/locations/${editAddress}`, popupData);
//       // No need to update Redux here, as Redux is managing the favourite state
//       handleClosePopup();
//     } catch (error) {
//       console.error('Error updating address:', error);
//     }
//   };

//   const handleDeleteClick = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/locations/${id}`);
//       dispatch({ type: 'SET_ADDRESSES', payload: savedAddresses.filter((address) => address._id !== id) });
//     } catch (error) {
//       console.error('Error deleting address:', error);
//     }
//   };

//   const handleFavouriteClick = (addressId) => {
//     dispatch(toggleFavourite(addressId));
//   };

//   return (
//     <div className="min-h-screen bg-blue-950 text-white flex flex-col items-center justify-center p-4">
//       <h2 className="text-2xl font-bold text-dark-blue">Saved Addresses</h2>
//       <ul className="mt-6 space-y-4">
//         {savedAddresses.length > 0 ? (
//           savedAddresses.map((address) => (
//             <li key={address._id} className="p-4 border rounded-lg shadow-md bg-white">
//               <p className="text-lg text-gray-700 font-semibold text-dark-blue">Saved as: {address.saveAs}</p>
//               <p className="text-gray-700">{address.address}</p>
//               <p className="text-gray-500">{address.category}</p>
//               <div className="mt-4 flex space-x-4">
//                 <button
//                   onClick={() => handleEditClick(address)}
//                   className="px-4 py-2 text-white bg-blue-700 rounded hover:bg-blue-700"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDeleteClick(address._id)}
//                   className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
//                 >
//                   Delete
//                 </button>
//                 <button
//                   onClick={() => handleFavouriteClick(address._id)}
//                   className={`px-4 py-2 text-white ${address.isFavourite ? 'bg-yellow-500' : 'bg-gray-500'} rounded hover:bg-yellow-600`}
//                 >
//                   {address.isFavourite ? 'Unfavourite' : 'Favourite'}
//                 </button>
//               </div>
//             </li>
//           ))
//         ) : (
//           <p className="text-gray-500">No saved addresses found.</p>
//         )}
//       </ul>

//       {editAddress && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded shadow-lg w-96">
//             <h3 className="text-xl font-semibold text-dark-blue mb-4">Edit Address</h3>
//             <label className="block mb-4">
//               <span className="text-sm font-medium text-gray-700">Address</span>
//               <input
//                 type="text"
//                 name="address"
//                 value={popupData.address}
//                 onChange={handleInputChange}
//                 className="mt-1 w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-dark-blue"
//               />
//             </label>
//             <label className="block mb-4">
//               <span className="text-sm font-medium text-gray-700">Category</span>
//               <input
//                 type="text"
//                 name="category"
//                 value={popupData.category}
//                 onChange={handleInputChange}
//                 className="mt-1 w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-dark-blue"
//               />
//             </label>
//             <label className="block mb-4">
//               <span className="text-sm font-medium text-gray-700">Saved As</span>
//               <input
//                 type="text"
//                 name="saveAs"
//                 value={popupData.saveAs}
//                 onChange={handleInputChange}
//                 className="mt-1 w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-dark-blue"
//               />
//             </label>
//             <div className="flex justify-end space-x-4">
//               <button
//                 onClick={handleClosePopup}
//                 className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSaveClick}
//                 className="px-4 py-2 bg-dark-blue text-white rounded hover:bg-blue-700"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SavedAddresses;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const SavedAddresses = () => {
//   const [savedAddresses, setSavedAddresses] = useState([]);
//   const [editAddress, setEditAddress] = useState(null);
//   const [popupData, setPopupData] = useState({ address: '', category: '', saveAs: '' });

//   useEffect(() => {
//     const fetchAddresses = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/locations');
//         setSavedAddresses(response.data);
//       } catch (error) {
//         console.error('Error fetching addresses:', error);
//       }
//     };
//     fetchAddresses();
//   }, []);

//   const handleEditClick = (address) => {
//     setEditAddress(address._id);
//     setPopupData({
//       address: address.address,
//       category: address.category,
//       saveAs: address.saveAs,
//     });
//   };

//   const handleClosePopup = () => {
//     setEditAddress(null);
//     setPopupData({ address: '', category: '', saveAs: '' });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setPopupData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSaveClick = async () => {
//     try {
//       await axios.patch(`http://localhost:5000/api/locations/${editAddress}`, popupData);
//       setSavedAddresses((prev) =>
//         prev.map((address) =>
//           address._id === editAddress ? { ...address, ...popupData } : address
//         )
//       );
//       handleClosePopup();
//     } catch (error) {
//       console.error('Error updating address:', error);
//     }
//   };

//   const handleDeleteClick = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/locations/${id}`);
//       setSavedAddresses((prev) => prev.filter((address) => address._id !== id));
//     } catch (error) {
//       console.error('Error deleting address:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-blue-950 text-white flex flex-col items-center justify-center p-4">
//       <h2 className="text-2xl font-bold text-dark-blue">Saved Addresses</h2>
//       <ul className="mt-6 space-y-4">
//         {savedAddresses.length > 0 ? (
//           savedAddresses.map((address) => (
//             <li key={address._id} className="p-4 border rounded-lg shadow-md bg-white">
//               <p className="text-lg text-gray-700 font-semibold text-dark-blue">Saved as: {address.saveAs}</p>
//               <p className="text-gray-700">{address.address}</p>
//               <p className="text-gray-500">{address.category}</p>
//               <div className="mt-4 flex space-x-4">
//                 <button
//                   onClick={() => handleEditClick(address)}
//                   className="px-4 py-2 text-white bg-blue-700 rounded hover:bg-blue-700"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDeleteClick(address._id)}
//                   className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </li>
//           ))
//         ) : (
//           <p className="text-gray-500">No saved addresses found.</p>
//         )}
//       </ul>

//       {editAddress && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded shadow-lg w-96">
//             <h3 className="text-xl font-semibold text-dark-blue mb-4">Edit Address</h3>
//             <label className="block mb-4">
//               <span className="text-sm font-medium text-gray-700">Address</span>
//               <input
//                 type="text"
//                 name="address"
//                 value={popupData.address}
//                 onChange={handleInputChange}
//                 className="mt-1 w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-dark-blue"
//               />
//             </label>
//             <label className="block mb-4">
//               <span className="text-sm font-medium text-gray-700">Category</span>
//               <input
//                 type="text"
//                 name="category"
//                 value={popupData.category}
//                 onChange={handleInputChange}
//                 className="mt-1 w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-dark-blue"
//               />
//             </label>
//             <label className="block mb-4">
//               <span className="text-sm font-medium text-gray-700">Saved As</span>
//               <input
//                 type="text"
//                 name="saveAs"
//                 value={popupData.saveAs}
//                 onChange={handleInputChange}
//                 className="mt-1 w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-dark-blue"
//               />
//             </label>
//             <div className="flex justify-end space-x-4">
//               <button
//                 onClick={handleClosePopup}
//                 className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSaveClick}
//                 className="px-4 py-2 bg-dark-blue text-white rounded hover:bg-blue-700"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SavedAddresses;
