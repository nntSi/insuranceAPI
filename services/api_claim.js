const express = require("express");
const router = express.Router();
// import controller
const {
  CreateClaim, 
  DataClaimPage, 
  getDataTable, 
  searchDataTable, 
  deleteClaim,
  readClaimBySVHcode } = require('../controller/ClaimController');

router.get('/claim/page', async (req, res) => {
  DataClaimPage(req, res);
});

router.post('/claim/create', async (req, res) => {
  CreateClaim(req, res);
});

router.get('/claim/gettable/:page/:search', async (req, res) => {
  getDataTable(req, res);
});

router.get('/claim/page/delete/:svhcode', async (req, res) => {
  deleteClaim(req, res);
});

router.get('/claim/readdata/:svhcode', async (req, res) => {
  readClaimBySVHcode(req, res);
});

module.exports = router;

