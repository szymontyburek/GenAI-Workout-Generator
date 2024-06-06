require("dotenv").config();
const OpenAI = require("openai");
const app = require("express")();
const port = 8080;

app.listen(port, () => {
  console.log("Server is running on port " + port);
});

app.get("/", async (req, res) => {
  res.json({ message: await callToOpenAi() });
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function callToOpenAi() {
  let response;
  const chatCompletion = await openai.chat.completions
    .create({
      messages: [{ role: "user", content: "Say this is a dfst" }],
      model: "gpt-3.5-turbo",
    })
    .then((res) => {
      response = res.choices[0].message.content;
    });

  return response;
}
