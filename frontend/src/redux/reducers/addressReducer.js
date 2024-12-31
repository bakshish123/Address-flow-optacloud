const initialState = {
    savedAddresses: [],
  };
  
  const addressReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_ADDRESSES':
        return {
          ...state,
          savedAddresses: action.payload,
        };
      case 'TOGGLE_FAVOURITE':
        return {
          ...state,
          savedAddresses: state.savedAddresses.map((address) =>
            address._id === action.payload
              ? { ...address, isFavourite: !address.isFavourite }
              : address
          ),
        };
      default:
        return state;
    }
  };
  
  export default addressReducer;
  