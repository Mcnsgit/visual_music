import React, { useEffect, useState } from 'react';
import { Button, Grid, Typography, Paper, CircularProgress } from '@mui/material';

const AudioPlayer = () => {
    const [isReady, setIsReady] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [player, setPlayer] = useState(null);
    const [trackInfo, setTrackInfo] = useState({
        trackName: '',
        albumName: '',
        artistName: '',
        albumImageUrl: ''
    });

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {
            const accessToken = 'YOUR_SPOTIFY_ACCESS_TOKEN';
            const spotifyPlayer = new window.Spotify.Player({
                name: 'Web Playback SDK Quick Start Player',
                getOAuthToken: cb => { cb(accessToken); },
                volume: 0.5
            });

            spotifyPlayer.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
                setIsReady(true);
            });

            spotifyPlayer.addListener('player_state_changed', (state) => {
                if (!state) {
                    console.error('Player state is not available');
                    return;
                }

                const { current_track } = state.track_window;
                setTrackInfo({
                    trackName: current_track.name,
                    albumName: current_track.album.name,
                    artistName: current_track.artists.map(artist => artist.name).join(', '),
                    albumImageUrl: current_track.album.images[0].url
                });
            });

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
        if (isPlaying) {
            player.pause().then(() => setIsPlaying(false));
        } else {
            player.resume().then(() => setIsPlaying(true));
        }
    };

    return (
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                    <Typography variant="h5">Spotify Web Playback SDK Quick Start</Typography>
                </Grid>
                {isReady ? (
                    <>
                        <Grid item xs={4}>
                            <img src={trackInfo.albumImageUrl} alt="Album cover" style={{ width: '100%' }} />
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant="h6">{trackInfo.trackName}</Typography>
                            <Typography variant="subtitle1">{trackInfo.artistName}</Typography>
                            <Typography variant="body2">{trackInfo.albumName}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Button onClick={togglePlay} variant="contained" color="primary">
                                {isPlaying ? 'Pause' : 'Play'}
                            </Button>
                            <Button onClick={() => player.previousTrack()} variant="outlined">Previous</Button>
                            <Button onClick={() => player.nextTrack()} variant="outlined">Next</Button>
                            {/* Shuffle and Repeat buttons can be added similarly */}
                        </Grid>
                    </>
                ) : (
                    <Grid item xs={12} style={{ textAlign: 'center' }}>
                        <CircularProgress />
                    </Grid>
                )}
            </Grid>
        </Paper>
    );
};

export default AudioPlayer;