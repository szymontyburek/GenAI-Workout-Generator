const mongoose = require("mongoose");
require("dotenv").config();

let dbConnection;

const generatedImagesSchema = new mongoose.Schema({
  base64: String,
  dateCreated: Date,
  userId: String,
  description: String,
});

const generatedImagesModel = mongoose.model(
  "generatedImages",
  generatedImagesSchema
);

module.exports = {
  connectToDb: (cb) => {
    const mongoConnectionString = process.env.MONGO_CONNECTION;
    mongoose.connect(mongoConnectionString).then(() => {
      console.log("Successfully connected to database");
    });
  },
  getModel: () => generatedImagesModel,
  getSchema: () => generatedImagesSchema,
};
