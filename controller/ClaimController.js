const db = require('../db/database');
const { claim } = db;
const { Op } = require("sequelize");
db.sequelize.sync();
// import my module
const {chckAccess} = require('../nt_modules');

// code constant
const firstcode = "SVH"
const startcode = 1667

module.exports.create_claim = async (req, res) => {
  // chcek access
  chck = await chckAccess(req, res);

  // create code
  number = await claim.count({});
  code = firstcode + (number + startcode);

  /* res.json({codeSVH: code}); */
  const insertdata = await claim.create({
    svh_code: code,
    employee: req.body.employee,
    inspector: req.body.inspector,
    source: req.body.source,
    type: req.body.type,
    source_employee: req.body.source_employee,
    location: req.body.location,
    accident: req.body.accident,
    date: req.body.date,
    time: req.body.time,
    inspector_mobile: req.body.inspector_mobile
  });
  console.log("Create claim successful!!");
  return res.json({message: "Create claim successful!!", status: true});
} 