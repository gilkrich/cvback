const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const cvRoutes = require("./routes/cv");
require("dotenv").config();
const cors = require("cors");
// const corsOptions = {
//     origin : "https://cvconnect.netlify.app",
//     optionsSuccess :200
//   }
  
  app.use(cors());
    // app.use(cors(corsOptions));


mongoose
  .connect(
    "mongodb+srv://gilcvmanager:VciiK5TEP3CHe8J7@cvcluster.zcc47zx.mongodb.net/?retryWrites=true&w=majority",
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
  


