const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");

const router = express.Router();

// This is a POST to the Regulatory Standards SQL Table
// To upload files from Admin for comparison ('Doc A' or 'Standards Doc')
router.post("/standard",rejectUnauthenticated, (req, res) => {
  // parameters:
  //    parameter: list of file contents
  //    type: list
  //    description: standard files upload
});

//This is a GET From Regulatory Standards SQL Table,
//to show uploaded files from the Admin ('Doc A' or 'Standards Doc')
router.get("/standard", rejectUnauthenticated,(req, res) => {
  const queryText = "";
  pool
    .query(queryText, [])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("Retrieving files error: ", err);
      res.sendStatus(500);
    });
  // {
  // "code": response code,
  // "msg": response msg,
  // "data": {
  //     "minio_urls":[
  //     {
  //         "file_id":file id,
  //         "file_name": file_name 1,
  //         "minio_url": minio_url
  //     },
  //     ]
  // }
});

//  This is POST to the USER DOCUMENTS SQL Table
//  This is user uploaded documents
router.post("/requirement", rejectUnauthenticated, (req, res) => {
  // parameters:
  //    parameter: list of file contents
  //    type: list
  //    description: standard files upload
});
router.get("/requirement", rejectUnauthenticated, (req, res) => {
  const queryText = "";
  pool
    .query(queryText, [])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("Retrieving requirement files error: ", err);
      res.sendStatus(500);
    });
  //The Data Object for a "GET" from the Database will look like :
  // {
  // "code": response code,
  // "msg": response msg,
  // "data": {
  //     "minio_urls":[
  //     {
  //         "file_id":file id,
  //         "file_name": file_name 1,
  //         "minio_url": minio_url
  //     },
  //     ]
  // }
});


// This is a POST to send Files to the API for Comparison/Analysis (Between Doc A And Doc B)
router.post("/compare_file", rejectUnauthenticated, (req, res) => {
//   parameters: two parameters
//   parameter: source_file_id obtained from interface 3 or 4 above
//   type: str   
//   description: document A of which content need to be compared 
//   parameter_name: search_file_id obtained from interface 4 above    
//   type: str   
// description: document B of which content need to looped through and be compared with doc A
});
router.get("/compare_file", rejectUnauthenticated, (req, res) => {
  const queryText = "";
  pool
    .query(queryText, [])
    .then((result) => {-
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("File comparison retrieval error: ", err);
      res.sendStatus(500);
    });

  // Comparison Status Data Object Looks Like :
  // return result: 
  // {"code": response code,
  //  "msg": response msg,
  //  "data": {"compare_id":compare_id }
  // }
});

// This is a POST for file Comparison
// It checks if the analysis of submitted item is complete or not
router.post("/compare_status",rejectUnauthenticated, (req, res) => {
  // parameters: 1 parameter
  // parameter: compare_id obtained from interface 5 above         
  //   type: str   
  // description: compare id used to query status for a particular comparison job
});
router.get("/compare_status",rejectUnauthenticated, (req, res) => {
  const queryText = "";
  pool
    .query(queryText, [])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("Comparison status data retrieval error: ", err);
      res.sendStatus(500);
    });
  // Comparison Status Data Object Looks Like :
  // result:
  // {"code": response code,
  //  "msg": response msg,
  //  "data": {"compare_id":compare_id,
  //           "status": done or not done
  //          }
  // }
});

module.exports = router;
