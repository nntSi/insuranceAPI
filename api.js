const express = require("express");
const router = express.Router();

router.use(require("./services/api_users"));
router.use(require("./services/api_login"));
router.use(require("./services/api_claim"));
router.use(require("./services/api_location"));
router.use(require("./services/api_inspector"));
router.use(require("./services/api_report"));
module.exports = router;