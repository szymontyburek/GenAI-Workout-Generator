const mongoose = require("mongoose");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const log = function () {
  console.log("lkj");
};

const getRecords = async function () {
  log();
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
};

const addRecord = async function (fieldDataObj) {
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
    const result = await collection.insertOne(fieldDataObj);
    success = true;
  } catch (err) {
    console.log(err);
    success = false;
  } finally {
    await connection.close();
  }
  return true;
};

module.exports = { addRecord, getRecords };
