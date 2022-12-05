const db = require('./db/database');
const { users } = db;
const { Op } = require("sequelize");

module.exports.chckAccess = async (req, res) => {
  chck = await users.count({
    where: {
      [Op.and] : [
        { username: req.body.username },
        { token: req.body.token }
      ]
    }
  })
  if (chck < 1){
    return false;
  }
  return true;
};

module.exports.createCode = async (firstcode, start, users ,req, res) => {
  numdata = await users.count({})
  console.log(numdata);
  
}
