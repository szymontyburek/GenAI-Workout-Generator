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

const getRecords = async function (dateStr) {
  let records;
  let success;
  let connection;

  try {
    connection = await getConnection();
    const collection = await getCollection(connection);

    const findQuery = dateStr ? { dateCreated: new Date(dateStr) } : {};

    records = await collection.find().toArray();

    success = true;
  } catch (err) {
    console.log(err);
    success = false;
  } finally {
    await connection.close();
  }
  return {
    message: records,
    success: success,
  };
};

const getDates = async function () {
  let distinctDates = [];
  let success;
  let connection;

  try {
    connection = await getConnection();
    const collection = await getCollection(connection);

    let distinctDatesTmp = await collection
      .aggregate([
        { $group: { _id: "$dateCreated" } },
        { $project: { _id: 0, dateCreated: "$_id" } },
        { $sort: { dateCreated: -1 } },
      ])
      .toArray();
    for (const obj of distinctDatesTmp) {
      distinctDates.push(obj.dateCreated.toISOString().split("T")[0]);
    }

    success = true;
  } catch (err) {
    console.log(err);
    success = false;
  } finally {
    await connection.close();
  }
  return {
    message: distinctDates,
    success: success,
  };
};

const addRecord = async function (document) {
  let success;
  let connection;

  try {
    connection = await getConnection();
    const collection = await getCollection(connection);
    const result = await collection.insertOne(document);
    success = true;
  } catch (err) {
    console.log(err);
    success = false;
  } finally {
    await connection.close();
  }
  return true;
};

module.exports = { addRecord, getDates, getRecords };
