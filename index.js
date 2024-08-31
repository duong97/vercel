const express = require('express');
const bodyParser = require('body-parser');
const {query} = require("express");

const app = express();
const port = process.env.PORT || 3000;

const TELEGRAM_API = `https://api.telegram.org/bot6748805683:AAFHHYURGZmyCRVoNPEAnoW-_woBr-Qlfcg`;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.statusCode = 200;
  const msg = 'Hello Node!\n'
  res.end(msg);
});

// Handle incoming webhook requests
app.post('/webhook', (req, res) => {
  const message = req.body.message;
  if (message) {
    const chatId = message.chat.id;
    const text = message.text;

    // Echo the received message back to the user
    sendMessage(chatId, `You said: ${text}`);
  } else {
    sendMessage('-4045813885', 'no oke');
  }

  sendMessage('-4045813885', JSON.stringify(message));
  // res.sendStatus(200); // Respond with a 200 status code
  res.status(200).send({
    result: 'Hello Node!',
  }); // Respond with a 200 status code
});

// Function to send a message to a Telegram chat
function sendMessage(chatId, text) {
  fetch(`${TELEGRAM_API}/sendMessage?` + new URLSearchParams({chat_id: chatId, text: text}).toString()).then(r => {
    // console.log(r);
  });
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
