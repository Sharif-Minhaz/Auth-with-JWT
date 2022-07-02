const router = require("express").Router();
const { homeGetController } = require("../controllers/home.controller");

router.get("/", homeGetController);

module.exports = router;
