import express from 'express';
import axios from 'axios';
import querystring from 'querystring';
import { generateRandomString } from '../utils/authUtils';

const app = express();
const port = process.env.PORT || 3001;

// It's good practice to destructure environment variables at the top.
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env;

app.use(express.json());



// This route initializes authentication with Spotify.
app.get('/auth', (req, res) => {
    const state = generateRandomString(16); // Implement generateRandomString to create a CSRF token.
    const scope = 'user-read-private playlist-read-private'; // Adjust scope as needed.
    res.redirect(`https://accounts.spotify.com/authorize?${querystring.stringify({
        response_type: 'code',
        client_id: CLIENT_ID,
        scope: scope,
        redirect_uri: REDIRECT_URI,
        state: state
    })}`);
});

// This route handles the callback from Spotify authentication.
app.get('/callback', async (req, res) => {
    const code = req.query.code || null;

    try {
        const response = await axios({
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            data: querystring.stringify({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: REDIRECT_URI,
            }),
            headers: {
                'Authorization': 'Basic ' + (Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        });

        // Redirect or handle tokens as needed, e.g., storing access token in session, then redirecting.
        const { access_token, refresh_token } = response.data;
        // You can redirect the user with the tokens or send them directly if it's a SPA.
        res.redirect(`/?access_token=${access_token}&refresh_token=${refresh_token}`);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
