const router = require("express").Router();
const auth = require("../middleware/authentication");
const getTableGroups = require("../controllers/getTableGroups");

router.get("/getTableGroups",auth, getTableGroups);



module.exports = router; 