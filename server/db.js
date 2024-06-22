const mongoose = require("mongoose");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const getConnection = async function () {
  return new MongoClient(process.env.MONGODB_CONNECTION, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
};

const getCollection = async function (connection) {
  await connection.connect();
  return connection.db("ImageGenerator").collection("images");
};

const getRecords = async function () {
  let data;
  let success;
  let connection;

  try {
    connection = await getConnection();
    const collection = await getCollection(connection);
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
  let data;
  let success;
  let connection;

  try {
    connection = await getConnection();
    const collection = await getCollection(connection);
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
