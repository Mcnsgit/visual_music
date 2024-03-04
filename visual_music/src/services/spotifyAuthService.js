import axios from 'axios';
import { generateRandomString } from '../utils/authUtils';

  const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
  const REDIRECT_URI = encodeURIComponent(process.env.REACT_APP_SPOTIFY_REDIRECT_URI);
  const SCOPE = encodeURIComponent('user-read-private playlist-read-private');  

export const redirectToSpotifyLogin = () => {
    const state = generateRandomString(16);
    localStorage.setItem("spotify_auth_state", state);
    
    const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&state=${state}`;
    window.location = AUTH_URL;
  };

export const exchangeCodeForTokens = async (code) => {
  const response = await axios.post('/api/token', {
    code
  });
  const { access_token, refresh_token } = response.data;
  storeTokens(access_token, refresh_token);
  return new Promise((resolve, reject) => {
    if (response.status === 200) {
      resolve(
        {
          accessToken: access_token,
          refreshToken: refresh_token
        }
      );
    } else {
      reject(
        new Error('Failed to exchange auth code for tokens with status: ' + response.status)
      );
    };
  })
}
const storeTokens = (accessToken, refreshToken) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

export const handleAuthCode = async (code) => {
  try {
    const response = await axios.post('/api/token', { code });
    if (response.status === 200) {
      const { access_token, refresh_token } = response.data;
      storeTokens(access_token, refresh_token);
    } else {
      console.error('Failed to exchange auth code for tokens with status:', response.status);
    }
  } catch (error) {
    console.error('Error exchanging auth code for tokens:', error);
  }
};
