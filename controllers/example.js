const db=require('../database');



const getInLineKiosk=async(req,res)=>{

   // try{
    const {chairs,area,partyType,seatingArea,name,phone}=req.body;
     
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
  const pool=db.poolPromise
  console.log(pool)
        const result = await pool
        .request()
        .query(
         "INSERT INTO usersAkshay(chairs,area,partyType,seatingArea,name,phone) VALUES ?",[[chairs,area,partyType,seatingArea,name,phone]]
        );
        //if(result) return res.send({result:result})
  
    
       res.send({message:result})
    //   }catch(error){
    //     res.status(500).json({
    //       success: false,
    //       message: error
    //       //"Internal server error ",error:error
    //     });
  
     // }
  
     
  
  }

  module.exports=getInLineKiosk 