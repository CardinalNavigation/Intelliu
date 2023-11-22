const userResultsReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_RESULTS':
      return action.payload;
    case 'UNSET_RESULTS':
      return null;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default userResultsReducer;
