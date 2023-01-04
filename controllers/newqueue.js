const { poolPromise } = require("../database");
const { QueueStatus, CancelReason } = require("../../Kiosk/constant/queue");
const { TablePositions, qMapStatus } = require(".././constant/tables");
const { fetchClientInfoById } = require("../middleware/common");
const d = new Date();
const b = new Date();
let year = d.getFullYear();
let month = d.getMonth() + 1;
let day = d.getDate();
let hrs = b.getHours();
let min = b.getMinutes();
let sec = b.getSeconds();
let date =
  year + "-" + month + "-" + day + " " + hrs + ":" + min + ":" + sec + ".000 ";

console.log(date);

const getInlineKiosk = async (req, res) => {
  try {
    const { restId, client_Id } = req.body;
    const pool = poolPromise;
    const Rest = await pool
      .then((then) =>
        then.query(`SELECT * FROM [dbo].[tblRestaurants] WHERE id='${restId}';`)
      )
      .catch((err) => err.message);
    const Queue = await pool
      .then(
        (then) =>
          then.query`SELECT * FROM [dbo].[tblQueue] WHERE rest_id='${restId}' and client_id='${client_Id}' and (status=3 or status=4 or status=5 or status=6 or status=7 or status=8 or status=9) order by id desc;`
      )
      .catch((err) => err.message);
    //and (createdDate >= '${date}')
    console.log(Queue);
    // let filterdQueue = Queue["recordsets"].map(function (records) {
    //   return records.map(function (element) {
    //     console.log(element.status);
    //     return element.status;
    //   });
    // });

    let active = Rest.recordsets[0][0].isActive === true;
    let open = Rest.recordsets[0][0].isOpen === true;
    let isFull = Rest.recordsets[0][0].isFull === false;
    let AllowFullListAccess =
      Rest.recordsets[0][0].AllowFullListAccess === true;
    if (active) {
      if (!open)
        return res.status(203).json({ message: "restaurant is not open" });
      if (!isFull) {
        return res.status(203).json({ message: "restaurant is full" });
      }
      // return res.status(404).json({ message: "restaurant is full" });

      if (open && isFull) {
        // let  sqlCommand  = "SELECT top 1 id from tblQueue where ((rest_id='" & restId & "') and (status in (" &
        //                              QueueStatus.Queued & "," & QueueStatus.ReQueued & "," & QueueStatus.Rest_ReQueued &
        //                              "," & QueueStatus.Rest_Queued & "," & QueueStatus.Hold & "," & QueueStatus.RestHold &
        //                              ")) and (createdDate >= '" & startDate & "') and (client_id='" & clientID &
        //     "')) order by id desc"

        return res.status(200).send({ message: Queue });
      } else {
        return res.status(400).send({ message: "restaurant is closed" });
      }
    } else {
      return res.status(400).send({ message: "restaurant is not active" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
async function checkInLine(req, res) {
  try {
    const { client_Id } = req.body;
    const pool = await poolPromise;
    let data = await pool
      .request()
      .query(
        "SELECT TOP (1000) * FROM dbo.tblQueue where status=0  order by  createdDate  ASC"
      );
    let id = data["recordset"].map((recordset) => recordset.client_id);
    let allId = [];
    let ID1 = allId.push(id);
    console.log(allId);
    let getLine = allId[0].indexOf(client_Id);
    console.log(getLine);
    return res.status(200).json({
      message: "success",
      line: getLine,
      yourData: allId,
      sucess: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: {},
    });
  }
}

const Addqueue = async (req, res) => {
  try {
    let {
      chairs,
      note,
      clientId,
      tablePosition,
      tagId,
      subTagId,
      client,
      userId,
      restId,
    } = req.body;
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

    const pool = await poolPromise;
    let query = `INSERT into [tblQueue](rest_id, maxGroup, minmumGroup, note, client_id, createdDate, position, QueueTagID, QueueSubTagID, status, createdUser,channel) VALUES('${restId}', '${chairs}', '${chairs}', '${note}', '${clientId}','${date}', '${tablePosition}', '${tagId}', '${subTagId}', '${
      QueueStatus.Queued
    }', '${userId}' ,'${0}');`;

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
const getQueue = async (req, res) => {
  try {
    const id = req.body.branch_id;
    console.log(id);
    let outsideData = [];
    let insideData = [];

    const insideResult = await poolPromise
      .then((response) =>
        response.query(
          `SELECT * FROM [dbo].[tblQueue] WITH(NOLOCK) WHERE rest_id='${id}' and (status=0 or status=1 or status=6  or status=7) and (position='${TablePositions.inside}' or position='${TablePositions.any}') order by insidePosition;`
        )
      )
      .catch((error) => res.status(400).json({ error: error.message }));
    const outsideResult = await poolPromise
      .then((response) =>
        response.query(
          `SELECT * from [dbo].[tblQueue] WITH(NOLOCK) WHERE rest_id='${id}' and (status=0 or status=1 or status=6  or status=7) and (position='${TablePositions.outside}' or position='${TablePositions.any}') order by insidePosition;`
        )
      )
      .catch((error) => res.status(400).json({ error: error.message }));

    if (insideResult.recordset.length > 0) {
      for (let i = 0; i < insideResult.recordset.length; i++) {
        let queueData = insideResult.recordset[i];
        let data = {};
        data.id = queueData["id"];
        data.restID = queueData["rest_id"];
        data.clientID = queueData["client_id"];
        data.createdDate = queueData["createdDate"];
        data.minmumGroupId = queueData["minmumGroup"];
        data.maxGroupId = queueData["maxGroup"];
        data.minmumTime = queueData["minmumTime"];
        data.maxTime = queueData["maxTime"];
        data.status = queueData["status"];
        data.requeuedTemp = queueData["requeuedTemp"];
        data.firstQueue = queueData["firstQueue"];
        data.note = queueData["note"];
        if (queueData["channel"]) data.Channel = queueData["channel"];
        if (queueData["InitTurn"]) data.InitTurn = queueData["InitTurn"];
        if (queueData["SeatedTurn"]) data.SeatedTurn = queueData["SeatedTurn"];
        if (queueData["notifyDate"]) data.NotifyDate = queueData["notifyDate"];
        if (queueData["holdDate"]) data.holdDate = queueData["holdDate"];
        if (
          data.status === QueueStatus.Rest_Canceled ||
          data.status === QueueStatus.Closed ||
          data.status === QueueStatus.Rest_ReQueued
        ) {
          if (queueData["checkoutUser"]) {
            checkoutUser = queueData["checkoutUser"];
          }
        }

        if (queueData["checkoutDate"])
          data.checkOutdate = queueData["checkoutDate"];

        data.createdUser = queueData["createdUser"];
        data.position = queueData["position"];
        data.queueNumber = queueData["queueNumber"];
        data.expectedDate = queueData["expectedDate"];

        data.insidePosition = queueData["insidePosition"];
        data.outsidePosition = queueData["outsidePosition"];
        data.selectedPosition = queueData["selectedPosition"];
        data.selectedqNumber = queueData["selectedqNumber"];
        if (queueData["isCheckedIn"]) {
          data.isCheckedIn = queueData["isCheckedIn"];
          if (data.isCheckedIn) {
            if (queueData["checkedInDate"])
              data.checkedInDate = queueData["checkedInDate"];
          }
        }
        if (queueData["isCalled"]) data.isCalled = queueData["isCalled"];

        if (queueData["callDate"]) data.callDate = queueData["callDate"];

        callStatus = queueData["callStatus"];

        if (queueData["type"]) data.type = queueData["type"];

        if (data.position === TablePositions.any) {
          data.isAny = true;
        }

        if (queueData["clientRequeue"])
          data.ClientRequeue = queueData["clientRequeue"];

        data.ClientNote = queueData["clientNote"];

        if (queueData["cancelationReason"])
          data.CancelationReason = queueData["cancelationReason"];

        if (queueData["QueueTagID"] > 0) {
          data.QueueTag = await getTagByID(queueData["QueueTagID"]);
        }
        if (queueData["QueueSubTagID"] > 0) {
          data.QueueSubTag = await getTagByID(queueData["QueueSubTagID"]);
        }
        if (queueData.client_id > 0) {
          let clientInfo = await fetchClientInfoById(queueData.client_id);
          if (clientInfo) {
            data.client = clientInfo;
          }
        }

        insideData.push(data);
      }
    }
    if (outsideResult.recordset.length > 0) {
      for (let i = 0; i < outsideResult.recordset.length; i++) {
        let queueData = outsideResult.recordset[i];
        let data = {};
        data.id = queueData["id"];
        data.restID = queueData["rest_id"];
        data.clientID = queueData["client_id"];
        data.createdDate = queueData["createdDate"];
        data.minmumGroupId = queueData["minmumGroup"];
        data.maxGroupId = queueData["maxGroup"];
        data.minmumTime = queueData["minmumTime"];
        data.maxTime = queueData["maxTime"];
        data.status = queueData["status"];
        data.requeuedTemp = queueData["requeuedTemp"];
        data.firstQueue = queueData["firstQueue"];
        data.note = queueData["note"];
        if (queueData["channel"]) data.Channel = queueData["channel"];
        if (queueData["InitTurn"]) data.InitTurn = queueData["InitTurn"];
        if (queueData["SeatedTurn"]) data.SeatedTurn = queueData["SeatedTurn"];
        if (queueData["notifyDate"]) data.NotifyDate = queueData["notifyDate"];
        if (queueData["holdDate"]) data.holdDate = queueData["holdDate"];
        if (
          data.status === QueueStatus.Rest_Canceled ||
          data.status === QueueStatus.Closed ||
          data.status === QueueStatus.Rest_ReQueued
        ) {
          if (queueData["checkoutUser"]) {
            checkoutUser = queueData["checkoutUser"];
          }
        }

        if (queueData["checkoutDate"])
          data.checkOutdate = queueData["checkoutDate"];

        data.createdUser = queueData["createdUser"];
        data.position = queueData["position"];
        data.queueNumber = queueData["queueNumber"];
        data.expectedDate = queueData["expectedDate"];

        data.insidePosition = queueData["insidePosition"];
        data.outsidePosition = queueData["outsidePosition"];
        data.selectedPosition = queueData["selectedPosition"];
        data.selectedqNumber = queueData["selectedqNumber"];
        if (queueData["isCheckedIn"]) {
          data.isCheckedIn = queueData["isCheckedIn"];
          if (data.isCheckedIn) {
            if (queueData["checkedInDate"])
              data.checkedInDate = queueData["checkedInDate"];
          }
        }
        if (queueData["isCalled"]) data.isCalled = queueData["isCalled"];

        if (queueData["callDate"]) data.callDate = queueData["callDate"];

        callStatus = queueData["callStatus"];

        if (queueData["type"]) data.type = queueData["type"];

        if (data.position === TablePositions.any) {
          data.isAny === true;
        }
        if (queueData["clientRequeue"])
          data.ClientRequeue = queueData["clientRequeue"];

        data.ClientNote = queueData["clientNote"];

        if (queueData["cancelationReason"])
          data.CancelationReason = queueData["cancelationReason"];

        if (queueData["QueueTagID"] > 0) {
          data.QueueTag = await getTagByID(queueData["QueueTagID"]);
        }
        if (queueData["QueueSubTagID"] > 0) {
          data.QueueSubTag = await getTagByID(queueData["QueueSubTagID"]);
        }
        if (queueData.client_id > 0) {
          let clientInfo = await fetchClientInfoById(queueData.client_id);
          if (clientInfo) {
            data.client = clientInfo;
          }
        }

        outsideData.push(data);
      }
    }

    return res.status(200).json({
      message: "success",
      success: true,
      data: {
        inside: insideData.length,
        outside: outsideData.length,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
      data: {
        inside: [],
        outside: [],
      },
    });
  }
};

module.exports = { getInlineKiosk, getQueue, Addqueue, checkInLine };
