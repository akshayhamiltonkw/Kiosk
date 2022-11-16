const router = require("express").Router();
const auth = require("../middleware/authentication");
const createUniqID = require("../controllers/createUniqID");

router.post("/createUniqID", createUniqID);


module.exports = router;