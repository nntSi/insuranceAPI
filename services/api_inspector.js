const express = require("express");
const router = express.Router();
const db = require('../db/database');
const { claim, inspector, company } = db;
const { Op } = require("sequelize");
db.sequelize.sync();
// import my module
const {chckAccess} = require('../nt_modules');
// import controller

router.get('/inspector/getbyid/:id', async (req, res) => {
  /* const inspector_pick = await inspector.findAll({
    where: {
      id : {
        [Op.eq] : req.params.id
      }
    }
  });
  console.log("get inspecter success!!");
  return res.json({message:"get inspecter success!!", status:true, inspector: inspector_pick}); */
  try{
    const inspector_pick = await inspector.findAll({
      where: {
        id : {
          [Op.eq] : req.params.id
        }
      }
    });
    console.log("get inspecter success!!");
    return res.json({message:"get inspecter success!!", status:true, inspector: inspector_pick});
  }catch(err){
    console.log("get inspecter unsuccess");
    return res.json({message:"get inspecter unsuccess", status:false, err: err});
  }
});


module.exports = router;

