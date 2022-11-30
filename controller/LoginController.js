// connect to db
const db = require('../db/database');
const { users } = db;
const { Op } = require("sequelize");
db.sequelize.sync();

module.exports.login = async (req, res) => {
  number_user =  await users.count({
    where: {
      [Op.and] : [
        { username: req.body.username },
        { password: req.body.password }
      ]
    }
  });
  if (number_user < 1){
    console.log("Username or password was wrong!!");
    return res.json({ message: "Username or password was wrong!!", state: false });
  };
  userdata = await users.findAll({
    where: {
      [Op.and] : [
        {username: req.body.username},
        {password: req.body.password},
      ]
    }
  });
  console.log("Login successful!!");
  return res.json({ message: "Login successful!!", state: true, userdata: userdata });
}


