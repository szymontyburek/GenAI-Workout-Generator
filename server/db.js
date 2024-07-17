const mongoose = require("mongoose");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const getConnection = async function () {
  return new MongoClient(process.env.MONGODB_CONNECTION, {
    ssl: true,
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

const getRecords = async function (monthStr) {
  let records;
  let success;
  let connection;

  try {
    connection = await getConnection();
    const collection = await getCollection(connection);
    const [month, year] = monthStr.split("-");
    const startDate = new Date(`${year}-${month}-01T00:00:00Z`);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1); // Set to the first day of the next month
    const findQuery = monthStr
      ? {
          dateCreated: {
            $gte: startDate,
            $lt: endDate,
          },
        }
      : {};

    records = await collection.find(findQuery).toArray();
    success = true;
  } catch (err) {
    console.log(err);
    success = false;
  } finally {
    connection.close();
  }
  return {
    message: records,
    success: success,
  };
};

const getDates = async function () {
  let distinctDates = [];
  let connection;

  try {
    connection = await getConnection();
    const collection = await getCollection(connection);
    let distinctDatesTmp = await collection
      .aggregate([
        {
          $group: {
            _id: {
              $dateToString: { format: "%m-%Y", date: "$dateCreated" },
            },
          },
        },
        {
          $project: {
            _id: 0,
            month: "$_id",
          },
        },
        {
          $sort: { month: -1 },
        },
      ])
      .toArray();
    for (const obj of distinctDatesTmp) distinctDates.push(obj.month);

    success = true;
  } catch (err) {
    console.log(err);
    success = false;
  } finally {
    connection.close();
  }
  return {
    message: distinctDates,
    success: success,
  };
};

const addRecord = async function (document) {
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
    connection.close();
  }
  return true;
};

module.exports = { addRecord, getDates, getRecords };
