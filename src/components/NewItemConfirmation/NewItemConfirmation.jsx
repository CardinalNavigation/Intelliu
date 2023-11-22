import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function NewItemConfirmation() {
  const dispatch = useDispatch();
  const history = useHistory();
  // const documentsToSubmit = useSelector((store) => store.documentsToSubmit);
  const submittedDocumentList = useSelector((store) => store.submittedDocs);

  const submitComparison = () => {
    dispatch({ type: "DOCS_TO_INTELLIU" });
    history.push("/loadingscreen");
  };

  return (
    <div className="flex flex-row justify-center pt-36">
      <div></div>
      <div className="container mx-auto max-w-lg my-8 text-center bg-slate-200 px-32 pt-10 pb-28">
        <h2 className="text-3xl font-bold mb-4">
          Please Review Documents For Submission
        </h2>

        {submittedDocumentList.map((docName, idx) => (
          <p className="mb-4 text-2xl" key={idx + docName}>
            {docName}
          </p>
        ))}
        <div className="buttonsNewConfirmation flex justify-between ">
          <button
            onClick={() => history.push("/newitem")}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700"
          >
            Back
          </button>
          {submittedDocumentList[0] === "Loading Document Name..." ? (
            <button className="bg-slate-500 text-white py-2 px-4 rounded mr-4 hover:bg-blue-700">
              Submit
            </button>
          ) : (
            <button
              onClick={submitComparison}
              className="bg-blue-500 text-white py-2 px-4 rounded mr-4 hover:bg-blue-700"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default NewItemConfirmation;
