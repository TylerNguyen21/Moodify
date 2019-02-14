    const Dialogflow = require('dialogflow');
    const Pusher = require('pusher');
    const projectId = 'moodify-9185c';
    const sessionId = '123456';
    const languageCode = 'en-US';
    const spotify = require('./spotify.js')

    const config = {
      credentials: {
        private_key: process.env.DIALOGFLOW_PRIVATE_KEY,
        client_email: process.env.DIALOGFLOW_CLIENT_EMAIL,
      },
    };

    const pusher = new Pusher({
      appId: process.env.PUSHER_APP_ID,
      key: process.env.PUSHER_APP_KEY,
      secret: process.env.PUSHER_APP_SECRET,
      cluster: process.env.PUSHER_APP_CLUSTER,
      encrypted: true,
    });

    const sessionClient = new Dialogflow.SessionsClient(config);

    const sessionPath = sessionClient.sessionPath(projectId, sessionId);

    const processMessage = message => {
      const request = {
        session: sessionPath,
        queryInput: {
          text: {
            text: message,
            languageCode,
          },
        },
      };

      sessionClient
        .detectIntent(request)
        .then(responses => {
          const result = responses[0].queryResult;
          const intent = result.intent.displayName
          spotify.clientCredentialsGrant()
            .then((data) => {
              let token = data.body['access_token'];
              spotify.setAccessToken(token)
            })
            .then(() => {
              spotify.searchPlaylists(`${intent}`)
              .then((data)=> {
                let playlist = data.body.playlists.items[0]['external_urls'].spotify
                let playListName = data.body.playlists.items[0].name
                console.log(playlist);
                return pusher.trigger('bot', 'bot-response', {
                  message: result.fulfillmentText,
                  playlist,
                  name: playListName
                });
              }) 
              .catch((err) => {
                console.log("Something went wrong!", err);
              });
            })
        })
        .catch(err => {
          console.error('ERROR:', err);
        });
    }

    module.exports = processMessage;