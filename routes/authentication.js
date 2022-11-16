const router = require("express").Router();
const auth = require("../middleware/authentication");
const login = require("../controllers/authentication");

router.post("/LoginKiosk", login);
router.get("/protected", auth, (req, res) => {
  res.send({ message: "you are in protected routes" });
});

module.exports = router;
