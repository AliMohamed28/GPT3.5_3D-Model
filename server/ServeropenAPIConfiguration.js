import express, { json } from "express";
import { Configuration, OpenAIApi } from "openai";
import cors from "cors";

const app = express();
const port = 4000;

const configuration = new Configuration({
  apiKey: "",
});
const openai = new OpenAIApi(configuration);

app.use(json());

app.use(
  cors({
    origin: "*",
  })
);

app.post("/chat", async (req, res) => {
  const { userInput } = req.body;

  const completion = await openai.createCompletion({
    model: "Your Model here", //eg text-davinci-003
    prompt: userInput,
  });

  const botResponse = completion.data.choices[0].text;
  console.log(completion.data.choices[0].text);
  res.send({ botResponse });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
