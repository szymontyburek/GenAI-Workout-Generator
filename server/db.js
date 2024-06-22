const mongoose = require("mongoose");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

module.exports = {
  getRecords: async function () {
    const connection = new MongoClient(process.env.MONGODB_CONNECTION, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    let data;
    let success;

    try {
      await connection.connect();
      const collection = connection.db("ImageGenerator").collection("images");
      data = await collection.find().toArray();
      success = true;
    } catch (err) {
      console.log(err);
      success = false;
    } finally {
      await connection.close();
    }
    return { message: data, success: success };
  },
  addRecord: async function addRecord(fieldDataObj) {
    try {
    } catch (err) {
      return false;
    }
    return true;
  },
};
