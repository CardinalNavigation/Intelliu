const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");
const userStrategy = require("../strategies/user.strategy");

const router = express.Router();

// ALL USERS:Handles Ajax request for user information if user is authenticated
router.get("/", rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
// ADMIN: to register.
router.post("/register", rejectUnauthenticated, (req, res, next) => {
  // console.log("SUBMITTED REG DATA:", req.body);
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (username, password, first_name, last_name, role, company_name)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`;
  pool
    .query(queryText, [
      username,
      password,
      req.body.first_name,
      req.body.last_name,
      req.body.role,
      req.body.company_name,
    ])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log("User registration failed: ", err);
      res.sendStatus(500);
    });
});

// We generate the invite link using this code
function generateUniqueCode() {
  const characters =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let code;

  code = "";
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }

  return code;
}
// ADMIN: sending an invite. 
router.post("/send-invite", rejectUnauthenticated, (req, res, next) => {
  if (req.user.role !== "intelliu") {
    return res
      .status(403)
      .json({ success: false, message: "You are not authorized" });
  }
  const queryText = `INSERT INTO "invite" (admin_id, email, invite_code)
    VALUES ($1, $2, $3) RETURNING id`;
  pool
    // calling the function to generate a unique invite code to send as invite
    .query(queryText, [req.user.id, req.body.email, generateUniqueCode()])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log("User registration failed: ", err);
      res.sendStatus(500);
    });
});
// USER: endpoint for user to register using the invite code they received
router.post("/accept-invite/:invite_code", (req, res, next) => {
  // validate invite code
  const validateQuery = `SELECT * FROM "invite" WHERE "invite_code"=$1`;
  pool
    .query(validateQuery, [req.params.invite_code])
    .then((payload) => {
      if (payload.rows.length === 0) {
        return res
          .status(400)
          .json({ success: false, message: "The invite code was not found!" });
      }
      const username = req.body.username;
      const password = encryptLib.encryptPassword(req.body.password);
      if (payload.rows[0].email !== req.body.username) {
        return res.status(400).json({
          success: false,
          message: "Please use the email you were invited on.",
        });
      }

      const queryText = `INSERT INTO "user" (username, password, first_name, last_name, role, company_name)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`;
      pool
        .query(queryText, [
          username,
          password,
          req.body.first_name,
          req.body.last_name,
          "client",
          req.body.company_name,
        ])
        .then(() => {
          const deleteInvite = `DELETE FROM "invite" WHERE "invite_code"=$1`;

          pool
            .query(deleteInvite, [req.params.invite_code])
            .then(() => {
              res.sendStatus(201);
            })
            .catch((err) => {
              console.log("User registration failed: ", err);
              res.sendStatus(500);
            });
        })
        .catch((err) => {
          console.log("User registration failed: ", err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.log("User registration failed: ", err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post("/login", userStrategy.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post("/logout", (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
