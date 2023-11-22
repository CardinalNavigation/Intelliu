export const standards = (state = [], action) => {
  if (action.type === "SET_STANDARDS") {
    // console.log(action.payload)
    return action.payload;
  }
  return state;
};
