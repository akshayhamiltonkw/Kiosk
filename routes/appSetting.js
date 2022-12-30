const router = require("express").Router();
const { appSetting, streamVideo } = require("../controllers/appSettings");
const multer = require("multer");
const upload = multer.memoryStorage();
const path = require("path");

// var storage = multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, "./uploads");
//   },
//   filename: function (req, file, callback) {
//     console.log(req.file);
//     callback(null, file.fieldname + "-" + Date.now());
//   },
// });
// var upload = multer({ storage: storage }).single("userPhoto");

// var storage = multer.memoryStorage({
//     destination: function(req, file, callback) {
//        callback(null, '');
//     }
//  });
//  var upload = multer({ storage: storage }).any();

//  const saveFilesToS3 = async(req, res) => {
//      upload(req, res, async(err) => {
//          console.log(req.files[0].buffer) // printing incoming file content as buffer
//          // rest of the code here
//      })
//  }

//   app.post('/api/photo',function(req,res){
//     upload(req,res,function(err) {
//         if(err) {
//             return res.end("Error uploading file.");
//         }
//         res.end("File is uploaded");
//     });
// });

router.post("/uploads/appSetting", async (req, res) => {
  const filePath = path.join(
    "C:/Users/Admin/Desktop/Kiosk-requeue/Kiosk/uploads",
    `video.png`
  );

  appSetting(req, filePath)
    .then((path) =>
      res.status(200).send({
        status: "file uploaded successfully",
        path,
        path: filePath,
      })
    )
    .catch((err) =>
      res.status(500).send({ status: "Internal server error", err })
    );
});

router.get("/uploads", streamVideo);

module.exports = router;
