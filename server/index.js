const path = require("path");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();
const serverPort = 4000;
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));

app.get("/", (req, res) => {
  res.json({ status: 200, message: `Server running on port ${serverPort}` });
});

app.use(require("./routes"));

app.listen(serverPort, () => {
  console.log(`Server is running on port ${serverPort}`);
});
