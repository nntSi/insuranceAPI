const express = require("express");
const router = express.Router();
// import controller
const {CreateClaim, DataClaimPage} = require('../controller/ClaimController');

router.get('/claim/page', async (req, res) => {
  DataClaimPage(req, res);
})

router.post('/claim/create', async (req, res) => {
  CreateClaim(req, res);
});


module.exports = router;

