const express = require("express");
const { sequelize } = require("../db/database");
const router = express.Router();
// import controller
const {getProvinceByID, getdistrictsByID} = require('../controller/LocationController')

// router
router.get('/location/province/:id', async (req, res) => {
  getProvinceByID(req, res);
});

router.get('/location/district/:id', async (req, res) => {
  getdistrictsByID(req, res);
});

module.exports = router;