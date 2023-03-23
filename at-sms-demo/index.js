const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");

dotenv.config();

// Authentication
const credentials = {
  apiKey: process.env.API_KEY, // API Key here, sandbox or live
  username: process.env.USERNAME // Username: 'sandbox' for the test environment, App username for live
};

// Require the AT package
const AfricasTalking = require("africastalking")(credentials);

const sms = AfricasTalking.SMS;
// Send SMS route
router.post("/", (req, res) => {
  // const { to, message } = req.body || res.status(400).json({error: "Both 'to' and 'message' are required"});
  sms
    .send({ 
        to: "+254723738861", // Number of recipient - can be multiple
        message: "My message - is here!", // Message to be sent 
        enque: true })
    .then(response => {
      console.log(response);
      res.json(response);
    })
    .catch(error => {
      console.log(error);
      res.json(error.toString());
    });
});

module.exports = router;