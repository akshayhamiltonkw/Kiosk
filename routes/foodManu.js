const router = require("express").Router();
const foodManu = require('../controllers/foodManu');

router.get("/foodManu", foodManu);


module.exports = router;