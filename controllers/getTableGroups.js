const db = require("../database");

const getTableGroups = async (req, res) => {
  try {
    const pool = await db.poolPromise;
    const tableGroups = await pool
      .request()
      .query(`SELECT * FROM [dbo].[tblTablesGroup];`);
     
      let allTables = tableGroups["recordset"]

    res.status(200).json({
      ErrorCode: 200,
      Message: "",
      Success: true,
      Title: "",
      CurrentRecords: 0,
      NextPage: 0,
      Page: 0,
      SearchKey: "",
      SortBy: 0,
      TotalRecords: 0,
      ListOfData: allTables

      
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error ",
    });
  }
};

module.exports = getTableGroups;
