const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
require("dotenv").config();
const cors = require("cors");
const corsOptions = {
    origin : "https://cvconnect.netlify.app",
    optionsSuccess :200
  }
  
  // app.use(cors());
    app.use(cors(corsOptions));


mongoose
  .connect(
    'mongodb+srv://fitfinder:fitfinder123@fitfinder.ut2uirp.mongodb.net/?retryWrites=true&w=majority',
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


  app.listen(3003, () => {
    console.log("Server running on port 3003");
  });
  


