const db = require("../database");
const { TablePositions, qMapStatus } = require(".././constant/tables");
const axios = require("axios");

// const insideSeating=async(req,res)=>{

//     // const pool=db.poolPromise;
//     // let result=await pool
//     // .request()
//     // .query(`select * from [dbo].[tblQueue] `);
//     // const id = req["host-details"].rest_id;with(NOLOCK) where ((rest_id=${id}) and (status=0 or status=1 or status=6  or status=7) and (position=${TablePositions.inside} or position=${TablePositions.any})) order by insidePosition;`
//     // const pool = await db.poolPromise;
//     // const result = await pool
//     //   .request()
//     //   .query(`SELECT * from [dbo].[tblQueue]  `);
//     //   let re= await result.recordset
//     // console.log(re);

//     // `select * from [dbo].[tblUsers] `

// }

// const outSideSeating=async(req,res)=>{

// }

// {
//   "chairs":"10",
//   "area":"smoking",
//   "partyType":"family",
//   "seatingArea":"outside",
//     "name":"akshay",
//   "phone":9766619238
// }

const getInLineKiosk = async (req, res) => {
  try {
    const { restId } = req.body;
    console.log(restId);
    let isActive = 1 || 0;
    const pool = db.poolPromise;

    const Restaurant = await pool
      .request()
      .query(
        `SELECT * FROM [dbo].[tblRestaurants] WHERE id='${restId}' and isActive='${isActive}';`
      );
    // const pool = await db.poolPromise;
    // const result = await pool
    //   .request()
    //   .query(`SELECT * FROM [dbo].[tblUsers] where userName='${userName}';`);
    // ternary operator to check the eligibility to vote
    // let age = 15;
    // let result =
    //     (age >= 18) ? "You are eligible to vote." : "You are not eligible to vote yet";
    // console.log(result);
    res.status(200).send({ message: Restaurant });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error hhh",
      error,
    });
  }
};

// const checkYourTurn=async(req,res)=>{

// }

/*
Function used to add Queue
*/
const createQueue = async (req, res) => {
  try {
    let { chairs, note, clientId, tablePosition, tagId, subTagId, client } =
      req.body;

    if (!chairs) {
      return res.status(400).json({
        success: false,
        message: "Invalid chair details",
        data: [],
      });
    }
    if (!clientId) {
      return res.status(400).json({
        success: false,
        message: "Invalid Client details",
        data: [],
      });
    }
    if (!tablePosition) {
      return res.status(400).json({
        success: false,
        message: "Invalid table position",
        data: [],
      });
    } else {
      if (tablePosition.toLowerCase() === "inside") {
        tablePosition = TablePositions.inside;
      } else if (tablePosition.toLowerCase() === "outside") {
        tablePosition = TablePositions.outside;
      } else {
        tablePosition = TablePositions.any;
      }
    }
    if (!client) {
      return res.status(400).json({
        success: false,
        message: "Invalid Client details",
        data: [],
      });
    }

    const userId = req["host-details"].user_id;
    const restId = req["host-details"].branch_id;
    const pool = await db.poolPromise;
    let query = `INSERT into tblQueue(rest_id, maxGroup, minmumGroup, note, client_id, position, QueueTagID, QueueSubTagID, status, createdUser) VALUES(${restId}, ${chairs}, ${chairs}, '${note}', ${clientId}, ${tablePosition}, ${tagId}, ${subTagId}, ${QueueStatus.Queued}, ${userId})`;

    const result = await pool.request().query(query);
    return res.status(200).json({
      message: "success",
      data: [],
      sucess: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: {},
    });
  }
};

module.exports = { createQueue, getInLineKiosk };
// {insideSeating,checkYourTurn,
//   getInLineKiosk
//   ,outSideSeating}
