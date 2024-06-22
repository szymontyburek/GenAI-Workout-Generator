const mongoose = require("mongoose");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

module.exports = {
  getData: async function () {
    const connection = new MongoClient(process.env.MONGODB_CONNECTION, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    let data;
    try {
      await connection.connect();
      const collection = connection.db("ImageGenerator").collection("images");
      data = await collection.find().toArray();
    } catch (err) {
      console.log(err);
    } finally {
      await connection.close();
    }
    return data;
  },
};
