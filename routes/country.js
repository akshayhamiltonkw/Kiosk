const router = require("express").Router();
const {
  fetchAllCountries,
  fetchAllActiveCountries,
} = require("../controllers/getAllCountries");
const auth = require("../middleware/authentication");

router.get("/GetCountries", auth,fetchAllActiveCountries);

router.get("/GetAllCountries", auth,fetchAllCountries);

module.exports = router;
