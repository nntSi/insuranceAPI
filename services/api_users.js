const express = require("express");
const router = express.Router();
const db = require('../db/database');
const {users} = db;
db.sequelize.sync();

module.exports = router;