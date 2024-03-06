import React, { useEffect, useState } from 'react';

function WebPlayback({ accessToken }) {
    const [player, setPlayer] = useState(null);

    useEffect(() => {
        const initializePlayer = () => {
            const player = new window.Spotify.Player({
                name: 'Web Playback SDK Quick Start Player',
                getOAuthToken: cb => { cb(accessToken); },
            });

            // Adding event listeners
            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
            });

            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            player.addListener('player_state_changed', state => {
                console.log('Player state changed:', state);
                // Here you can update the state of your component with the current playback state if needed
            });

            // Attempt to connect to Spotify
            player.connect().then(success => {
                if (success) {
                    console.log('The Web Playback SDK successfully connected to Spotify!');
                }
            });

            // Update the player state
            setPlayer(player);
        };

        if (window.Spotify !== undefined) {
            initializePlayer();
        } else {
            const script = document.createElement('script');
            script.src = "https://sdk.scdn.co/spotify-player.js";
            script.async = true;
            document.body.appendChild(script);

            script.onload = () => {
                initializePlayer();
            };
        }

        return () => {
            if (player) {
                player.disconnect();
            }
            // Remove the script from the body
            const spotifyScript = document.querySelector('script[src="https://sdk.scdn.co/spotify-player.js"]');
            if (spotifyScript) {
                document.body.removeChild(spotifyScript);
            }
        };
    }, [accessToken]);

    return null;
}

export default WebPlayback;
