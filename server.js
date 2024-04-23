// server.js
const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Serve static files (like HTML) from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));
app.post("/submit", async (req, res) => {
  const { page } = req.body;

  // Create a Nodemailer transporter
  let transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    secure: true,
    port: 465,
    auth: {
      user: "nodemailer.shida@zohomail.com",
      pass: "LnSWVW;t+7U$k?R",
    },
  });

  // Setup email data with unicode symbols
  let mailOptions = {
    from: '"Tattoo Waiver" <nodemailer.shida@zohomail.com>',
    to: "nodemailer.shida@zohomail.com",
    subject: "Tattoo Waiver Form Submitted",
    text: "A new tattoo waiver form has been submitted.",
    html: "<p>A new tattoo waiver form has been submitted.</p>",
    attachments: [
      {
        filename: "page.png",
        content: page.split(";base64,").pop(),
        encoding: "base64",
      },
    ],
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error occurred while sending email:", error);
      res.status(500).send("Error occurred while sending email");
    } else {
      console.log("Email sent:", info.response);
      res.status(200).send("Email sent successfully");
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
