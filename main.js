const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const client = new Client({
  webVersionCache: {
    type: "remote",
    remotePath:
      "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
  },
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message_create", (message) => {
  console.log(message.body);
  if (message.from === "557598263520@c.us") {
    if (message.body === "oi" || message.body === "Oi") {
      message.reply("oi, tudo bem?");
    }
  }
  if (message.body === "!ping") {
    message.reply("pong");
  }
});

client.initialize();
