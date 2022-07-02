const router = require("express").Router();
const { dashboardGetController } = require("../controllers/dashboard.controller");

router.get("/", dashboardGetController);

module.exports = router;
