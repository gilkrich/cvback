const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const cvRoutes = require("./routes/cv");
require("dotenv").config();
const cors = require("cors");
app.use(cors());


mongoose
  .connect(
    'mongodb+srv://gilcvmanager:gil951753@cvcluster.zcc47zx.mongodb.net/?retryWrites=true&w=majority',
    {}
  )
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.log("Unable to connect to MongoDB Atlas");
    console.error(err);
  });

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });
  
  app.use(bodyParser.json());

  app.use("/users", authRoutes);

  app.use("/cv", cvRoutes);

  app.listen(3007, () => {
    console.log("Server running on port 3007");
  });
  


