const express = require("express");
const app = express();
const path =require('path')
var cors = require('cors')
const port = 3000;
const scrapRouter = require("./routes/scrapRoutes");
const dbconnect = require("./config/dbConnect");
app.use(cors())
const { Errorhandler } = require("./middleWares/errorHandler");
require("dotenv").config();
dbconnect();
app.use(express.json());

app.use("/", scrapRouter);
app.use(Errorhandler);
app.use(express.static(path.join(__dirname,"public")))

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
