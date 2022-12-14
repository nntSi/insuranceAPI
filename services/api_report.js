const express = require("express");
const router = express.Router();
const { claimWord } = require("../report_services/claimre");

router.get('/claim/:svhcode/claim.docx', async (req, res) => {
  claimWord(req, res);
});

module.exports = router;