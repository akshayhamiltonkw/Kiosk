const router = require("express").Router();
const auth = require("../middleware/authentication");
const getRestaurantStatistic = require("../controllers/getRestaurantStatistic");

router.get("/getRestaurantStatistic",getRestaurantStatistic);



module.exports = router; 