import { post } from 'request';
import { spotify_client_id, spotify_client_secret } from './spotifyAuth.js';
import express from 'express';
const app = express();

let access_token;

app.get('/auth/callback', (req, res) => {

    var code = req.query.code;
  
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: "http://localhost:3000/profile",
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (Buffer.from(spotify_client_id + ':' + spotify_client_secret).toString('base64')),
        'Content-Type' : 'application/x-www-form-urlencoded'
      },
      json: true
    };

    post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        access_token = body.access_token;
        res.redirect('/');
      }
    });
  
  
    app.get('/auth/token', (req, res) => {
        res.json({ access_token }); // return access_token
      });

  });

  
  export default app