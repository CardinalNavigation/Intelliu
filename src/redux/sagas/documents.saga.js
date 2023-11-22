import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// Documents Saga: will be fired on "FETCH_DOCUMENTS" actions
// function* fetchDocuments(action) {
//   try {
//     const config = {
//       headers: { "Content-Type": "application/json" },
//       withCredentials: true,
//     };
//     const response = yield axios.get(
//       "/api/document/get-my-documents/" + action.payload,
//       config
//     );
//     // console.log("will this CONSOLE LOG");

//     yield put({ type: "SET_RESULTS", payload: response.data });
//     // console.log("setting REDUCER");
//   } catch (error) {
//     console.log("User get request failed", error);
//   }
// }

// function* fetchDocumentNames() {
//   try {
//     const config = {
//       headers: { "Content-Type": "application/json" },
//       withCredentials: true,
//     };

//     const response = yield axios.get("/api/document/names", config);

//     yield put({ type: "SET_DOCUMENT_NAMES", payload: response.data });
//     yield put({ type: "UNSET_RESULTS" });
//   } catch (error) {
//     console.log("User get request failed", error);
//   }
// }

// function* deleteDocument(action) {
//   console.log("Smoke", action.payload)
//   try {
//     const config = {
//       headers: { "Content-Type": "application/json" },
//       withCredentials: true,
//     };
//     console.log(action.payload, 'DOCUMENT.PAYLOAD');

//     const response = yield axios.delete(
//       "/api/document/" + action.payload,
//       config
//     );
//     console.log("TEST11!!!")
//     yield put({ type: "FETCH_USER_DOCS" });
//   } catch (error) {
//     console.log("User get request failed", error);
//   }
// }

function* deleteUserDocument(action) {
  // console.log("action payload ID", action.payload.id)
  try {
    const deleteUserDocument = yield axios.delete(`/api/document/${action.payload.id}`);
    console.log(deleteUserDocument)
    yield put({ type: 'GET_FAVORITES'});
  } catch (error) {
    console.log("error DELETING images", error);
  }
}

function* uploadUserDocuments(action) {
  const doc = action.payload.doc;
  const standardId = action.payload.standardId;
  try {
    const data = new FormData();
    data.append("file", doc);
    data.append("upload_preset", "intelliU");

    const res = yield axios.post(
      // Line 82 shows the cloudinary 'cloudname': this should be change by you! From your cloudinary 
      // account 'dae8japsd'
      `https://api.cloudinary.com/v1_1/dae8japsd/upload`,
      data
    );
    const document_link = res.data.secure_url;
    const docSubmission = {
      document_name: doc.name,
      time_stamp: doc.lastModified,
      document_link,
      JSON: null,
    };
    // console.log("doc Submission", docSubmission);
    yield axios.post("/api/document/lowspec", docSubmission);
    const recentDoc = yield axios.get("/api/document/lowspec/readyForSubmission");

    // yield console.log("RECENT DOC DATA:", recentDoc.data);
    yield put({
      type: "FETCH_DOCS_TO_SUBMIT",
      payload: { docA: standardId, docB: recentDoc.data[0].id },
    });

    // console.log("THEY FAILED");
  } catch (error) {
    console.log("Error uploading Document", doc.name, "error:", error);
  }
}

function* refreshDatabase(action) {
  try {
      const result=yield axios.post('/api/document/lowspec', action.payload);
      console.log('Data Refreshed With:', result)
      yield put({ type: "SET_USER_DOCS", payload: result.data });
      // yield put({ type: "SET_SELECTED", payload: result.data[0] })
  } catch (error) {
      console.log('error posting favorite', error);
  }    
}

function* fetchDocsToSubmit(action) {
  // action.payload = {docA: 4, docB: 17, }
  // console.log("FETCHING DOCS", action.payload);
  try {
    // /example?param1=value1&param2=value2
    const response = yield axios.get(
      `/api/document/docsToSubmit?docA=${action.payload.docA}&docB=${action.payload.docB}`
    );
    // console.log("bundled and ready:", response.data.result1);

    const name1 = response.data.result1.device_name;
    const name2 = response.data.result2.document_name;
    // console.log("name1 and two:", name1, name2);
    // SET THEM IN A REDUCER TO DISPLAY ON REVIEW PAGE
    yield put({
      type: "SUBMITTED_DOCS",
      payload: {
        docA: name1,
        docB: name2,
      },
    });
  } catch (error) {
    console.log("Error fetching docs to submit:");
  }
}
function* uploadAdminDocument(action) {
  const doc = action.payload;
  try {
    const data = new FormData();
    data.append("file", doc);
    data.append("upload_preset", "intelliU");

    const res = yield axios.post(
      // Line 154 shows the cloudinary 'cloudname': this should be change by you! From your cloudinary 
      // account 'dae8japsd'
      `https://api.cloudinary.com/v1_1/dae8japsd/upload`,
      data
    );
    const document_link = res.data.secure_url;
    const docSubmission = {
      document_name: doc.name,
      time_stamp: doc.lastModified,
      document_link,
    };
    // console.log("doc Submission", docSubmission);
    // yield axios.post("/api/document/lowspec", docSubmission);
    yield axios.post("/api/document/highspec", docSubmission);
    put({ type: "FETCH_STANDARDS" });
  } catch (error) {
    console.log("Error uploading Document", doc.name, "error:", error);
  }
}
function* getAllUserDocs() {
  try {
    const result = yield axios.get("/api/document/lowspec");
    // console.log("RESULT FROM SAGAS USER_DOCUMENTS GET ALL:", result);
    yield put({ type: "SET_USER_DOCS", payload: result.data });
    yield put({ type: "SET_SELECTED", payload: result.data[0] });
  } catch (error) {
    console.log("Get All User Docs error:", error);
  }
}
function* fetchStandards() {
  try {
    const result = yield axios.get("/api/document/highspec");
    // console.log("RESULT FROM GET STANDARDS:", result.data);
    yield put({ type: "SET_STANDARDS", payload: result.data });
  } catch (error) {
    console.log("error fetching standards:", error);
  }
}
function* deleteStandard(action) {
  try {
    yield axios.delete("/api/document/standard/" + action.payload);

    yield put({ type: "FETCH_STANDARDS" });
  } catch (error) {
    console.log("User get request failed", error);
  }
}

//TODO STRETCH: Actually send documents to IntelliU
function* docsToIntelliU() {
  try {
    // console.log("DOCUMENTS HAVE BEEN SENT.... dummy place holder...");
  } catch (error) {
    console.log("error submitting docs to intelliU", error);
  }
}
function* documentsSaga() {
  // yield takeLatest("FETCH_DOCUMENTS", fetchDocuments);
  // yield takeLatest("FETCH_DOCUMENT_NAMES", fetchDocumentNames);
  yield takeLatest("DELETE_DOCUMENT", deleteUserDocument);
  yield takeLatest("UPLOAD_USER_DOCS", uploadUserDocuments);
  yield takeLatest("DOCS_TO_INTELLIU", docsToIntelliU);
  yield takeLatest("FETCH_STANDARDS", fetchStandards);
  yield takeLatest("UPLOAD_ADMIN_DOCUMENT", uploadAdminDocument);
  yield takeLatest("FETCH_DOCS_TO_SUBMIT", fetchDocsToSubmit);
  // yield takeLatest("UPDATE_JSON",updateJSON);
  yield takeLatest("FETCH_USER_DOCS", getAllUserDocs);
  yield takeLatest("DELETE_STANDARD", deleteStandard); 
  yield takeLatest("REFRESH_USER_DOCS",refreshDatabase);
}

export default documentsSaga;
