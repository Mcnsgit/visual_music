import React, { useState, useEffect } from 'react';
import { createPlaylist, editPlaylistDetails, deletePlaylist, getUserPlaylists } from '../services/spotifyApiService';

const PlaylistManager = ({ accessToken, userId }) => {
    const [playlists, setPlaylists] = useState([]);
    const [newPlaylistName, setNewPlaylistName] = useState('');

    useEffect(() => {
        // Fetch playlists when the component mounts or when accessToken changes
        const fetchPlaylists = async () => {
            const userPlaylists = await getUserPlaylists(accessToken);
            setPlaylists(userPlaylists);
        };

        if (accessToken) {
            fetchPlaylists();
        }
    }, [accessToken]);

    const handleCreatePlaylist = async () => {
        const playlist = await createPlaylist(userId, accessToken, newPlaylistName);
        setPlaylists([...playlists, playlist]);
        setNewPlaylistName('');
    };

    const handleEditPlaylistName = async (playlistId, newName) => {
        await editPlaylistDetails(playlistId, accessToken, { name: newName });
        const updatedPlaylists = await getUserPlaylists(accessToken);
        setPlaylists(updatedPlaylists);
    };

    const handleDeletePlaylist = async (playlistId) => {
        await deletePlaylist(playlistId, accessToken);
        const updatedPlaylists = await getUserPlaylists(accessToken);
        setPlaylists(updatedPlaylists);
    };

    return (
        <div>
            <h2>My Playlists</h2>
            <input
                type="text"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                placeholder="New Playlist Name"
            />
            <button onClick={handleCreatePlaylist}>Create Playlist</button>
            {playlists.map((playlist) => (
                <div key={playlist.id}>
                    <h3>{playlist.name}</h3>
                    <button onClick={() => isEditing(playlist.id)}>Edit</button>
                    <button onClick={() => handleDeletePlaylist(playlist.id)}>Delete</button>
                    {isEditing === playlist.id ? (
                        <input
                            type="text"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            placeholder="New Playlist Name"
                        />
                    ) : null}
                    <button onClick={() => handleEditPlaylistName(playlist.id, newName)}>
                        Confirm Edit
                    </button>
                    <button onClick={() => setIsEditing(null)}>Cancel</button>
                </div>
            ))}
        </div>
    );
};

export default PlaylistManager;
