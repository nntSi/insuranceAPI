const db = require('../db/database');
const { claim, inspector, company, employee, province, districts } = db;
const { Op } = require("sequelize");
db.sequelize.sync();
// import my module
const {chckAccess} = require('../nt_modules');

module.exports.getProvinceByID = async (req, res) => {
  const provinces = await province.findAll({
    where: {
      id: req.params.id
    }
  });
  return res.json({message: "Get province success", body:provinces});
}

module.exports.getdistrictsByID = async (req, res) => {
  const district = await districts.findAll({
    where: {
      id: req.params.id
    }
  });
  return res.json({message: "Get district success", body:district});
}