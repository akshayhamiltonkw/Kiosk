const router = require("express").Router();
const login = require("../controllers/authentication");

router.post("/LoginKiosk", login);

module.exports = router;
