const mongoose = require("mongoose");
require("dotenv").config();

let dbConnection;

module.exports = {
  connectToDb: (cb) => {
    const mongoConnectionString = process.env.MONGO_CONNECTION;
    mongoose.connect(mongoConnectionString).then(() => {
      console.log("success");
    });
  },
  getDb: () => dbConnection,
};
