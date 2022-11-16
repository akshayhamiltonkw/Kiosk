const db = require("../database");

const getRestaurantStatistic = async (req, res) => {
  try {
    const userToken = req.header("userToken");
    const Authorization = req.header("Authorization");
    if (!userToken)
      return res.status(400).send({ message: "provide user token" });
    if (!Authorization)
      return res.status(400).send({ message: "provide user Authorization" });
    const pool = await db.poolPromise;
    const UserToken = await pool
      .request()
      .query(
        `SELECT * FROM [dbo].[tblUserToken] WHERE accessToken='${userToken}';`
      );
    let ClientId = UserToken["recordset"][0].userID;
    let AccessToken = UserToken["recordset"][0].accessToken;
    const tableUser = await pool
      .request()
      .query(`SELECT * FROM [dbo].[tblClient] WHERE client_id='${ClientId}';`);
    let RestId = tableUser["recordset"][0].restId;
    let totalQ = tableUser["recordset"][0].totalQueue;
    const queue = await pool
      .request()
      .query(`SELECT * FROM [dbo].[tblQueue] WHERE client_id='${ClientId}';`);

    //let client_Queue = queue["recordset"][0];

    console.log(RestId);
    const restaurant = await pool
      .request()
      .query(`SELECT * FROM [dbo].[tblRestaurants] WHERE id='${RestId}' ;`);
    // let Restaurant = restaurant["recordset"][0];
    let qtime = restaurant["recordset"][0].qTime;
    if (totalQ > 0) {
      totalQ = totalQ + 1;
      fromTime = totalQ * qtime;
      totalQ = totalQ - 1;
    } else {
      toTime = 0;
      fromTime = 0;
      totalQ = 0;
    }

    console.log(ClientId);
    res.status(200).send({
      ErrorCode: 200,
      Message: "",
      Success: true,
      Title: "",
      //data:UserToken,
      accessToken: AccessToken,
      // client: client_Queue,
      // client_phone: tableUser,
      // restaurant: Restaurant,
      Statistic: {
        Id: restaurant["recordset"][0].id,
        CancelReasonRequired: true,
        Category: queue["recordset"][0].category,
        CloseHour: restaurant["recordset"][0].closeHour,
        EstmQTime: [
          {
            Active: true,
            Full: false,
            Hidden: false,
            IsAvailable: true,
            MaxTabelGroup: 5,
            Name: "Inside",
            NameAr: "الداخل",
            fromTime: 0,
            isMinmum: true,
            positing: 0,
            toTime: 0,
            totalQ: 0,
          },
          {
            Active: false,
            Full: false,
            Hidden: false,
            IsAvailable: false,
            MaxTabelGroup: 5,
            Name: "Outside",
            NameAr: "الخارج",
            fromTime: 0,
            isMinmum: false,
            positing: 1,
            toTime: 0,
            totalQ: 0,
          },
          {
            Active: true,
            Full: false,
            Hidden: false,
            IsAvailable: true,
            MaxTabelGroup: 5,
            Name: "Any",
            NameAr: "أي مكان",
            fromTime: 0,
            isMinmum: false,
            positing: 2,
            toTime: 0,
            totalQ: 0,
          },
        ],
        Is24Hours: false,
        IsFull: restaurant["recordset"][0].isFull,
        IsOpen: restaurant["recordset"][0].isOpen,
        KioskInsideFull: restaurant["recordset"][0].KioskInsideFull,
        KioskIsFull: restaurant["recordset"][0].KioskIsFull,
        KioskOutsideFull: restaurant["recordset"][0].KioskOutsideFull,
        //KioskeBackground: "",
        ManualOpen: restaurant["recordset"][0].manualOpen,
        MaxInside: restaurant["recordset"][0].maxInside,
        MaxOutside: restaurant["recordset"][0].maxOutside,
        //Online: true,
        OpenHour: restaurant["recordset"][0].openHour,
        OutsideActive: restaurant["recordset"][0].outsideActive,
        QTime: restaurant["recordset"][0].qTime,
        UserHold: restaurant["recordset"][0].userHold,
      },
    });

    //   const setting = await pool
    //   .request()
    //   .query(`SELECT * FROM [dbo].[tblRestSettings];`);

    //   const workingHours = await pool
    //   .request()
    //   .query(`SELECT * FROM [dbo].[tblWorkingHours] ;`);

    //   const tables = await pool
    //   .request()
    //   .query(`SELECT * FROM [dbo].[tblTables] WHERE qMapId='${ }';`);

    //   let QMapID=tables["recordset"][0];

    //   if(QMapID === -1){
    //      IsAvailable = true;
    //   }else{
    //     IsAvailable = false;
    //   };

    //   let TablePositions =["inside", "outside", "any"];
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error ",
    });
  }
};

module.exports = getRestaurantStatistic;
