import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./NewItem.css";
import { useDispatch, useSelector } from "react-redux";

function NewItem() {
  const history = useHistory();
  const regulatoryStandards = useSelector((store) => store.standards);
  const dispatch = useDispatch();
  const [standardId, setStandardId] = useState("No document selected");
  // const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [doc, setDoc] = useState(null);

  useEffect(() => {
    dispatch({
      type: "FETCH_STANDARDS",
    });
    // setStandardId("No document selected")
  }, []);

  // const regulatoryStandards = ["ABC","XYZ","123","456"];

  const uploadDocument = (event) => {
    event.preventDefault();
    if (standardId === "No document selected"){
      alert("please try selecting the Regulatory Standard again");
      return
    } else if (doc === null){
      alert("please select a document to upload");
      return
    }

    const stdIdNumber = Number(standardId);
    const documents = {
      doc,
      standardId: stdIdNumber,
    };
    // console.log("DOCS", documents);

    dispatch({ type: "UPLOAD_USER_DOCS", payload: documents });

    history.push("/newitemconfirmation");
  };

  return (
    <div className="flex flex-row justify-center pt-36">
      <div>
        <button
          type="button"
          onClick={() => history.push("/faq")}
          className="
          absolute left-20
          text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
          hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300
          dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Questions?
        </button>
      </div>
      <div className="bg-slate-200 px-32 pt-10 pb-28">
        <h2 className="text-4xl p-5">Choose Documents</h2>

        <form onSubmit={uploadDocument}>
          <div className="relative mt-4">
            <label htmlFor="country" className="pr-2">
              Regulatory Standard{" "}
            </label>
            <select
              id="country"
              defaultValue={standardId}
              onChange={(e) => setStandardId(e.target.value)}
              required
            >
              {/* using 'selected' throws an error in console, but is the only easy way to make sure that the first option is not selected */}
              <option selected>
                Choose a standard
              </option>
              {regulatoryStandards?.map((standard, idx) => {
                return (
                  <option key={"REGSTD" + idx} value={standard.id}>
                    {standard.device_name}
                  </option>
                );
              })}
            </select>
          </div>

          <p className="text-3xl p-4 pt-[70px]">Design Document to Compare</p>
          <input
            type="file"
            id="DocB"
            onChange={(e) => setDoc(e.target.files[0])}
          ></input>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Review
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewItem;
