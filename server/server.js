require("dotenv").config();
const OpenAI = require("openai");
const app = require("express")();
const cors = require("cors");
const axios = require("axios");
const port = 8080;

app.use(cors());

app.listen(port, () => {
  console.log("Server is running on port " + port);
});

app.get("/generateImage", async (req, res) => {
  // const { message } = req.query;
  // const resp = await openai.images.generate({
  //   model: "dall-e-3",
  //   prompt: message,
  //   n: 1,
  //   size: "1024x1024",
  // });

  //resp.data[0].url
  try {
    // Fetch the image from the URL
    const imageResponse = await axios.get(
      "https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png",
      {
        responseType: "arraybuffer",
      }
    );

    // Convert image content to base64
    const imageBase64 = Buffer.from(imageResponse.data, "binary").toString(
      "base64"
    );
    console.log(imageBase64);

    // res.json({
    //   url: imageBase64,
    // });
  } catch (err) {
    console.log(err);
  }
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
