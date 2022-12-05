const db = require('../db/database');
const { claim, inspector, company } = db;
const { Op } = require("sequelize");
db.sequelize.sync();
// import my module
const {chckAccess} = require('../nt_modules');

// code constant
const firstcode = "SVH0"
const startcode = 1667

module.exports.CreateClaim = async (req, res) => {
  // chcek access
  chck = await chckAccess(req, res);
  if(chck == false){
    console.log("You can't access this method");
    return res.json({message: "Create claim unccess!!", status: false});
  }
  // create code
  number = await claim.count({});
  code = firstcode + (number + startcode);

  /* res.json({codeSVH: code}); */
  try{
    const insertdata = await claim.create({
      svh_code: code,
      employee: req.body.employee,
      inspector: req.body.inspector,
      company: req.body.company,
      type: req.body.type,
      source_employee: req.body.source_employee,
      location: req.body.location,
      accident: req.body.accident,
      date: req.body.date,
      time: req.body.time,
      inspector_mobile: req.body.inspector_mobile,
      date_dry: req.body.date_dry,
      time_dry: req.body.time_dry
    });
    const getClaimByCode = await claim.findAll({
      where: {
        svh_code : {
          [Op.eq] : code
        }
      }
    });
    console.log("Create claim successful!!");
    return res.json({message: "Create claim successful!!", status: true, body:getClaimByCode});
  }catch(err){
    console.log("Create claim error" + err)
    return res.json({message: "create claim error", error: err, status: false})
  }
}

module.exports.DataClaimPage = async (req, res) => {
  try{
    const inspectorAll = await inspector.findAll();
    const companyAll = await company.findAll(); 
    console.log("Success to get data claim page!!");
    return res.json({ message: "Success to get data claim page!!", inspector: inspectorAll, company: companyAll, status:true })
  }catch(err){
    console.log(err);
    return res.json({ message: "Fail at data claim page", status: false })
  }
}