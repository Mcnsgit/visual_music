import React from 'react';
import {NavLink} from 'react-router-dom';
import {redirectToSpotifyLogin} from '../services/spotifyAuthService';


const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/Visual_Music/About">About</NavLink>
      <p>Please log in to continue.</p>

      <button onClick={redirectToSpotifyLogin}>Login with Spotify</button>

    </div>
  );
};

export default Login;