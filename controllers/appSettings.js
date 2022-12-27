const fs = require("fs");
const handleDb = require("../config/handler");
const path = require("path");
const UUID = require("uuid").v4;
const { poolPromise } = require("../database");

const appSetting = async (req, res) => {
  return new Promise((resolve, reject) => {
    const stream = fs.createWriteStream(filePath);
    // With the open - event, data will start being written
    // from the request to the stream's destination path
    stream.on("open", () => {
      console.log("Stream open ...  0.00%");
      req.pipe(stream);
    });

    // Drain is fired whenever a data chunk is written.
    // it will print how much data has been written yet.
    stream.on("drain", () => {
      const written = parseInt(stream.bytesWritten);
      const total = parseInt(req.headers["content-length"]);
      console.log(total);
      const pWritten = ((written / total) * 100).toFixed(2);
      console.log(`Processing  ...  ${pWritten}% done`);
    });

    // When the stream is finished, print a final message
    // Also, resolve the location of the file to calling function
    stream.on("close", () => {
      console.log("Processing  ...  100%");
      resolve(filePath);
    });
    // If something goes wrong, reject the promise
    stream.on("error", (err) => {
      console.error(err);
      reject(err);
    });
  });
};
const AppSetting = async (req, res) => {
  const { imageId, videoId, ColorCode } = req.query;
  console.log(req.file);

  try {
    const Kiosk_appSetting = await poolPromise
      .then((response) =>
        response.query(`SELECT * FROM [dbo].[Kiosk_appSetting] ;`)
      )
      .catch((error) => res.status(400).json({ error: error.message }));
    const filePath = path.join(__dirname, `video.MP4`);
    console.log(Kiosk_appSetting);

    console.log(UUID());

    if (imageId) {
    } else if (videoId) {
    } else if (ColorCode) {
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  //console.log(image, video, ColorCode);

  // appSetting(req, filePath)
  //   .then((path) =>
  //     res.status(200).send({ status: "file uploaded successfully", path })
  //   )
  //   .catch((err) =>
  //     res.status(500).send({ status: "Internal server error", err })
  //   );
};

function getFile(file_name, callback) {
  fs.readFile(path.resolve(process.env.FILE_UPLOAD_PATH, file_name), callback);
  console.log(process.env.FILE_UPLOAD_PATH);
}

function streamVideoFile(req, res, video_file) {
  const path = process.env.FILE_UPLOAD_PATH + req.query.file_name;
  const total = video_file.length;
  var range = req.headers.range;
  if (range) {
    var positions = range.replace(/bytes=/, "").split("-");
    var start = parseInt(positions[0], 10);
    var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
    var chunksize = end - start + 1;
    res.writeHead(206, {
      "Content-Range": "bytes " + start + "-" + end + "/" + total,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "video/mp4 video/MKV",
    });
    res.end(video_file.slice(start, end + 1), "binary");
  } else {
    res.writeHead(200, {
      "Content-Length": total,
      "Content-Type": "video/mp4 video/MKV",
    });
    fs.createReadStream(path).pipe(res);
  }
}

const streamVideo = function (req, res) {
  const file_name = req.params.file_name;

  function handleFile(error, file_data) {
    if (error) {
      if (error.code === "ENOENT") {
        return res.status(404).json({
          error: "No such file found",
        });
      }
      return res.json(error);
    }
    streamVideoFile(req, res, file_data);
  }

  getFile(file_name, handleFile);
};

module.exports = { AppSetting, streamVideo };
