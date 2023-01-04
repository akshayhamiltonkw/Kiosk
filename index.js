const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());
const auth = require("./routes/authentication");
const queue = require("./routes/queue");
const country = require("./routes/country");
const foodManu = require("./routes/foodManu");
const appSetting = require("./routes/appSetting");
const client = require("./routes/client");

app.use("/kiosk/account", auth);
app.use("/kiosk/client", client);
app.use("/kiosk/country", country);
app.use("/kiosk/setting", appSetting);
app.use("/kiosk/queue", queue);
app.use("/kiosk", foodManu);

const port = process.env.PORT || 5000;

app.listen(process.env.PORT || port, (err) => {
  if (err) console.log("Unable to start the server!");
  else console.log("Server started running on : " + port);
});
