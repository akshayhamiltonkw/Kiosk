const router = require("express").Router();

const {
  getInlineKiosk,
  getQueue,
  Addqueue,
  checkInLine,
} = require("../controllers/newqueue");
const auth = require("../middleware/authentication");

router.post("/createQueue", Addqueue);
router.post("/getInlineKiosk", getInlineKiosk);
router.get("/getQueue", getQueue);
router.get("/checkInLine", checkInLine);

module.exports = router;
