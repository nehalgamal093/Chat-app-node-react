const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes.js");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/api/auth", userRoutes);
mongoose
  .connect("mongodb://127.0.0.1:27017/chat", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("🐱 DB Connection successfully");
  })
  .catch((err) => {
    console.log(err.message);
  });

const server = app.listen(5000, () => {
  console.log(`🌻 Server started at port 5000`);
});
