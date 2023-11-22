import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AdminStandards() {
  const dispatch = useDispatch();
  const standards = useSelector((store) => store.standards);

  const [doc, setDoc] = useState(null);
  // const [name, setName] = useState(""); // to use in the future possibly

  useEffect(() => {
    dispatch({ type: "FETCH_STANDARDS" });
  }, []);
  // useEffect(() => {
  // }, [standards]);

  const handleAddDocument = (event) => {
    // event.preventDefault();
    dispatch({ type: "UPLOAD_ADMIN_DOCUMENT", payload: doc });
  };

  return (
    <div className="container mx-auto max-w-lg my-8">
      <h2 className="text-3xl font-bold mb-4">Add Regulatory Standard:</h2>
      <form onSubmit={handleAddDocument} className="mb-4">
        <div className="py-5">
        <input
            type="file"
            id="DocAadmin"
            onChange={(e) => setDoc(e.target.files[0])}
          ></input>
        </div>
        {/* This section could be useful for IntelliU to customize the name of the standard after upload 
          <div className="my-4">
            <label htmlFor="name">Form Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={setName}
              required
              className="border ml-2"
            />
          </div>
          <div className="my-4">
            <label htmlFor="name">Standard:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={setName}
              required
              className="border ml-2"
            />
          </div> */}
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Submit Upload
          </button>
        </div>
      </form>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Form Name</th>
            {/* <th className="border p-2">Standard</th> */}
            <th className="border p-2">Upload Date</th>
            <th className="border p-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {/* THIS IS NOT COMPLETE YET.. TODO: get real time, submit real time, test submissions */}
          {standards.map((standard, idx) => {
            // console.log("std", standard);
            return (
              <tr key={idx}>
                <td className="border p-2">{standard.device_name}</td>
                <td className="border p-2">11/6/23</td>
                <td className="border p-2">
                  <button
                    id={standard.id}
                    className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700"
                    onClick={() => dispatch({ type: "DELETE_STANDARD", payload: standard.id   })}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

