export const documentsToSubmit = (
  state = { DocA: null, DocB: null },
  action
) => {
  if (action.type === "DOCS_TO_SUBMIT") {
    // console.log(action.payload)
    return action.payload;
  }
  return state;
};
