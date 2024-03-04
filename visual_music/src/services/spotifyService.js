import axios from 'axios';

const generateRandomString = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

const AUTH_URL = `https://accounts.spotify.com/authorize?...&state=${state}`;

const storeTokens = (accessToken, refreshToken) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
      
    console.log("Storing access_token:", accessToken);
    console.log("Storing refresh_token:", refreshToken);
    
};
const state = generateRandomString(); // Implement this function to generate a random string
localStorage.setItem("spotify_auth_state", state);

export const handleAuthCode = async (code) => {
    try {
        const response = await axios.post('/api/token', { code });
        const { access_token, refresh_token } = response.data;
        storeTokens(access_token, refresh_token);
    } catch (error) {
        console.error('Error exchanging auth code for tokens:', error);
    }
};
export const fetchUserProfile = async (accessToken) => {
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    return await response.json();
  }