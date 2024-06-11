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
  let url;
  let success = false;
  let openaiResponse;
  try {
    const { message } = req.query;
    openaiResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt: message,
      n: 1,
      size: "1024x1024",
    });

    let image = await axios.get(openaiResponse.data[0].url, {
      responseType: "arraybuffer",
    });

    url =
      "data:image/png;base64, " + Buffer.from(image.data).toString("base64");
    success = true;
  } catch (err) {
    url = "Error. Image could not be generated. Please try again.";
    console.log(err);
  } finally {
    res.json({
      success: success,
      url: url,
    });
  }
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
