const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 7000;
const bodyParser = require("body-parser");
const cors = require("cors");

const connectDatabse = require("./database");
connectDatabse();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const companyRoutes = require("./routes/companyRoute");
app.use("/api", companyRoutes);
app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});
app.listen(port || 3000, () => {
  console.log(`Server is running on ${port}`);
});

module.exports = app;
