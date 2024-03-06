import React, { useContext} from 'react';
import SpotifyPlayerContext from './SpotifyPlayerContext';

const MusicControls = () => {
    const player = useContext(SpotifyPlayerContext);
    // Implement control functions (e.g., playPause, nextTrack) using the player instance
    if (!player || !player._options.getOAuthToken) {
        return null;
    }

    const playPause = () => {
        player.togglePlay();
    };

    const nextTrack = () => {
        player.nextTrack();
    };

    const previousTrack = () => {
        player.previousTrack();
    };

    return (
        <div> 
            <button onClick={previousTrack}>Previous</button>
            <button onClick={playPause}>Play/Pause</button>
            <button onClick={nextTrack}>Next</button>
        </div>
    );
};


export default MusicControls;

