require("dotenv").config();
const OpenAI = require("openai");
const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const { getData, addRecord } = require("./db");
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
  let imgData;

  try {
    const description = req.body.params.message;
    openaiResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt: description,
      n: 1,
      size: "1024x1024",
    });

    let image = await axios.get(openaiResponse.data[0].url, {
      responseType: "arraybuffer",
    });
    message =
      "data:image/png;base64, " + Buffer.from(image.data).toString("base64");

    imgData = {
      description: description,
      base64: message,
      dateCreated: new Date(),
    };

    await addRecord(imgData);

    success = true;
  } catch (err) {
    message = "Error. Image could not be generated. Please try again.";
    console.log("ERROR: " + err);
  } finally {
    res.json({
      success: success,
      message: imgData,
    });
  }
});

app.get("/getData", async (req, res) => {
  const response = await getData(req.query.date);
  res.json(response);
});

module.exports = { app: app };
