const jwt = require("jsonwebtoken");
const db = require("../database");

const auth = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token)
    return res.status(401).json({
      success: false,
      message: "provide token",
      data: [],
    });

  try {
    const verified = jwt.verify(token, process.env.JWTSECRETKEY);
    req["hostdata"] = verified;
    const pool = await db.poolPromise;
    const result = await pool
      .request()
      .query(
        `SELECT * FROM [dbo].[tblUsers] where user_id=${req.hostdata.UserID};`
      );
    if (result?.recordset?.length > 0) {
      req["kiosk"] = result.recordset[0];
      
      next();
    } else {
      return res.json({
        success: false,
        message: "Authorized user",
        data: [],
      });
    }
  } catch (error) {
    return res.send({
      success: false,
      message: "Something went wrong",
      data: [],
    });
  }
};

module.exports = auth;
