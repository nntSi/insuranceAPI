const express = require("express");
const router = express.Router();
const db = require('../db/database');
const { employee } = db;
const { Op } = require("sequelize");
db.sequelize.sync();
// import my module
const {chckAccess} = require('../nt_modules');
// import controller

router.get('/employee/getbyid/:id', async (req, res) => {
  
});

module.exports = router;
