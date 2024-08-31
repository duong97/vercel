const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
const TELEGRAM_API_KEY = process.env.TELEGRAM_API_KEY;
const TELEGRAM_API = `https://api.telegram.org/bot` + TELEGRAM_API_KEY;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.statusCode = 200;
    const msg = 'Telegram bot command is working!!\n'
    res.end(msg);
});

// Handle incoming webhook requests
app.post('/webhook', (req, res) => {
    const message = req.body.message;
    if (message) {
        const chatId = message.chat.id;
        const text = message.text;

        // Echo the received message back to the user
        let msg = 'Default message';
        if (text.startsWith('/help')) {
            msg = "List command available:\n\n";
            msg += "```command\n\\help: show list command!\n```";
        } else if (text.startsWith('/')) {
            msg = "Unknown command\\!\n";
        }
        sendMessage(chatId, msg);
    }

    res.status(200).send({
        result: 'Success',
    }); // Respond with a 200 status code
});

// Function to send a message to a Telegram chat
function sendMessage(chat_id, text) {
    let api_path = `${TELEGRAM_API}/sendMessage?`;
    api_path += new URLSearchParams({
        parse_mode: 'MarkdownV2',
        chat_id,
        text
    }).toString()
    console.log(api_path);
    fetch(api_path).then(r => {
        // console.log(r);
    });
}

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
