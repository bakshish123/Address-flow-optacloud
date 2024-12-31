export const toggleFavourite = (addressId) => {
    return {
      type: 'TOGGLE_FAVOURITE',
      payload: addressId,
    };
  };
  