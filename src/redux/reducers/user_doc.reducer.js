const userDocsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_USER_DOCS':
      // console.log("User Docs Reducer:", action.payload)
      return action.payload;
    case 'UNSET_USER_DOCS':
      return [];
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default userDocsReducer;
