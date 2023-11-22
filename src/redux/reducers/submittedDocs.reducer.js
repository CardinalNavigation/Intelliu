export const submittedDocs = (
  state = ["Loading Document Name...", "Loading Document Name..."],
  action
) => {
  if (action.type === "SUBMITTED_DOCS") {
    return [action.payload.docA, action.payload.docB];
  }
  return state;
};
