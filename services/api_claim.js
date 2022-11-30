const express = require("express");
const router = express.Router();
// import controller
const {create_claim} = require('../controller/ClaimController');


router.post('/claim/create', async (req, res) => {
  create_claim(req, res);
});

module.exports = router;

