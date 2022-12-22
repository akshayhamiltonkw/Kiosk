const { poolPromise } = require("../database");
let GENDER = ["Male", "Female", "None"];

/*
Function used to get Table group by ID
*/
const getTableGroupByID = async (id) => {
  const result = await poolPromise
    .then((response) =>
      response.query(`SELECT * FROM [dbo].[tblTablesGroup] where id='${id}';`)
    )
    .catch((error) => res.status(400).json({ error: error.message }));

  if (result.recordset.length > 0) {
    let data = {
      id: result.recordset[0].id,
      name: result.recordset[0].name,
      gestNumber: result.recordset[0].gestNumber,
      minimumTime: result.recordset[0].minimumTime,
      maxTime: result.recordset[0].maxTime,
      isActive: result.recordset[0].isActive,
    };
    return data;
  } else {
    return false;
  }
};

/*
Function used to get Table Tags by ID
*/
const getTableTagByID = async (id) => {
  const result = await poolPromise
    .then((response) =>
      response.query(
        `select id, TagId as tagId from table_tags where TableId='${id}'`
      )
    )
    .catch((error) => res.status(400).json({ error: error.message }));

  if (result.recordset) {
    if (result.recordset.length > 0) {
      for (let i = 0; i < result.recordset.length; i++) {
        let tagInfo = await getTagsInfoByID(result.recordset[i].tagId);
        if (tagInfo) {
          result.recordset[i].name = tagInfo.NameEn;
        }
      }
      return result.recordset;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

/*
Function used to get infomation of table
*/
const getTableInfoByID = async (tableId) => {
  const result = await poolPromise
    .then((response) =>
      response.query(`select * from [dbo].[tblTables] where id='${tableId}';`)
    )
    .catch((error) => res.status(400).json({ error: error.message }));

  if (result.recordset.length > 0) {
    return result.recordset[0];
  } else {
    return false;
  }
};

/*
Function used to fetch country information based on Country ID
*/
const fetchCountryInfoById = async (countryID) => {
  try {
    const result = await poolPromise
      .then((response) =>
        response.query(
          `SELECT * FROM [dbo].[tblCountries] where country_id='${countryID}';`
        )
      )
      .catch((error) => res.status(400).json({ error: error.message }));

    if (result.recordset) {
      return result.recordset[0];
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

/*
Function to fetch information of client based on phone number
*/
const fetchClientInfoById = async (id) => {
  const result = await poolPromise
    .then((response) =>
      response.query(`SELECT * FROM [dbo].[tblClient] where client_id=${id};`)
    )
    .catch((error) => res.status(400).json({ error: error.message }));

  if (result.recordset) {
    let data = {
      id: result.recordset[0].client_id,
      name: result.recordset[0].client_name,
      phone: result.recordset[0].client_phone,
      country: result.recordset[0].country,
      gender: GENDER[result.recordset[0].client_gender],
      photo: `${process.env.AVATAR_MEDIA_ENDPOINT_URL}${result.recordset[0].avatar}`,
      hasApp: result.recordset[0].hasApp,
    };
    return data;
  } else {
    return false;
  }
};

/*
Function used to fetch queue information based on table ID
*/
const fetchQueueInfoByTableId = async (tableId) => {
  const result = await poolPromise
    .then((response) =>
      response.query(
        `select TOP(1)* from [dbo].[tblQueueTableMap] where tableId='${tableId}' and status = 0 ORDER By id DESC;`
      )
    )
    .catch((error) => res.status(400).json({ error: error.message }));

  if (result.recordset.length > 0) {
    let queueInfo = await fetchQueueInfoByID(result.recordset[0].qId);
    queueInfo.mapId = result.recordset[0].id;
    return queueInfo;
  } else {
    return false;
  }
};

/*
Function used to fetch queue Infor By Queue Id
*/
const fetchQueueInfoByID = async (id) => {
  const result = await poolPromise
    .then((response) =>
      response.query(`select * from [dbo].[tblQueue] where id='${id}';`)
    )
    .catch((error) => res.status(400).json({ error: error.message }));

  if (result.recordset) {
    if (result.recordset.length > 0) {
      let clientInfo = await fetchClientInfoById(result.recordset[0].client_id);
      if (clientInfo) {
        let countryInfo = await fetchCountryInfoById(clientInfo.country);
        let queueInfo = {
          available: true,
          qId: result.recordset[0].id,
          chairs: 1, //need to update
          client: {
            id: clientInfo.id,
            phone: clientInfo.phone,
            name: clientInfo.name,
            code: countryInfo.country_code,
            fullPhone: countryInfo.country_code + clientInfo.phone,
          },
        };
        return queueInfo;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
};

/*
Function to fetch information of client based on phone number
*/
const fetchClientInfoByPhone = async (countryId, phone) => {
  const result = await poolPromise
    .then((response) =>
      response.query(
        `SELECT * FROM [dbo].[tblClient] where client_phone='${phone}' AND country='${countryId}';`
      )
    )
    .catch((error) => res.status(400).json({ error: error.message }));

  if (result.recordset) {
    let data = {
      id: result.recordset[0].client_id,
      name: result.recordset[0].client_name,
      phone: result.recordset[0].client_phone,
      country: result.recordset[0].country,
      gender: GENDER[result.recordset[0].client_gender],
      photo: `${process.env.AVATAR_MEDIA_ENDPOINT_URL}${result.recordset[0].avatar}`,
      hasApp: result.recordset[0].hasApp,
    };
    return data;
  } else {
    return false;
  }
};

/*
Function used to get Tag info by ID
*/
const getTagsInfoByID = async (id) => {
  const result = await poolPromise
    .then((response) =>
      response.query(`select * from tblQueueTags where id='${id}'`)
    )
    .catch((error) => res.status(400).json({ error: error.message }));

  if (result.recordset) {
    if (result.recordset.length > 0) {
      return result.recordset[0];
    } else {
      return false;
    }
  } else {
    return false;
  }
};

/*
Function used to update table data in database
*/
const updateAvailability = async (queueId, status, tableId) => {
  const result = await poolPromise
    .then((response) =>
      response.query(
        `UPDATE [dbo].[tblTables] SET qMapId='${queueId}', IsAvailable='${status}' where id='${tableId}';`
      )
    )
    .catch((error) => res.status(400).json({ error: error.message }));
  return true;
};

/*
Function used to get Restaurant data by Branch ID
*/
const getRestInfoByBranchId = async (branchId) => {
  try {
    const result = await poolPromise
      .then((response) =>
        response.query(
          `select * from tblRestaurants with(NOLOCK) where (id='${branchId}');`
        )
      )
      .catch((error) => res.status(400).json({ error: error.message }));
    if (result.recordset) {
      if (result.recordset.length > 0) {
        return result.recordset[0];
      }
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const updateChairCountByQueueId = async (qId, chairCount) => {
  try {
    const result = await poolPromise
      .then((response) =>
        response.query(
          `UPDATE tblQueue SET maxGroup='${chairCount}', minmumGroup='${chairCount}' where id='${qId}'`
        )
      )
      .catch((error) => res.status(400).json({ error: error.message }));
    return true;
  } catch (error) {
    return false;
  }
};

const updateNoteByQueueId = async (qId, note) => {
  try {
    const result = await poolPromise
      .then((response) =>
        response.query(`UPDATE tblQueue SET note='${note}' where id='${qId}'`)
      )
      .catch((error) => res.status(400).json({ error: error.message }));

    return true;
  } catch (error) {
    return false;
  }
};

module.exports = {
  getTableGroupByID,
  getTableTagByID,
  getTableInfoByID,
  fetchCountryInfoById,
  fetchClientInfoById,
  fetchQueueInfoByTableId,
  fetchQueueInfoByID,
  fetchClientInfoByPhone,
  getTagsInfoByID,
  updateAvailability,
  getRestInfoByBranchId,
  updateChairCountByQueueId,
  updateNoteByQueueId,
};
