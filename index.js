const restify = require('restify');
const botbuilder = require('botbuilder');

// Create bot adapter, which defines how the bot sends and receives messages.
console.log(`app id: ${process.env.MicrosoftAppId}`);
var adapter = new botbuilder.BotFrameworkAdapter({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

// Create HTTP server.
let server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log(`\n${server.name} listening to ${server.url}`);
    console.log(`\nGet Bot Framework Emulator: https://aka.ms/botframework-emulator`);
});

// Listen for incoming requests at /api/messages.
server.post('/api/messages', (req, res, next) => {
    // Use the adapter to process the incoming web request into a TurnContext object.
    adapter.processActivity(req, res, async (turnContext) => {
        // Do something with this incoming activity!
        if (turnContext.activity.type === 'message') {
          // Get the user's text
          const utterance = turnContext.activity.text;
          console.log(`Received message: ${utterance}`); // Log received message
          // send a reply
          await turnContext.sendActivity(`I heard you say ${utterance}`);
        }
    }).catch((err) => {
        console.error('Error processing request', err);
        res.status(500);
        res.end();
    });
});