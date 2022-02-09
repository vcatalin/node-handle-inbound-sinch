"use strict";

const express = require('express');
const ngrok = require('ngrok');

const PORT = 3000;

const app = express();
app.use(express.json());

app.post('/incoming-call', async (req, res) => {
  let requestBody = req.body;
  let eventName = req.body.event;
  let svamlResponse;
  console.log(requestBody);
  switch (eventName) {
    case 'ice':
      svamlResponse = {
      instructions: [
          {
            name: "say",
            text: "Hi, thank you for calling your Sinch number. Congratulations! You just responded to a phone call.",
            locale: "en-US"
          },
        ],
      action: {
          name: "hangup"
        }
      };
      res.set('Content-Type', 'application/json');
      res.send(JSON.stringify(svamlResponse));
      break;
    case 'dice':
      res.sendStatus(200);
      break;
    default:
      console.log("Sorry, something went wrong.")
      res.sendStatus(404)
  }
});

app.listen(PORT, async () => {
  const url = await ngrok.connect(PORT);
  console.log(`Node.js local server is publicly-accessible at ${url}/incoming-call`);
  console.log(`Please update your Callback URL in the dashboard at https://dashboard.sinch.com/voice/apps`);
  console.log(`Listening at http://localhost:` + PORT);
});
