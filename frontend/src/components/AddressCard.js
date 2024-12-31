// AddressCard.js
import React from 'react';

const AddressCard = ({ address, onEdit, onDelete, onFavourite }) => {
  return (
    <li className="p-5 bg-gray-50 border rounded-lg shadow-lg hover:bg-gray-100 transition duration-200">
      <p className="text-lg font-semibold text-gray-700 text-dark-blue">Saved as: {address.saveAs}</p>
      <p className="text-gray-700">{address.address}</p>
      <p className="text-gray-500">{address.category}</p>
      <div className="mt-4 flex gap-4">
        <button
          onClick={() => onEdit(address)}
          className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-600 transition duration-200"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(address._id)}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
        >
          Delete
        </button>
        <button
          onClick={() => onFavourite(address._id)}
          className={`px-4 py-2 rounded-md text-white transition duration-200 ${address.isFavourite ? 'bg-yellow-500 hover:bg-yellow-400' : 'bg-gray-500 hover:bg-gray-400'}`}
        >
          {address.isFavourite ? 'Unfavourite' : 'Favourite'}
        </button>
      </div>
    </li>
  );
};

export default AddressCard;
