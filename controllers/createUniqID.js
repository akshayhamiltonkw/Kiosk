const db = require("../database");
const UUID=require('uuid').v4;


const createUniqID = async (req, res) => {
  try {
       

    const token = req.header("Authorization");
    if (!token) return res.status(400).send({message: "Invalid authorization token"});

    const CreateUniqueId=UUID(token)
    const check=/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
    let tested=check.test("46679b75-1cf9-4acf-be53-415ca48223f0")
    console.log(tested)

    res.status(200).json({
      ErrorCode: 200,
      Message: "",
      Success: true,
      Title: "",
      uuid:CreateUniqueId
    

      
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error ",
    });
  }
};

module.exports = createUniqID;
