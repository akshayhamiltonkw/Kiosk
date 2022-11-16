const db = require("../database");

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

const getInLineKiosk = async (req, res) => {
  try {
    const { chairs, area, partyType, seatingArea, name, phone } = req.body;

    if (!chairs) {
      return res.status(400).json({
        status: false,
        message: "Invalid chair details",
        data: [],
      });
    }
    if (!area) {
      return res.status(400).json({
        status: false,
        message: "Invalid area details",
        data: [],
      });
    }
    if (!partyType) {
      return res.status(400).json({
        status: false,
        message: "Invalid party type",
        data: [],
      });
    }
    if (!seatingArea) {
      return res.status(400).json({
        status: false,
        message: "choose proper seating details",
        data: [],
      });
    }
    if (!name) {
      return res.status(400).json({
        status: false,
        message: "enter user name",
        data: [],
      });
    }
    if (!phone) {
      return res.status(400).json({
        status: false,
        message: "enter phone details",
        data: [],
      });
    }

    //     let  sql="INSERT INTO usersAkshay(chairs,area,partyType,seatingArea,name,phone) VALUES ?";
    // let values=[[chairs,area,partyType,seatingArea,name,phone]];
    const pool = db.poolPromise;
    console.log(pool);
    const result = await pool
      .request()
      .query(
        "INSERT INTO usersAkshay(chairs,area,partyType,seatingArea,name,phone) VALUES ?",
        [[chairs, area, partyType, seatingArea, name, phone]]
      );
    //if(result) return res.send({result:result})

    res.send({ message: result });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error ",
      error,
    });
  }
};

// const checkYourTurn=async(req,res)=>{

// }

module.exports = getInLineKiosk;
// {insideSeating,checkYourTurn,
//   getInLineKiosk
//   ,outSideSeating}
