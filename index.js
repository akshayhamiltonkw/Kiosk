const express = require("express");
const cors = require("cors");
require("dotenv").config();
const auth = require("./routes/authentication");
const queue = require("./routes/queue");
const country = require("./routes/country");
const foodManu = require("./routes/foodManu");
const appSetting = require("./routes/appSetting");
const bodyParser = require("body-parser");
const GetCustomerAndQueue = require("./routes/GetCustomerByPhone");
const getTableGroups = require("./routes/getTableGroups");
const createUniqID = require("./routes/createUniqID");
const getRestaurantStatistic = require("./routes/getRestaurantStatistic");
const fileUpload = require("express-fileupload");

const app = express();
app.use(fileUpload());
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/kiosk/account", auth);
app.use("/kiosk/country", country);
app.use("/kiosk/setting", appSetting);
app.use("/kiosk/queue", queue);
app.use("/kiosk", foodManu);
app.use("/kiosk", GetCustomerAndQueue);
app.use("/kiosk", getTableGroups);
app.use("/kiosk", createUniqID);
app.use("/kiosk", getRestaurantStatistic);

const port = process.env.PORT || 5000;

app.listen(process.env.PORT || port, (err) => {
  if (err) console.log("Unable to start the server!");
  else console.log("Server started running on : " + port);
});
