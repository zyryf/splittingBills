// routes
const users = require("./routes/api/Users");
const login = require("./routes/api/Login");
const groups = require("./routes/api/Groups");

// packages
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const mongoDB = require("./config/mongoDB");

const app = express();

// middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// setting up port

// conntect to MongoDB
mongoose.connect(mongoDB.url, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection
  .once("open", () => {
    console.log("CONNECTED TO DB!");
  })
  .on("error", (err) => {
    console.log(`ERROR: ${err}`);
  });

app.use("/api/users", users);
app.use("/api/login", login);
app.use("/api/groups", groups);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server started on port ${port}
  ----------------------`);
});
