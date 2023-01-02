const setting = async (req, res) => {
  console.log("hello world");
  //, video, colorCode
  const { branchId, userName, image } = req.body;
  console.log(branchId, userName, image);
  res.status(200).send({ message: branchId });
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

module.exports = { setting };
