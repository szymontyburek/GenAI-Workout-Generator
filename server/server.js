const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();
const PORT = 8080;

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
