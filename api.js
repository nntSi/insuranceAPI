const express = require("express");
const router = express.Router();

router.use(require("./services/api_users"));
router.use(require("./services/api_login"));
router.use(require("./services/api_claim"));
router.use(require("./services/api_inspector"));
module.exports = router;