const db = require('../db/database');
const { claim, inspector, company, employee, province, districts } = db;
const { Op, QueryTypes } = require("sequelize");
db.sequelize.sync();
// import my module
const {chckAccess} = require('../nt_modules');
const { sequelize } = require('../db/database');
// code constant
const firstcode = "SVH01";
const startcode = 298;
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
      sts: req.body.sts,
      province: req.body.province,
      district: req.body.district,
      brand_car: req.body.brand_car,
      customer_claim_mobile: req.body.customer_claim_mobile,
      customer_claim_name: req.body.customer_claim_name,
      license_plate: req.body.license_plate
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
};

module.exports.DataClaimPage = async (req, res) => {
  try{
    const inspectorAll = await inspector.findAll();
    const companyAll = await company.findAll();
    const employeeAll = await employee.findAll();
    const provinceAll = await province.findAll();
    const districtsAll = await districts.findAll();
    console.log("Success to get data claim page!!");
    return res.json({ message: "Success to get data claim page!!", inspector: inspectorAll, company: companyAll, status: true, employee: employeeAll, province: provinceAll });
  }catch(err){
    console.log(err);
    return res.json({ message: "Fail at data claim page", status: false });
  }
};

module.exports.getDataTable = async (req, res) => {
  // initial
  const limit = 15;
  const countAlldata = await claim.count({});
  const offset = (req.params.page - 1)*limit;
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
    const [results, metadata] = await sequelize
    .query("SELECT * FROM claim LEFT JOIN province ON claim.province=province.id WHERE svh_code = ?", {
      replacements: [req.params.svhcode],
      type: QueryTypes.SELECT
    });
    const [results2, metadata2] = await sequelize
    .query("SELECT * FROM claim LEFT JOIN districts ON claim.district=districts.id WHERE svh_code = ?", {
      replacements: [req.params.svhcode],
      type: QueryTypes.SELECT
    });
    /* const data = await claim.findAll({
      where : {
        svh_code: req.params.svhcode,
      },
    }); */
    console.log("Read claim successful");
    return res.json({message: "Read claim successful", status:true, body:results, district:results2});
  }catch(err){
    console.log('Error is' + err);
    return res.json({message: 'Error is' + err, status:false});
  }
};

module.exports.showDistrictByPRID = async (req, res) => {
  const data = await districts.findAll({
    where : {
      prv_id: req.params.prvid
    }
  });
  console.log("Show district success");
  return res.json({message: "Show district success", status:true, body:data});
};

module.exports.updateClaimForPDF = async (req, res) => {
  console.log(req.body.brand_car)
  try{
    await claim.update({
      province: req.body.province,
      district: req.body.district,
      brand_car: req.body.brand_car,
      customer_claim_mobile: req.body.customer_claim_mobile,
      customer_claim_name: req.body.customer_claim_name,
      license_plate: req.body.license_plate,
    },
    {
      where : {
        svh_code: req.params.svhcode
      }
    });
    return res.json({ message: "Update claim successful!!", status: true});
  }catch(err){
    console.log("error at update claim" + err);
    return res.json({message:"error at update claim" + err, status: false});
  }
};