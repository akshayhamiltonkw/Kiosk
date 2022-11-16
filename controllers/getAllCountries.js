const db = require('../database');

/*
Function used to fetch list of all active countries
*/
const fetchAllActiveCountries = async (req, res) => {
  try {
    const pool = await db.poolPromise;
    const result = await pool
      .request()
      .query("SELECT * FROM [dbo].[tblCountries] where country_status=1;");
    if (result.recordset) {
      let data = [];
      for (let i = 0; i < result.recordset.length; i++) {
        data.push({
          id: result.recordset[i].country_id,
          name: result.recordset[i].country_name,
          nameAR: result.recordset[i].country_name_ar,
          flag: `${process.env.FLAG_MEDIA_ENDPOINT_URL}${result.recordset[i].flag}`,
          code: result.recordset[i].country_code,
          shortCode: result.recordset[i].shortCode,
          restActive: result.recordset[i].restActive,
        });
      }
      res.json({
        success: true,
        message: "",
        data: data,
      });
    } else {
      res.json({
        success: false,
        message: "Countries not available",
        data: [],
      });
    }
  } catch (err) {
    res.json({
      success: false,
      message: err,
      data: [],
    });
  }
};

/*
Function used to fetch list of all countries
*/
const fetchAllCountries = async (req, res) => {
  try {
    const pool = await db.poolPromise;
    const result = await pool
      .request()
      .query("SELECT * FROM [dbo].[tblCountries];");

    if (result.recordset) {
      let data = [];
      for (let i = 0; i < result.recordset.length; i++) {
        data.push({
          id: result.recordset[i].country_id,
          name: result.recordset[i].country_name,
          nameAR: result.recordset[i].country_name_ar,
          flag: `${process.env.FLAG_MEDIA_ENDPOINT_URL}${result.recordset[i].flag}`,
          code: result.recordset[i].country_code,
          shortCode: result.recordset[i].shortCode,
          restActive: result.recordset[i].restActive,
        });
      }
      res.json({
        success: true,
        message: "",
        data: data,
      });
    } else {
      res.json({
        success: false,
        message: "Countries not available",
        data: [],
      });
    }
  } catch (err) {
    res.json({
      success: false,
      message: err,
      data: [],
    });
  }
};

/*
Function used to fetch country information based on Country ID
*/
const fetchCountryInfoById = async (countryID) => {
  try {
    const pool = await db.poolPromise;
    const result = await pool
      .request()
      .query(
        `SELECT * FROM [dbo].[tblCountries] where country_id=${countryID};`
      );

    if (result.recordset) {
      return result.recordset[0];
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

module.exports = {
  fetchAllCountries,
  fetchAllActiveCountries,
  fetchCountryInfoById,
};