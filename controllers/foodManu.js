const db=require('../database');

const foodManu=async(req,res)=>{
try{
    const pool = await db.poolPromise;
    const result = await pool
      .request()
      .query(`SELECT * FROM [dbo].[tblMenuItems] `);

      //foodMenu details 
    let len = result["recordset"].length;
    let data = result["recordset"];
    //console.log(data)
    console.log(len)
   let MenuItems = [];

    for (i = 0; i < len; i++) {
      if (
        data
      ) {
       MenuItems.push({enName:data[i].nameEn,
        detailsEn:data[i].detailsEn ,
       detailsAr: data[i].detailsAr,
       price:data[i].price})
      //console.log(data[i].detailsEn)
       // MenuItems = { ...d};
      }
    }
    //console.log("hello",MenuItems[i].detailsAr)
res.status(200).send({data:MenuItems})




}catch(error){
    res.status(500).json({
        success: false,
        message: "Internal server error ",
        error:error
      });


}






}

module.exports=foodManu