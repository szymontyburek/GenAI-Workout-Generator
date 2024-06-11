require("dotenv").config();
const OpenAI = require("openai");
const server = require("express")();
const cors = require("cors");
const axios = require("axios");
const port = 8080;

server.use(cors());

server.listen(port, () => {
  console.log("Server is running on port " + port);
});

server.get("/generateImage", async (req, res) => {
  // const { message } = req.query;
  // const resp = await openai.images.generate({
  //   model: "dall-e-3",
  //   prompt: message,
  //   n: 1,
  //   size: "1024x1024",
  // });

  // resp.data[0].url;
  try {
    // Fetch the image from the URL
    const imageResponse = await axios.get(
      "https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png",
      {
        responseType: "arraybuffer",
      }
    );

    res.json({
      url: Buffer.from(imageResponse.data, "binary").toString("base64"),
    });
  } catch (err) {
    console.log(err);
  }
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
