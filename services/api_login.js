const express = require("express");
const { sequelize } = require("../db/database");
const router = express.Router();
// import controller
const {login} = require('../controller/LoginController')

// router
router.post('/login', async (req, res) => {
  login(req, res);
});

module.exports = router;