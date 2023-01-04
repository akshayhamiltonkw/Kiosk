const router = require("express").Router();
const foodManu = require("../controllers/foodManu");
const auth = require("../middleware/authentication");

router.get("/foodManu", auth, foodManu);

module.exports = router;
