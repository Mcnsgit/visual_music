const express = require('express');
const axios = require('axios');
const qs = require('querystring');
require('dotenv').config();

const router = express.Router();

// GET endpoint for redirecting the user to the Spotify authorization page
router.get('/login', function(req, res) {
    const authUrl = `https://accounts.spotify.com/authorize?${querystring.stringify({
      response_type: 'code',
      client_id: clientId,
      scope: scope,
      redirect_uri: redirectUri,
      state: state
    })}`;
    res.redirect(authUrl);
  });



// POST endpoint for exchanging the authorization code for tokens
router.post('/exchange_code', async (req, res) => {
    console.log('Received request for /exchange_code with body:', req.body); // Step 1

    if (!req.body.code) {
        console.error('Missing code parameter in request body');
        return res.status(400).json({ error: 'Missing code parameter' });
    }

    console.log('Environment Variables:', { // Step 2
        SPOTIFY_REDIRECT_URI: process.env.SPOTIFY_REDIRECT_URI,
        SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
        SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET ? '***hidden***' : 'undefined',
    });

    const { code } = req.body;
    const data = qs.stringify({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET,
    });

    console.log('Data object for Spotify request:', data); // Step 3


    try {
        const response = await axios.post('https://accounts.spotify.com/api/token', data, {
            headers: {
                'Authorization': `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        console.log('Spotify response data:', response.data); // Step 4

        res.json({ // Step 5
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token,
            expiresIn: response.data.expires_in,
        });
    } catch (error) {
        console.error('Error exchanging auth code for tokens:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
module.exports = router;
