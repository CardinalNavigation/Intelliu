import React from "react";
import "./LoadingScreen.css";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

function LoadingScreen() {
  const history = useHistory();
  const submittedDocumentList = useSelector((store) => store.submittedDocs);

  return (
    <div className="flex flex-row justify-center">
      <div className="loading-screen-container pt-[150px]">
        <div className="centered-content bg-white p-8 border rounded shadow-md">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Files Submitted
          </h2>
          {submittedDocumentList.map((docName, idx) => {
            return (
              <p className="text-lg text-gray-700 mb-2" key={idx + docName}>
                {docName}
              </p>
            );
          })}
          <p>
            Your files are being processed by IntelliU, <br /> 
            depending on document size this could be complete<br />
            within 30 minutes or take multiple hours.
          </p>
          <div className="lds-dual-ring"></div>
        </div>
        <button
          className="back-button rounded-full bg-sky-500/50 p-2"
          onClick={() => history.push("/dashboard")}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default LoadingScreen;
