const router = require("express").Router();
const { setting } = require("../controllers/setting");
const {
  sendVideo,
  UploadVideo,
  appSettings,
} = require("../controllers/appSettings");

router.post("/appSettings", setting);

router.post("/upload", UploadVideo);
router.get("/sendVideo", sendVideo);

module.exports = router;
