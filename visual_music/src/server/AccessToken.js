const fetch = require('node-fetch');
const base64 = require('base-64');

const clientId = '1f42356ed83f46cc9ffd35c525fc8541';
const clientSecret = '0b524c44f9404b808cabd354d04df737';

const basic = base64.encode(`${clientId}:${clientSecret}`);

fetch('https://accounts.spotify.com/api/token', {
  method: 'POST',
  headers: {
    'Authorization': `Basic ${basic}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: 'grant_type=client_credentials'
})
.then(response => response.json())
.then(data => {
  console.log(data);
})
.catch(error => {
  console.error('Error:', error);
});
