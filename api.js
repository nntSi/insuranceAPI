const express = require("express");
const router = express.Router();

router.use(require("./model/api_users"));
/* router.use(require("./model/api_login")) */

module.exports = router;