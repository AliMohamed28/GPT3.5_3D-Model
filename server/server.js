import express, { json } from "express";
import cors from "cors";

const app = express();
const port = 4000;

app.use(json());

app.use(
  cors({
    origin: "*",
  })
);

app.post("/chat", (req, res) => {
  // const { userInput } = req.body;

  // Instead of connecting to the OpenAI API, respond with "Hello World"
  const botResponse =
    "Hello world! I am an experiment created by Ali to explore the customization of bots and their voices. I was built using the OpenAI API.";

  console.log(botResponse);
  res.send({ botResponse });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
