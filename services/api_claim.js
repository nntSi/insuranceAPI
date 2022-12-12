const express = require("express");
const router = express.Router();
// import controller
const {
  CreateClaim, 
  DataClaimPage, 
  getDataTable,
  deleteClaim,
  readClaimBySVHcode,
  showDistrictByPRID,
  updateClaimForPDF } = require('../controller/ClaimController');

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

router.get('/claim/getdistrict/:prvid', async (req, res) => {
  showDistrictByPRID(req,res);
});
router.patch('/claim/updateforpdf/:svhcode' , async (req, res) => {
  updateClaimForPDF(req, res);
});
module.exports = router;

