const db = require('../db/database');
const { claim, inspector, company } = db;
const { Op } = require("sequelize");
db.sequelize.sync();
// import my module
const {chckAccess} = require('../nt_modules');
const { sequelize } = require('../db/database');

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
      time_dry: req.body.time_dry,
      sts: req.body.sts
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

module.exports.getDataTable = async (req, res) => {
  // initial
  const limit = 15;
  const countAlldata = await claim.count({});

  const offset = (req.params.page - 1)*limit;
  console.log(req.params.search);
  const datatable = await claim.findAll({
    offset: offset,
    limit: limit,
    order: [
      /* sequelize.fn('max', sequelize.col('id')) */
      ['date', 'DESC'],
      ['time', 'DESC']
    ],
    where : {
      sts: 1,
      /* date: {[Op.substring]: req.params.date}, */
      [Op.or]: [
        {svh_code : {[Op.substring]: req.params.search}},
        {company: {[Op.substring]: req.params.search}},
        {inspector: {[Op.substring]: req.params.search}},
        {employee: {[Op.substring]: req.params.search}},
        {date: {[Op.substring]: req.params.search}}
      ]
    }
  });
  const num_canfind_data = await claim.count({
    where : {
      sts: 1,
      [Op.or]: [
        {svh_code : {[Op.substring]: req.params.search}},
        {date: {[Op.substring]: req.params.search}},
        {company: {[Op.substring]: req.params.search}},
        {inspector: {[Op.substring]: req.params.search}},
        {employee: {[Op.substring]: req.params.search}},
      ]
    }
  });
  const lastpage = Math.ceil(num_canfind_data/limit);
  console.log(num_canfind_data);
  console.log("Get data table success!!");
  return res.json({message: "Get data table success!!", status: true, body: datatable, lastpage:lastpage, page: req.params.page});
};

module.exports.deleteClaim = async (req, res) => {
  await claim.update({ sts:0 }, {
    where: {
      svh_code: req.params.svhcode
    }
  });
  console.log('Delete Success' + req.params.svhcode);
  return res.json({ message: 'Delete data successful', status: true});
};

module.exports.readClaimBySVHcode = async (req, res) => {
  try{
    const data = await claim.findAll({
      where : {
        svh_code: req.params.svhcode
      }
    });
    console.log("Read claim successful");
    return res.json({message: "Read claim successful", status:true, body:data});
  }catch(err){
    console.log('Error is' + err);
    return res.json({message: 'Error is' + err, status:false});
  }
};