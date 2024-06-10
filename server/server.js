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
  res.json({ message: await callToOpenAI(message) });
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function callToOpenAI(message) {
  let response;
  const chatCompletion = await openai.chat.completions
    .create({
      messages: [{ role: "user", content: message }],
      model: "gpt-3.5-turbo",
    })
    .then((res) => {
      response = res.choices[0].message.content;
    });

  return response;
}
