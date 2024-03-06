// src/components/SearchTracks.js
import React, { useState } from 'react';
import { searchTracks } from '../services/spotifyApiService';

const SearchTracks = ({ accessToken }) => {
    const [query, setQuery] = useState('');
    const [tracks, setTracks] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        const results = await searchTracks(query, accessToken);
        setTracks(results);
    };

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search for tracks"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            <div>
                {tracks.map((track) => (
                    <div key={track.id}>
                        <img src={track.album.images[0].url} alt={track.name} />
                        <div>{track.name}</div>
                        <div>{track.artists.map((artist) => artist.name).join(', ')}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchTracks;
