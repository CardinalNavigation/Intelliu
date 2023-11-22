import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function FAQs() {
const history = useHistory();

    const [questionOneButton, setquestionOneButton] = useState(true);
    const [questionTwoButton, setquestionTwoButton] = useState(true);
    const [questionThreeButton, setquestionThreeButton] = useState(true);
    const [questionFourButton, setquestionFourButton] = useState(true);

    const questionOneButtonPressed = () => {
        // console.log("question 1 button pressed", questionOneButton)
        setquestionOneButton(!questionOneButton)
    };
    const questionTwoButtonPressed = () => {
        // console.log("question 1 button pressed", questionTwoButton)
        setquestionTwoButton(!questionTwoButton)
    };
    const questionThreeButtonPressed = () => {
        // console.log("question 1 button pressed", questionThreeButton)
        setquestionThreeButton(!questionThreeButton)
    };
    const questionFourButtonPressed = () => {
        // console.log("question 1 button pressed", questionFourButton)
        setquestionFourButton(!questionFourButton)
    };
    return (
      <div className="mx-auto max-w-lg my-8">
        <h2 className="text-3xl font-bold mb-8 text-center">FAQ's</h2>
  
        <div className="mb-4">
          <button
            onClick={questionOneButtonPressed}
            className="w-full text-left bg-gray-200 hover:bg-gray-300 p-3 rounded"
          >
            How do I submit documents?
          </button>
          <div className="ml-4">
            {questionOneButton ? (
              <></>
            ) : (
              <p>
                To submit documents, go to the "New Item" page and follow the
                instructions to upload your documents.
              </p>
            )}
          </div>
        </div>
  
        <div className="mb-4">
          <button
            onClick={questionTwoButtonPressed}
            className="w-full text-left bg-gray-200 hover:bg-gray-300 p-3 rounded"
          >
            What types of documents are accepted?
          </button>
          <div className="ml-4">
            {questionTwoButton ? (
              <></>
            ) : (
              <p>
                We accept a variety of document types, including PDFs, Word
                documents, and image files. Please make sure your documents meet
                our formatting requirements.
              </p>
            )}
          </div>
        </div>
  
        <div className="mb-4">
          <button
            onClick={questionThreeButtonPressed}
            className="w-full text-left bg-gray-200 hover:bg-gray-300 p-3 rounded"
          >
            When can I expect results?
          </button>
          <div className="ml-4">
            {questionThreeButton ? (
              <></>
            ) : (
              <p>
                Results processing typically takes 2-3 business days. You will
                be notified once your documents have been reviewed and processed.
              </p>
            )}
          </div>
        </div>
  
        <div className="mb-4">
          <button
            onClick={questionFourButtonPressed}
            className="w-full text-left bg-gray-200 hover:bg-gray-300 p-3 rounded"
          >
            Can I edit my submitted documents?
          </button>
          <div className="ml-4">
            {questionFourButton ? (
              <></>
            ) : (
              <p>
                Unfortunately, once documents are submitted, they cannot be
                edited. Please make sure your documents are accurate before
                uploading.
              </p>
            )}
          </div>
        </div>
  
        <button
          onClick={() => history.push('/newitem')}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Back
        </button>
      </div>
    );
  };
  
  export default FAQs;