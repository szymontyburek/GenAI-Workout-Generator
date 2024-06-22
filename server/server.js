require("dotenv").config();
const OpenAI = require("openai");
const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const { getData, userModel } = require("./db");
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});

app.post("/addRecord", async (req, res) => {
  let message;
  let success = false;
  let openaiResponse;
  try {
    openaiResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt: req.body.params.message,
      n: 1,
      size: "1024x1024",
    });

    let image = await axios.get(openaiResponse.data[0].url, {
      responseType: "arraybuffer",
    });

    message =
      "data:image/png;base64, " + Buffer.from(image.data).toString("base64");
    success = true;
  } catch (err) {
    message = "Error. Image could not be generated. Please try again.";
    console.log("ERROR: " + err);
  } finally {
    res.json({
      success: success,
      message: message,
    });
  }
});

app.get("/getRecords", async (req, res) => {
  let data;
  let success;
  try {
    data = await getData();
    success = true;
  } catch (err) {
    console.log(err);
    success = false;
  }
  res.json({ message: data, success: success });
});
