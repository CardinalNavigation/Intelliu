import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function DeleteConfirmation({ documentName, close }) {
  const history = useHistory();
  const dispatch = useDispatch();

  // console.log("DOCUMENT TO BE DELETED NAME", documentName);

  const handleDelete = () => {
    dispatch({
      type: "DELETE_DOCUMENT",
      payload: documentName,
    });

    dispatch({
      type: "FETCH_DOCUMENT_NAMES",
    });
    close();
  };

  return (
    <div className="bg-black/50 backdrop-blur-sm z-50 fixed h-screen w-screen flex justify-center items-center inset-0">
      <div className="bg-white w-[600px] h-[400px] rounded-lg p-8 flex flex-col gap-4">
        <p>
          Are you sure you want to delete Result which was completed on (date)?
        </p>
        <p>This is Irreversible.</p>
        <button
          onClick={() => handleDelete()}
          className="rounded-full bg-sky-500/50 p-2"
        >
          Permanently Delete
        </button>
        <button
          onClick={() => close()}
          className="rounded-full bg-sky-500/50 p-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteConfirmation;
