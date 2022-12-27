const router = require("express").Router();
const { AppSetting, streamVideo } = require("../controllers/appSettings");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post("/uploads/appSetting", upload.single(), AppSetting);

router.get("/uploads", streamVideo);

module.exports = router;
