const documentNamesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_DOCUMENT_NAMES':
      return action.payload;
    case 'UNSET_DOCUMENT_NAMES':
      return [];
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default documentNamesReducer;
