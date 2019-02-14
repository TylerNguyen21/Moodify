const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
  clientId: 'b536e0b0b9d04377bcc1e0ca45d73d91',
  clientSecret: '5264de35673d46f09d2eca2a4798c0bf',
  redirectUri: 'http://localhost:3000/callback'
});

module.exports = spotifyApi