const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
require('dotenv').config();

app.use(cors());

mongoose
  .connect(`mongodb+srv://mido:${process.env.MONGO_PASSWORD}@cluster0.1suzkrt.mongodb.net/test`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch(console.error);

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(PORT, () => console.log("Server run on port " + PORT));
