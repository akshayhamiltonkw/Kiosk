const router = require("express").Router();
const { appSetting, streamVideo } = require("../controllers/appSettings");
const path = require("path");

router.post("/uploads/appSetting", (req, res) => {
  const filePath = path.join(__dirname, `video.MP4`);
  appSetting(req, filePath)
    .then((path) =>
      res.status(200).send({ status: "file uploaded successfully", path })
    )
    .catch((err) =>
      res.status(500).send({ status: "Internal server error", err })
    );
});

router.get("/uploads", streamVideo);

module.exports = router;
