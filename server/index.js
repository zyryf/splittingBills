const mongoConfig = require("./config/mongoDB");

// routes
const users = require("./routes/api/Users");
const login = require("./routes/api/Login");
const groups = require("./routes/api/Groups");

// packages
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// setting up port
const port = process.env.PORT || 5000;

// conntect to MongoDB
// in production hide pass and login with dotenv npm package
const url = mongoConfig.url;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection
  .once("open", () => {
    console.log("CONNECTED TO DB!");
  })
  .on("error", (err) => {
    console.log(`ERROR: ${err}`);
  });

if (process.env.NODE_ENV === "production") {
  //static folder
  app.use(express.static(__dirname + "/public/"));
  //  handle SPA (single page app)
  app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

app.use("/api/users", users);
app.use("/api/login", login);
app.use("/api/groups", groups);

app.listen(port, () => {
  console.log(`server started on port ${port}
  ----------------------`);
});
