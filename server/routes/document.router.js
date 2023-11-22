const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");

const dummyResult1 = require("../modules/DummyData/dummydata1");
const dummyResult2 = require("../modules/DummyData/dummydata2");
const dummyResult3 = require("../modules/DummyData/dummydata3");

const dummyJson = {
  high_level_spec_name: "60601-1.doc",
  low_level_spec_name: "software_requirements.doc",
  compare_results: [],
};

let documentNames = ["60601-1.doc", "60601-2.doc", "60601-3.doc"];

const router = express.Router();
// ADMIN: Endpoint to allow only admin to upload a high spec document
router.post("/highspec", rejectUnauthenticated, (req, res, next) => {
  if (req.user.role !== "intelliu") {
    return res
      .status(403)
      .json({ success: false, message: "You are not authorized" });
  }
  // console.log("RECK DOT BODY", req.body);
  const queryText = `INSERT INTO "regulatory_standard" (device_name, admin_id, document_link)
    VALUES ($1, $2, $3) RETURNING id`;
  // TODO: Do we need to send the high spec document to intelliu API?
  pool
    .query(queryText, [
      req.body.document_name,
      req.user.id,
      req.body.document_link,
    ])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log("hispec post Failed: ", err);
      res.sendStatus(500);
    });
});

// ADMIN: Get all high_spec_documents.
router.get("/highspec", rejectUnauthenticated, (req, res) => {
  const query = `SELECT * 
    FROM "regulatory_standard"`;
  pool
    .query(query)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get all results failed", err);
      res.sendStatus(500);
    });
});

// USER: Upload low_spec_document to be sent for analysis.
router.post("/lowspec", rejectUnauthenticated, (req, res, next) => {
  // console.log("IN LOWSPEC");
  // console.log("Req.Body Is:", req.body)
  const queryText = `INSERT INTO "user_document" (document_name, user_id, document_link, time_stamp, "JSON")
      VALUES ($1, $2, $3, $4, $5) RETURNING id`;
  // TODO: Check intelliu API documentation, how to submit low spec for analysis?
  pool
    .query(queryText, [
      req.body.document_name,
      req.user.id,
      req.body.document_link,
      req.body.time_stamp,
      req.body.JSON,
    ])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log("Document Info Upload failed: ", err);
      res.sendStatus(500);
    });
});

//get all docs for current user
router.get("/lowspec", (req, res) => {
  pool
    .query(
      'SELECT * FROM "user_document" WHERE user_id = $1 AND "JSON" IS NOT NULL ORDER BY id DESC;',
      [req.user.id]
    )
    .then((result) => {
      // console.log("RESULT GET ALL", result);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error GET /user_document", error);
      res.sendStatus(500);
    });
});

router.get("/docsToSubmit", async (req, res) => {
  // console.log("IN DOCS TO SUBMIT");
  const docAInt = req.query.docA;
  const docBInt = req.query.docB;
  // console.log("doc A and B:", disA,disB);
  async function fetchData() {
    const client = await pool.connect();

    try {
      // Start a transaction
      await client.query("BEGIN");

      // Execute the first query
      const result1 = await client.query(
        `SELECT * FROM "regulatory_standard" WHERE "id" = $1 ;`,
        [docAInt]
      );

      // console.log("DOC INT B:", docBInt)
      // Execute the second query
      const result2 = await client.query(
        `SELECT * FROM "user_document" WHERE "id" = $1`,
        [docBInt]
      );

      // Commit the transaction
      await client.query("COMMIT");

      // console.log("RESULTSSSSS:", result1.rows[0],"result 2", result2.rows[0]);
      // Return the results
      return { result1: result1.rows[0], result2: result2.rows[0] };
    } catch (e) {
      // If an error occurs, roll back the transaction
      await client.query("ROLLBACK");
      console.error(`Error: ${e.message}`);
      throw e;
    } finally {
      // Release the client back to the pool
      client.release();
    }
  }
  try {
    // Run the function and return the result
    const data = await fetchData();
    // console.log("data RESULT", data);
    res.send(data); // back to front end? or off to IntelliU
  } catch (err) {
    console.error(err);
  }
});

//get all docs for current user
router.get("/lowspec/recent", (req, res) => {
  pool
    .query(
      'SELECT * FROM "user_document" WHERE user_id = $1 AND "JSON" IS NOT NULL ORDER BY id DESC;',
      [req.user.id]
    )
    .then((result) => {
      // console.log("RESULT GET RECENT", result);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error GET /user_document", error);
      res.sendStatus(500);
    });
});

//get all docs for current user
router.get("/lowspec/readyForSubmission", (req, res) => {
  pool
    .query(
      'SELECT * FROM "user_document" WHERE user_id = $1 ORDER BY id DESC LIMIT 1;',
      [req.user.id]
    )
    .then((result) => {
      // console.log("RESULT GET RECENT", result);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error GET /user_document", error);
      res.sendStatus(500);
    });
});



router.get("/docsToSubmit", (req, res) => {
  const docA = req.body.docA;
  const docB = req.body.docB;
  pool
    .query('SELECT * FROM "regulatory_standard" WHERE id = $1;', [docA])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error GET /user_document", error);
      res.sendStatus(500);
    });
});

// USER: Get one document results (CURRENTLY DUMMY DATA)
router.get("/get-my-documents/:id", rejectUnauthenticated, (req, res) => {
  //TODO: make API call to IntelliU API to get a users results.
  let docId = req.params.id;
  // let docName = "dummyResult"
  // docName += docId
  // res.send(docName)

  switch (docId) {
    case "60601-1.doc":
      res.send(dummyResult1);
      break;
    case "60601-2.doc":
      res.send(dummyResult2);
      break;
    case "60601-3.doc":
      res.send(dummyResult3);
      break;
    default:
      res.sendStatus(409);
  }
});

// USER: Get my document names
router.get("/names", rejectUnauthenticated, (req, res) => {
  //TODO: make API call to IntelliU API to get a users results.
  return res.send(documentNames);
});

router.delete("/:id", rejectUnauthenticated, (req, res) => {
  // console.log("Deleteing This Item", req.body)
  // TODO: Implement actual delete by deleting from the db, once we have access to the API
  let idToDelete = req.params.id;
  // console.log("idToDelete", idToDelete);
  let sqlText = `
        DELETE FROM user_document WHERE "id" = $1;
        `;
  pool
    .query(sqlText, [idToDelete])
    .then((result) => {
      // console.log("Deleted from database ", idToDelete);
      res.sendStatus(202);
    })
    .catch((error) => {
      console.log(`Error making database query ${sqlText}`, error);
      res.sendStatus(500);
    });
});
router.delete("/standard/:resultId", rejectUnauthenticated, (req, res) => {
  const indexToDelete = req.params.resultId
  if (req.user.role !== "intelliu") {
    return res
      .status(403)
      .json({ success: false, message: "You are not authorized" });
  }
  // console.log("RECK DOT BODY", indexToDelete);
  const queryText = `DELETE FROM "regulatory_standard" WHERE "id" = $1 ;`;
  pool
    .query(queryText, [indexToDelete])
    .then(() => res.sendStatus(204))
    .catch((err) => {
      console.log("failed to delete highsepc: ", err);
      res.sendStatus(500);
    });
});


// The PUT needs to be updated at the Query line to replace $1 with the SQL Entry, if it will
// Be used to update the JSON Data on the database.
router.put("/JSON", rejectUnauthenticated, (req, res) => {
  const query = `UPDATE "user_document"
    SET "JSON" = $1 ::json
    WHERE user_id = $2
    AND user_document.id=$3;
`;
  pool
    .query(query, [dummyResult2, req.user.id, 14])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log("ERROR: Update JSON data failed", err);
      res.sendStatus(500);
    });
});

router.get("/JSON", (req, res) => {
  pool
    .query(
      'SELECT "JSON" FROM "user_document" WHERE user_id = $1 ORDER BY id DESC;',
      [req.user.id]
    )
    .then((result) => {
      // console.log("RESULT GET ALL", result);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error GET /user_document", error);
      res.sendStatus(500);
    });
});

module.exports = router;
