const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

class Gemini {
  constructor() {
    this.response = null;
  }

  async run(body) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = body;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    this.response = text;
  }
}

module.exports = Gemini;
