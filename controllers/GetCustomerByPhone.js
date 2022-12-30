const db = require("../database");

const GetCustomerByPhone = async (req, res) => {
  const { phone, countryId } = req.query;

  if (!phone && !countryId)
    return res
      .status(400)
      .send({ message: "Invalid phone or country credentials " });
  const pool = await db.poolPromise;
  const client = await pool
    .request()
    .query(
      `SELECT * FROM [dbo].[tblClient] WHERE client_phone='${phone}' and country='${countryId}';`
    );
  console.log(client["recordset"][0].client_phone);
  const country = await pool
    .request()
    .query(
      `SELECT * FROM [dbo].[tblCountries] WHERE country_id='${countryId}';`
    );

  console.log(country["recordset"][0].country_name);

  res.status(200).send({
    ErrorCode: 200,
    Message: "",
    Success: true,
    Title: "",
    AccessToken: "",
    Customer: {
      Id: -1,
      // AccessFullQueue: client["recordset"][0].activationStep,
      ActivationStep: client["recordset"][0].activationStep,
      AddedFreeQueue: client["recordset"][0].AddedFreeQueue,
      Avatar: client["recordset"][0].avatar,
      //AvatarFullPath:0,
      CountryObj: {
        Id: 1,
        FlagFullPath: country["recordset"][0].flag,
        Length: country["recordset"][0].length,
        Prefix: country["recordset"][0].Prefix,
        //  PrefixList: country['recordset'][0].Prefix,
        RestActive: country["recordset"][0].restActive,
        //ShortCode: country['recordset'][0].country_name,
        code: country["recordset"][0].country_code,
        currency: country["recordset"][0].country_curancy,
        flag: country["recordset"][0].country_name,
        id: 1,
        isActive: true,
        name: country["recordset"][0].country_name,
        nameAR: country["recordset"][0].country_name_ar,
      },
      FreeQueue: 0,
      LoginPassword: client["recordset"][0].LoginPassword,
      RealTimeChannel: client["recordset"][0].realTimeChannel,
      Subscription: client["recordset"][0].subscription,
      SubscriptionExpired: false,
      SubscriptionExpiredOn: client["recordset"][0].subscriptionExpiredOn,
      TotalQueue: client["recordset"][0].totalQueue,
      WalletBalance: client["recordset"][0].walletBalance,
      birthDate: "",
      cId: 1303295,
      cerDate: "1643827873",
      country: 1,
      createdDate: "/Date(1643827873000+0000)/",
      createdMethod: 1,
      deviceType: 0,
      gender: 0,
      hasApp: client["recordset"][0].hasApp,
      id: 1303295,
      isActive: true,
      lastSeen: client["recordset"][0].lastSeen,
      latitude: client["recordset"][0].latitude,
      longitude: client["recordset"][0].longitude,
      mail: client["recordset"][0].mail,
      name: client["recordset"][0].client_name,
      password: client["recordset"][0].password,
      phone: client["recordset"][0].client_phone,
      points: 0,
      restId: 34,
      savedMinutes: 0,
      userId: 66,
    },
  });
};

const GetQueueByPhoneAndRest = async (req, res) => {
  const { phone, restId } = req.query;

  if (!phone && !restId)
    return res
      .status(400)
      .send({ message: "Invalid phone or country credentials " });
  const pool = await db.poolPromise;
  const client = await pool
    .request()
    .query(
      `SELECT * FROM [dbo].[tblClient] WHERE client_phone='${phone}' and restId='${restId}';`
    );
  let clientId = client["recordset"][0].client_id;
  console.log(client);
  const queue = await pool
    .request()
    .query(
      `SELECT * FROM [dbo].[tblQueue] WHERE   rest_id='${restId}' and client_id='${clientId}';`
    );
  console.log(queue);
  // let countryId=client["recordset"][0].country
  // const country = await pool
  // .request()
  // .query(
  //   `SELECT * FROM [dbo].[tblCountries] WHERE country_id='${countryId}';`
  // );

  // const restaurant = await pool
  // .request()
  // .query(
  //   `SELECT * FROM [dbo].[tblRestaurants] WHERE country_id='${countryId}';`
  // );
  // const QueueTag = await pool
  // .request()
  // .query(
  //   `SELECT * FROM [dbo].[tblQueueTags] WHERE country_id='${countryId}';`
  // );

  // const autoRequest = await pool
  // .request()
  // .query(
  //   `SELECT * FROM [dbo].[tblAutoRequests] WHERE country_id='${countryId}';`
  // );

  // const tablesGroup = await pool
  // .request()
  // .query(
  //   `SELECT * FROM [dbo].[tblTablesGroup] WHERE country_id='${countryId}';`);

  //   console.log(country["recordset"][0])
  //   console.log(restaurant["recordset"][0])
  // console.log(QueueTag["recordset"][0])
  //  console.log ( autoRequest["recordset"][0])
  // console.log(queue["recordset"][0]);

  //  res.status(200).send({
  //     ErrorCode: 200,
  //     Message: "",
  //     Success: false,
  //     Title: "",
  //     Queue: {
  //       //[dbo].[tblQueue]
  //       Id: queue["recordset"][0].id,
  //       AreaName:queue["recordset"][0].AreaName,
  //       AreaNameAr:queue["recordset"][0].AreaNameAr,
  //       AutoActionRequest: {
  //         //[dbo].[tblAutoRequests]
  //         Id: autoRequest["recordset"][0].id,
  //         Action: autoRequest["recordset"][0].action,
  //         Channel:autoRequest["recordset"][0].channel ,
  //         CreatedDate: autoRequest["recordset"][0].createdDate,
  //         ExecuteDate:autoRequest["recordset"][0].executeDate,
  //         QID: autoRequest["recordset"][0].qID,
  //         RestID: autoRequest["recordset"][0].restID,
  //         //Seconds: 0,
  //        // Status: 0,
  //       },
  //       CancelationReason:queue["recordset"][0].cancelationReason ,
  //       // CancelationReasonAr: "",
  //       // CancelationReasonEn: "",
  //       Category: queue["recordset"][0].category,
  //       Channel: queue["recordset"][0].channel,
  //       ClientNote:queue["recordset"][0].clientNote,
  //       ClientRequeue: queue["recordset"][0].clientRequeue,
  //       // CurrentStatus: 0,
  //       // Distance: 0,
  //       // DistanceString: "--",
  //       HasOrder: queue["recordset"][0].hasOrder,
  //       HoldDateString: queue["recordset"][0].holdDate,
  //       InitTurn: queue["recordset"][0].InitTurn,
  //       // IsHold:0 ,
  //       IsPaid:queue["recordset"][0].IsPaid,
  //       IsPaidFree: queue["recordset"][0].IsPaidFree,
  //       LastSeenString: client["recordset"][0].lastSeen,
  //       LilouCustomNotificationSent:queue["recordset"][0].LilouCustomNotificationSent,
  //       //MoreThanExpected: false,
  //       NotifiyTime:queue["recordset"][0].notifiyTime,
  //       //NotifiyTimeString: "",
  //       NotifyDate: queue["recordset"][0].notifyDate,
  //       // QueueSubTag: {
  //       //   Id: -1,
  //       //   NameAr: "",
  //       //   NameEn: "",
  //       //   Status: false,
  //       // },
  //       //QueueSubTagID: -1,
  //       QueueTag: {
  //         Id: QueueTag["recordset"][0].id,
  //         NameAr:QueueTag["recordset"][0].NameAr,
  //         NameEn: QueueTag["recordset"][0].NameEn,
  //         Status: QueueTag["recordset"][0].Status,
  //       },
  //       QueueTagID: queue["recordset"][0].QueueTagID,
  //       RealTimeChannel:queue["recordset"][0].RealTimeChannel,
  //       SeatedTurn: queue["recordset"][0].SeatedTurn,
  //       ShareStatus: queue["recordset"][0].shareStatus,
  //       // SharedMemberType: 0,
  //       // ShowMenu: false,
  //       // UpgradeCost: 0,
  //       callDate: queue["recordset"][0].callDate,
  //       //callDateString: "",
  //       callStatus: queue["recordset"][0].callStatus,
  //       //checkOutSince: "",
  //       checkOutdate:queue["recordset"][0].checkoutDate,
  //       checkedInDate: queue["recordset"][0].checkedInDate,
  //       checkoutUser: queue["recordset"][0].checkoutUser,
  //       //clientID: -1,
  //       clientObj: {
  //         Id: -1,
  //         //AccessFullQueue: false,
  //         ActivationStep: client["recordset"][0].activationStep,
  //         AddedFreeQueue: client["recordset"][0].AddedFreeQueue,
  //         Avatar: client["recordset"][0].avatar,
  //         AvatarFullPath:"",
  //         CountrtObj: {
  //           FlagFullPath: country["recordset"][0].flag,
  //           Length: country["recordset"][0].length,
  //           Prefix: country["recordset"][0].Prefix,
  //           //  PrefixList: country['recordset'][0].Prefix,
  //           RestActive: country["recordset"][0].restActive,
  //           //ShortCode: country['recordset'][0].country_name,
  //           code: country["recordset"][0].country_code,
  //           currency: country["recordset"][0].country_curancy,
  //           flag: country["recordset"][0].country_name,
  //           //id: 1,
  //           //isActive: true,
  //           name: country["recordset"][0].country_name,
  //           nameAR: country["recordset"][0].country_name_ar,
  //         },
  //         FreeQueue: 0,
  //         LoginPassword:  client["recordset"][0].LoginPassword,
  //         RealTimeChannel:  client["recordset"][0].realTimeChannel,
  //         Subscription:  client["recordset"][0].subscription,
  //         //SubscriptionExpired: false,
  //         SubscriptionExpiredOn: client["recordset"][0].subscriptionExpiredOn,
  //         TotalQueue:  client["recordset"][0].totalQueue,
  //         WalletBalance:  client["recordset"][0].walletBalance,
  //         birthDate:  client["recordset"][0].birthDate,
  //         // cId: -1,
  //         // cerDate: "",
  //         country: client["recordset"][0].country,
  //         createdDate:client["recordset"][0].birthDate ,
  //         createdMethod: client["recordset"][0].createdMethod,
  //        // deviceType: 0,
  //         gender:client["recordset"][0].client_gender,
  //         hasApp: client["recordset"][0].hasApp,
  //         // id: -1,
  //         // isActive: false,
  //         lastSeen:client["recordset"][0].lastSeen,
  //         latitude:client["recordset"][0].latitude,
  //         longitude:client["recordset"][0].longitude,
  //         mail: client["recordset"][0].mail,
  //         name: client["recordset"][0].client_name,
  //         password: client["recordset"][0].password,
  //         phone:client["recordset"][0].client_phone,
  //         points: client["recordset"][0].points,
  //         restId: client["recordset"][0].restId,
  //         savedMinutes:client["recordset"][0].savedTime ,
  //         userId: client["recordset"][0].userId,
  //       },
  //       //countedTime: "",
  //       createdDate: "/Date(1666034611880+0000)/",
  //       //createdUser: -1,
  //       expectedDate:queue["recordset"][0].expectedDate,
  //       firstQueue: queue["recordset"][0].firstQueue,
  //       holdDate: queue["recordset"][0].holdDate,
  //       //id: -1,
  //       insidePosition:  queue["recordset"][0].insidePosition,
  //       //isAny: false,
  //       isCalled:  queue["recordset"][0].isCalled,
  //       isCheckedIn: queue["recordset"][0].isCheckedIn ,
  //      // maxGroupId: -1, which table
  //       maxTime:  queue["recordset"][0].maxTime,

  //       //[dbo].[tblTablesGroup]
  //       minTableGroup: {
  //         gestNumber: tablesGroup['recordset'][0].gestNumber,
  //         id:tablesGroup['recordset'][0].id ,
  //         isActive: tablesGroup['recordset'][0].isActive,
  //         maxTime: tablesGroup['recordset'][0].maxTime,
  //         minimumTime: tablesGroup['recordset'][0].minimumTime,
  //         name: tablesGroup['recordset'][0].name,
  //       },
  //       //minmumGroupId: -1,
  //       minmumTime: queue["recordset"][0].minmumTime,
  //       note: queue["recordset"][0].note,
  //       outsidePosition: queue["recordset"][0].outsidePosition,
  //       position:  queue["recordset"][0].position,
  //       //positionString: "",
  //       queueNumber: queue["recordset"][0].queueNumber,
  //      // reqFrom: 0,
  //       requeuedTemp: queue["recordset"][0].requeuedTemp,
  //       restID: queue["recordset"][0].rest_id,
  //       selectedPosition: queue["recordset"][0].selectedPosition,
  //       //selectedPositionString: "",
  //       selectedqNumber: queue["recordset"][0].selectedqNumber,
  //       status: queue["recordset"][0].status,
  //       type: queue["recordset"][0].type,
  //     },
  //   });
};

module.exports = { GetQueueByPhoneAndRest, GetCustomerByPhone };
