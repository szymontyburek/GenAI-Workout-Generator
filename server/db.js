const mongoose = require("mongoose");
require("dotenv").config();

let dbConnection;

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

module.exports = {
  connectToDb: (cb) => {
    const mongoConnectionString = process.env.MONGO_CONNECTION;
    mongoose.connect(mongoConnectionString).then(() => {
      console.log("Successfully connected to database");
    });
  },
  userModel: () => mongoose.model("users", userSchema),
};
