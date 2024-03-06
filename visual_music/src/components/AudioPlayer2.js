import React, { useEffect, useState } from 'react';
import spotify_access_token from '../hooks/useSpotifyToken';
const AudioPlayer = () => {
    const [isReady, setIsReady] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [player, setPlayer] = useState(null); // Store the player instance

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;

        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {
            const accessToken = spotify_access_token();
            const spotifyPlayer = new window.Spotify.Player({
                name: 'Web Playback SDK Quick Start Player',
                getOAuthToken: cb => { cb(accessToken); },
                volume: 0.5
            });

            // Event listeners
            spotifyPlayer.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
                setIsReady(true);
            });

            spotifyPlayer.addListener('player_state_changed', (state) => {
                if (!state) {
                    console.error('Player state is not available');
                    return;
                }
            
                // Access track information from state
                const { current_track } = state.track_window;
                const trackName = current_track.name;
                const albumName = current_track.album.name;
                const artistName = current_track.artists.map(artist => artist.name).join(', ');
                const albumImageUrl = current_track.album.images[0].url;
            
                // Update   state or UI with this information
            });
            
            // Connect to the player!
            spotifyPlayer.connect();

            setPlayer(spotifyPlayer);
        };

        return () => {
            document.body.removeChild(script);
            if (player) {
                player.disconnect();
            }
        };
    }, [player]);

    const togglePlay = () => {
        if (!player) {
            console.log('Spotify player is not initialized');
            return;
        }
        if (isPlaying) {
            player.pause().then(() => {
                console.log('Playback paused');
                setIsPlaying(false);
            });
        } else {
            player.resume().then(() => {
                console.log('Playback resumed');
                setIsPlaying(true);
            });
        }
    };

    return (
        <div>
            <h1>Spotify Web Playback SDK Quick Start</h1>
            {isReady ? (
                <button id="togglePlay" onClick={togglePlay}>Toggle Play</button>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default AudioPlayer;
