const { getData } = require("./db");

async function getRecords() {
  let data;
  let success;
  try {
    data = await getData();
    success = true;
  } catch (err) {
    console.log(err);
    success = false;
  }
  return { message: data, success: success };
}

module.exports = getRecords;
