export const selectedDocument = (state = "", action) => {
  if (action.type === "SET_SELECTED") {
    // console.log(action.payload)
    return action.payload;
  }
  return state;
};
