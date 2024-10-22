const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const ruleRoutes = require("./routes/ruleRoutes");
const connectDB = require("./config/db");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/rules", ruleRoutes);

app.use(require("./utils/errorHandler"));

connectDB();

module.exports = app;
