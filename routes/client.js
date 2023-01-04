const router = require("express").Router();
const { getClientInformation } = require("../controllers/client");
const auth = require("../middleware/authentication");

router.get("/getClientInformation", auth, getClientInformation);

module.exports = router;
