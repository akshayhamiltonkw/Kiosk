const router = require("express").Router();
const auth = require("../middleware/authentication");
const appSetting = require("../controllers/appSettings");
const path = require("path");

router.post("/appSetting", (req, res) => {
  const filePath = path.join(
    "C:/Users/AKSHAY/OneDrive/Desktop/Requeue-kiosk/userUploads",
    `video.MP4`
  );
  appSetting(req, filePath)
    .then((path) =>
      res.status(200).send({ status: "file uploaded successfully", path })
    )
    .catch((err) =>
      res.status(500).send({ status: "Internal server error", err })
    );
});

module.exports = router;
