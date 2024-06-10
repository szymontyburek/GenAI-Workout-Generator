require("dotenv").config();
const OpenAI = require("openai");
const app = require("express")();
const cors = require("cors");
const port = 8080;

app.use(cors());

app.listen(port, () => {
  console.log("Server is running on port " + port);
});

app.get("/generateImage", async (req, res) => {
  const { message } = req.query;
  res.json({
    message: await openai.images.generate({
      model: "dall-e-3",
      prompt: message,
      n: 1,
      size: "1024x1024",
    }),
  }).data[0].url;
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
