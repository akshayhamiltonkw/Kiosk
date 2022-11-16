const db = require("../database");
const jwt = require("jsonwebtoken");
const uuid = require("uuid").v4();

// branch_id userName password
const Login = async (req, res) => {
  try {
    const { branchId, userName, password } = req.body;
    let Channel = req.headers["user-agent"];
    if (!branchId || !userName || !password) {
      return res.status(400).send("fill all details");
    }

    const pool = await db.poolPromise;
    const result = await pool
      .request()
      .query(`SELECT * FROM [dbo].[tblUsers] where userName='${userName}';`);

    let login = false;
    let len = result["recordset"].length;
    let data = result["recordset"];
    let userData = {};

    for (i = 0; i < len; i++) {
      if (
        data[i].userName == userName &&
        data[i].user_password == password &&
        data[i].branch_id == branchId
      ) {
        login = true;
        userData = { ...data[i] };
      }
    }

    if (login) {
      //  //token parameters
      let User = userData["userName"];
      let UserID = userData["user_id"];
      let AccessToken = uuid;
      let groupID = userData["user_group"];

      //  //create and assign a token to host
      const token = await jwt.sign(
        { UserID, Channel, AccessToken, User },
        process.env.JWTSECRETKEY,
        { expiresIn: "7d" }
      );
      

      res.status(200).json({
        ErrorCode: 200,
        Message: "Success...",
        Success: true,
        Title: "",
        acessToken: token,
        data: {
          
          user: {
            userName: User,
            id: UserID,
            branchId: branchId,
            groupID: groupID,
          },
        },
      });
    }

    if (!login) {
      res.status(404).send({
        success: false,
        message: "user credentials not found in database ",
        data: [],
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error ",
    });
  }
};

module.exports = Login;
