const {
  fetchClientInfoById,
  fetchClientInfoByPhone,
} = require(".././middleware/common");

/*
Function used to fetch Client informations based to given query parameters
*/
const getClientInformation = async (req, res) => {
  try {
    if (req.query.id) {
      //if query contains id then fetch information from database based on ID
      let clientInfo = await fetchClientInfoById(req.query.id);
      if (clientInfo) {
        return res.json({
          success: true,
          message: "",
          data: clientInfo,
        });
      } else {
        return res.json({
          success: false,
          message: "client not found",
          data: {},
        });
      }
    } else if (req.query.countryId && req.query.phone) {
      //if query contains id then fetch information from database based on country ID & phone number
      let clientInfo = await fetchClientInfoByPhone(
        req.query.countryId,
        req.query.phone
      );
      if (clientInfo) {
        return res.json({
          success: true,
          message: "",
          data: clientInfo,
        });
      } else {
        return res.json({
          success: false,
          message: "client not found",
          data: {},
        });
      }
    } else {
      return res.json({
        success: false,
        message: "Invalid API call",
        data: [],
      });
    }
  } catch (err) {
    return res.json({
      success: false,
      message: "Something went wrong",
      data: [],
    });
  }
};

module.exports = { getClientInformation };
