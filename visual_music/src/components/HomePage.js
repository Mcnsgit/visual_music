import React, { useState, useEffect } from 'react';
// import Login from './Login'; Commented out as per instructions
import { NavLink } from 'react-router-dom';
import WebPlayback from './WebPlayback';
import AudioPlayer from './AudioPlayer';
import UserProfile from './UserProfile';
import SearchTracks from './SearchTracks';
import MusicControls from './MusicControls';
import AudioFeaturesVisualizer from './AudioFeaturesVisualizer';
import AudioVisualizer from './AudioVisualiser';
import SpotifyPlayerContext from './SpotifyPlayerContext';
import './../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchAccessToken } from '../services/spotifyService'; // Assume this is your new service

function HomePage() {
    const [accessToken, setAccessToken] = useState('');
    const [player, setPlayer] = useState(null);
    const [currentTrackId, setCurrentTrackId] = useState('');
    const [audioFeatures, setAudioFeatures] = useState(null);

    useEffect(() => {
        fetchAccessToken()
            .then(setAccessToken)
            .catch(error => console.error('Failed to fetch access token:', error));
    }, []);

    // Placeholder for setting currentTrackId when a track changes
    // This logic should be implemented based on your application's needs

    return (
        <div className="homepage">
            <header>
                <h1>Visual Music</h1>
                <h2>Visualize your music</h2>
                <nav>
                    <NavLink to="/Visual_Music/About">About</NavLink>
                    <NavLink to="/Visual_Music/Login">Login</NavLink>
                </nav>
            </header>
            <SpotifyPlayerContext.Provider value={player}>
                <WebPlayback accessToken={accessToken} />
                <AudioPlayer accessToken={accessToken} />
                <UserProfile accessToken={accessToken} />
                <SearchTracks accessToken={accessToken} />
                <MusicControls />
                <AudioFeaturesVisualizer audioFeatures={audioFeatures} />
                {accessToken && currentTrackId && (
                    <AudioVisualizer token={accessToken} trackId={currentTrackId} />
                )}
            </SpotifyPlayerContext.Provider>
            <footer>
                {/* Footer content here, if any */}
            </footer>
        </div>
    );
};

export default HomePage;
