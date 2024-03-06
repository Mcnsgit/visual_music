const fetch = require('node-fetch');
const base64 = require('base-64');

const clientId = '1f42356ed83f46cc9ffd35c525fc8541'; // Make sure this is not undefined
const redirectUri = 'http://localhost:8888/callback'; // Make sure this is correctly set
const scope = 'user-read-private playlist-read-private';
const state = 'AHj2IV8b56r12tXW'; // You can generate a random state or use a fixed one for testing

const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&state=${state}`;

const clientSecret = '0b524c44f9404b808cabd354d04df737'; // Make sure this is not undefined
const basic = base64.encode(`${clientId}:${clientSecret}`);

router.get('/login', function(req, res) {
  const authUrl = `https://accounts.spotify.com/authorize?${querystring.stringify({
    response_type: 'code',
    client_id: clientId,
    scope: scope,
    redirect_uri: redirectUri,
    state: state
  })}&show_dialog=true`;
  res.redirect(authUrl);
});

module.exports = router;

