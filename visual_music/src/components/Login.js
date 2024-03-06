import React from 'react';
import {redirectToSpotifyLogin} from '../services/spotifyAuthService';

const Login = () => {
  const handleLogin = () => {
    redirectToSpotifyLogin();
  };


  return (
    <div className="login">
      <h2>Login to Spotify</h2>
      <button onClick={handleLogin}>Login with Spotify</button>
    </div>
  );

};
export default Login;



