const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'svh_db',
  'root',
  'Surveyhubtrue',
  {
  host: 'localhost', // host ของ db ที่เราสร้างเอาไว้
  port: '3306',
  dialect: 'mysql',
  define: {
    timestamps: false //ส่วนตรงนี้ก็เป็นการตั้งค่าเพิ่มเติม
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//import model
db.users = require("./models/users")(sequelize, Sequelize);
db.claim = require("./models/claim")(sequelize, Sequelize);
db.company = require("./models/company")(sequelize, Sequelize);
db.inspector = require("./models/inspector")(sequelize, Sequelize);

module.exports = db;