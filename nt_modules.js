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
    console.log("You can't access this method");
    return res.json({ message: "You can't access this method", status: false })
  }
  return true;
};

module.exports.createCode = async (firstcode, start, users ,req, res) => {
  numdata = await users.count({})
  console.log(numdata);
  
}
