const express = require("express");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const router = express.Router();
const fs = require("fs");


router.post("/", (req, res) => {
  const { to, from, subject, text, html } = req.body;
  // console.log("Req.Body Is", req.body);

  if (!to || !from || !subject || (!text && !html)) {
    return res.status(400).send("Invalid request data");
  }

  const msg = {
    to,
    from,
    subject,
    text,
    attachments: [
      {
        content: fs.readFileSync("server/modules/Interview-Resources.xlsx").toString("base64"),
        filename: "attachment.xlsx",
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        disposition: "attachment",
      },
    ],
  };

  sgMail
    .send(msg)
    .then(() => {
      res.status(200).send("Email sent successfully");
    })
    .catch((error) => {
      console.error("Error sending email:", error);
      res.status(500).send("Error sending email");
    });
});

module.exports = router;
