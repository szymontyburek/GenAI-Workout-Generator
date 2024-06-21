const mongoose = require("mongoose");
require("dotenv").config();

module.exports = {
  userModel: mongoose.model(
    "images",
    new mongoose.Schema({
      base64: String,
      description: String,
    })
  ),
  connectToDb: mongoose.connect(process.env.MONGO_CONNECTION).then(() => {
    console.log("Successfully connected to database");
  }),
};
