const { Client, LocalAuth } = require("whatsapp-web.js");
const Gemini = require("./src/gemini");
const qrcode = require("qrcode-terminal");
require("dotenv").config();

const client = new Client({
  webVersionCache: {
    type: "remote",
    remotePath:
      "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
  },
  authStrategy: new LocalAuth(),
});

const gemini = new Gemini();

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message", async (message) => {
  if (message.body.toLowerCase().includes("gemini")) {
    await gemini.run(message.body);
    message.reply(gemini.response);
  }
});

client.initialize();
