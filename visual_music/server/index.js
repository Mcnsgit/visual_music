const express = require('express');
const axios = require('axios');
const qs = require('querystring');
require('dotenv').config(
    { path: '../.env' }
);
const cors = require('cors');
const authRouter = require('./auth/spotifyAuth.js');

const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use('/auth', authRouter);

app.post('/exchange_code', async (req, res) => {
    const { code } = req.body; // The authorization code sent from the frontend
    try {
        const response = await axios.post('https://accounts.spotify.com/api/token', qs.stringify({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
            client_id: process.env.SPOTIFY_CLIENT_ID,
            client_secret: process.env.SPOTIFY_CLIENT_SECRET,
        }), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });

        // Respond back to the frontend with the access and refresh tokens
        
        res.json({
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token,
        });
    } catch (error) {
        console.error('Error exchanging auth code for tokens:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
