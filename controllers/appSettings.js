const path = require("path");
const UUID = require("uuid").v4;
const { poolPromise } = require("../database");
const { stat, createReadStream, createWriteStream } = require("fs");
const { promisify } = require("util");
const multiparty = require("multiparty");
const filename =
  "C:/Users/Admin/Desktop/Kiosk-requeue/Kiosk/mp4/Black_Panther_Wakanda_Forever.mkv";

//"C:/Users/Admin/Desktop/Kiosk-requeue/Kiosk/mp4/O Yaara - Sawai Bhatt-(Hd9video).mp4";

const fileInfo = promisify(stat);

const sendVideo = async (req, res) => {
  const { size } = await fileInfo(filename);
  console.log(size);
  const range = req.headers.range;
  if (range) {
    let [start, end] = range.replace(/bytes=/, "").split("-");
    start = parseInt(start, 10);
    end = end ? parseInt(end, 10) : size - 1;
    console.log(start, end);

    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${size}`,
      "Accept-Ranges": "bytes",
      "Content-Length": start - end + 1,
      "Content-Type": "video/mp4",
    });

    createReadStream(filename, { start, end }).pipe(res);
  } else {
    res.writeHead(200, {
      "Content-Length": size,
      "Content-Type": "video/mp4",
    });
    createReadStream(filename).pipe(res);
  }
};

const UploadVideo = async (req, res) => {
  try {
    if (req.method === "POST") {
      const { branchId } = req.body;
      console.log(branchId);
      let form = new multiparty.Form();
      form.on("part", (part) => {
        console.log(part.headers["content-type"]);
        // const ext = path.extname(part.filename);
        // console.log(ext);
        part
          .pipe(
            createWriteStream(
              `C:/Users/Admin/Desktop/Kiosk-requeue/Kiosk/uploads/${part.filename}`
            )
          )
          .on("close", () => {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(`video uploded successfully`);
          });
      });
      form.parse(req);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const appSettings = async (req, res) => {
  console.log("hello world");
  //, video, colorCode
  const { branchId, userName, image } = req.body;
  console.log(branchId, userName, image);
  res.status(200).send({ message: req.body });
  // try {
  //   const pool = await poolPromise;
  //   const branch = await pool
  //     .request()
  //     .query(
  //       `SELECT * FROM [dbo].[Kiosk_appSetting] WHERE userName='${userName}' and branch_id='${branchId}';`
  //     );
  //   console.log(branch);
  //   if (branch["recordset"].length === 1) {
  //     const UserName = branch["recordset"][0].userName;
  //     const BranchId = branch["recordset"][0].branch_id;
  //     const ImageId = branch["recordset"][0].imageId;
  //     const ColorCode = branch["recordset"][0].colorCode;
  //     const VideoId = branch["recordset"][0].videoId;
  //     if (image) {
  //       if (ImageId === null && req.method === "POST") {
  //         let form = new multiparty.Form();
  //         form.on("part", async (part) => {
  //           let type = part.headers["content-type"];
  //           const ext = path.extname(part.filename);
  //           let image = UUID();
  //           let ImageName = `${image}.${ext}`;

  //           const pool = await db.poolPromise;
  //           const ImageUpdate = await pool
  //             .request()
  //             .query(
  //               `UPDATE [dbo].[Kiosk_appSetting] SET [imageId]='${ImageName}' WHERE [branch_id]='${branchId}'and userName='${userName}' `
  //             );

  //           part
  //             .pipe(
  //               createWriteStream(
  //                 `C:/Users/Admin/Desktop/Kiosk-requeue/Kiosk/uploads/${part.filename}`
  //               )
  //             )
  //             .on("close", () => {
  //               res.writeHead(200, { "Content-Type": "application/json" });
  //               res.end(`video uploded successfully`);
  //             });
  //         });
  //         form.parse(req);
  //       } else {
  //         console.log(ImageId);
  //       }
  //     }
  //     if (colorCode) {
  //       if (ColorCode) {
  //         const pool = await db.poolPromise;
  //         const ImageUpdate = await pool
  //           .request()
  //           .query(
  //             `UPDATE [dbo].[Kiosk_appSetting] SET [colorCode]='${colorCode}' WHERE [branch_id]='${branchId}' and userName='${userName}' `
  //           );
  //         console.log(colorCodeUpdate);
  //       } else {
  //         console.log(ColorCode);
  //       }
  //     }
  //     if (videoDetails) {
  //       if (VideoId === null) {
  //         const pool = await db.poolPromise;
  //         const VideoUpdate = await pool
  //           .request()
  //           .query(
  //             `UPDATE [dbo].[Kiosk_appSetting] SET [videoId]='${videoDetails}' WHERE [branch_id]='${branchId}' and userName='${userName}' `
  //           );
  //       } else {
  //         console.log(VideoId);
  //       }
  //     }
  //     res.status(200).send({
  //       data: { UserName, BranchId, ImageId, ColorCode, VideoId },
  //     });
  //   } else {
  //     if (branch["recordset"].length === 0) {
  //       if (image) {
  //         let form = new multiparty.Form();
  //         form.on("part", async (part) => {
  //           const ext = path.extname(part.filename);
  //           let image = UUID();
  //           let ImageName = `${image}${ext}`;

  //           const pool = await poolPromise;
  //           const ImageUpdate = await pool
  //             .request()
  //             .query(
  //               "INSERT INTO [dbo].[Kiosk_appSetting](branch_id,userName,imageId) VALUES ('" +
  //                 branchId +
  //                 "','" +
  //                 userName +
  //                 "', '" +
  //                 ImageName +
  //                 "')"
  //             );
  //           part
  //             .pipe(
  //               createWriteStream(
  //                 `C:/Users/Admin/Desktop/Kiosk-requeue/Kiosk/uploads/${ImageName}`
  //               )
  //             )
  //             .on("close", () => {
  //               res.writeHead(200, { "Content-Type": "application/json" });
  //               res.end(`video uploded successfully`);
  //             });
  //         });
  //         form.parse(req);
  //       }
  //       if (video) {
  //         let form = new multiparty.Form();
  //         form.on("part", async (part) => {
  //           const ext = path.extname(part.filename);
  //           let videoId = UUID();
  //           let VideoName = `${videoId}${ext}`;

  //           const pool = await poolPromise;
  //           const videoInsert = await pool
  //             .request()
  //             .query(
  //               "INSERT INTO [dbo].[Kiosk_appSetting](branch_id,userName,videoId) VALUES ('" +
  //                 branchId +
  //                 "','" +
  //                 userName +
  //                 "', '" +
  //                 VideoName +
  //                 "')"
  //             );
  //           part
  //             .pipe(
  //               createWriteStream(
  //                 `C:/Users/Admin/Desktop/Kiosk-requeue/Kiosk/uploads/${VideoName}`
  //               )
  //             )
  //             .on("close", () => {
  //               res.writeHead(200, { "Content-Type": "application/json" });
  //               res.end(`video uploded successfully`);
  //             });
  //         });
  //         form.parse(req);
  //       }
  //       if (colorCode) {
  //         const pool = await poolPromise;
  //         const colorInsert = await pool
  //           .request()
  //           .query(
  //             "INSERT INTO [dbo].[Kiosk_appSetting](branch_id,userName,colorCode) VALUES ('" +
  //               branchId +
  //               "','" +
  //               userName +
  //               "', '" +
  //               colorCode +
  //               "')"
  //           );
  //       }
  //     }
  //   }
  // } catch (error) {
  //   res.status(500).send({ message: error.message });
  // }
};
const getAppSetting = async (req, res) => {
  try {
    const pool = await db.poolPromise;
    const result = await pool
      .request()
      .query(`SELECT * FROM [dbo].[Kiosk_appSetting];`);
    res.status(200).send({ data: result });
  } catch (error) {
    res.status(404).send({ message: "internal server error" });
  }
};

module.exports = { sendVideo, UploadVideo, appSettings };
