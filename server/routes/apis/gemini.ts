import { Router } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const router = Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

router.get("/reddit", async (req, res) => {
  //   const { niche, template } = req.body;
  // console.log(process.env.GEMINI_API_KEY!);
  const prompt = `Can you fetch a random reddit post? And respond only with the url`;

  try {
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    res.send({ message: result.response.text() });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error creating content. Please try again." });
  }
});

router.post("/generate-textcontent", async (req, res) => {
    const { prompt } = req.body;

    var newprompt = prompt;
    if(!prompt || prompt === "" ){
      newprompt = "Create a simple poem";
    }
  try {
    const result = await model.generateContent(newprompt);
    console.log(result.response.text());
    res.json({ textcontent: result.response.text() });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ textcontent: "Error creating content. Please try again." });
  }
});

router.post("/generate-quote", async (req, res) => {
  const prompt = `Suggest a quote by an author. Respond only with the quote and the author nothing else. They should be separated by a dash. Example: Some Quote - Author. Exactly like that nothing else more, don't put the quote in quotation marks, dont add a line before the name of the author, just the quote and author separated by a dash.`;

  try {
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    const data = result.response.text().split(' - ');
    const quote = data[0];
    const author = data[1].replaceAll('\n', "");
    res.json({ quote: quote, author: author });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error creating content. Please try again." });
  }
});

router.post("/generate-story", async (req, res) => {
  const { prompt, genres } = req.body;

  let newprompt = "";

  if (prompt && genres) {
    newprompt = `${prompt}. Genres: ${genres}`;
  } else if (prompt && !genres) {
    newprompt = prompt;
  } else if (!prompt && genres) {
    newprompt = `Create a story using the following genres: ${genres}`;
  } 

  try {
    const result = await model.generateContent(newprompt);
    const text = result.response.text();
    console.log(text);
    res.json({ story: text });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ textcontent: "Error creating story. Please try again." });
  }
});


export default router;
