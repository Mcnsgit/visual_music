import { generateRandomString } from '../utils/authUtils';

const REACT_APP_SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
// const REACT_APP_SPOTIFY_CLIENT_SECRET= process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = encodeURIComponent(process.env.SPOTIFY_REDIRECT_URI); // Ensure this matches the registered URIconst SCOPE = encodeURIComponent('user-read-private playlist-read-private');
const SCOPE = encodeURIComponent('user-read-private playlist-read-private');

export const fetchSpotifyAuthCode = async () => {
    const state = generateRandomString(16);
    localStorage.setItem("spotify_auth_state", state);
    const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${REACT_APP_SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&state=${state}`;
    return AUTH_URL;
};


export const redirectToSpotifyLogin = () => {
    const state = generateRandomString(16);
    localStorage.setItem("spotify_auth_state", state);
    const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${REACT_APP_SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&state=${state}`;
    window.location.href = AUTH_URL;
};
// https://accounts.spotify.com/authorize?client_id=1f42356ed83f46cc9ffd35c525fc8541&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcalback&scope=user-read-private%20playlist-read-private&state=MAs5VEzfGZ73magC
// https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=http://localhost:3000/callback&scope=${SCOPE}&state=${state}