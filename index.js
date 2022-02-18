"use strict";

import fetch from 'node-fetch';
import express from 'express';
import ngrok from 'ngrok';

const applicationKey = '<APPLICATION_KEY>';
const applicationSecret = '<APPLICATION_SECRET>';

const PORT = 3000;

const app = express();
app.use(express.json());

app.post('/incoming-call', async (req, res) => {
  let svamlResponse = {
    instructions: [
      {
        name: "say",
        text: "Hi, thank you for calling your Sinch number. Congratulations! You just responded to a phone call.",
        locale: "en-US"
      }
    ],
    action: {
      name: "hangup"
    }
  };

  res.json(svamlResponse);
});

app.listen(PORT, async () => {
  const url = await ngrok.connect(PORT);
  console.log(`Node.js local server is publicly-accessible at ${url}/incoming-call`);
  await updateUrl(url + '/incoming-call');
  console.log("Your callbackURL has been updated on your dashboard.")
  console.log(`Listening at http://localhost:` + PORT);
});

async function updateUrl(callbackUrl) {
  const resp = await fetch(
    `https://callingapi.sinch.com/v1/configuration/callbacks/applications/${applicationKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + Buffer.from(`${applicationKey}:${applicationSecret}`).toString('base64')
      },
      body: {
        url: [
          {
            primary: callbackUrl
          }
        ]
      }
    }
  );

  const data = await resp.json();
  console.log(data);
}
