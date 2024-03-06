import axios from 'axios'
import qs from 'qs'; // Assuming qs is already installed and imported for handling query strings

const BASE_URL = 'https://api.spotify.com/v1';

// Example function to fetch an access token
export const fetchAccessToken = async () => {
    // Implementation for fetching the access token
    // This is just a placeholder. Replace it with your actual code.
    const response = await fetch('YOUR_TOKEN_ENDPOINT', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials&client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET',
    });
    const data = await response.json();
    return data.access_token;
};

//Creating  Playlists with Spotify's Web API
export const createPlaylist = async (userId, name, isPublic, isCollaborative, description) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        console.error('Access Token is not available.');
        return;
    }
    try {
        const response = await axios.post(`${BASE_URL}/users/${userId}/playlists`, {
            name, // Corrected from playlistName to name
            public: isPublic,
            collaborative: isCollaborative,
            description,
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });
        console.log('Created Playlist:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating playlist:', error);
    }
};

// Implementing editPlaylistDetails
export const editPlaylistDetails = async (playlistId, name, isPublic, isCollaborative, description) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        console.error('Access Token is not available.');
        return;
    }
    try {
        const response = await axios.put(`${BASE_URL}/playlists/${playlistId}`, {
            name,
            public: isPublic,
            collaborative: isCollaborative,
            description,
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });
        console.log('Edited Playlist Details:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error editing playlist details:', error);
    }
};

// Implementing getUserPlaylists
export const getUserPlaylists = async (token) => {
    if (!token) {
        console.error('Access Token is not available.');
        return;
    }

    try {
        const response = await axios.get(`${BASE_URL}/me/playlists`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });

        console.log('User Playlists:', response.data);
        return response.data.items; // Assuming you want the array of playlists
    } catch (error) {
        console.error('Error fetching playlists:', error);
    }
};

// Implementing deletePlaylist
export const deletePlaylist = async (playlistId, token) => {
    if (!token) {
        console.error('Access Token is not available.');
        return;
    }

    try {
        const response = await axios.delete(`${BASE_URL}/playlists/${playlistId}/followers`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });

        console.log('Deleted Playlist:', playlistId);
        return response.data; // Note: Spotify API might not return any content for a DELETE operation
    } catch (error) {
        console.error('Error deleting playlist:', error);
    }
};

// Fetching a User's Profile
export const fetchUserProfile = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        console.error('Access Token is not available.');
        return;
    }
    const userId = localStorage.getItem('userId');
    if (!userId) {
        console.error('User ID is not available.');
        return;
    }
    try {
        const response = await axios.get(`${BASE_URL}/users/${userId}`, {

            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });
        console.log('User Profile:', response.data);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.error('Access Token expired. Fetching new access token...');
            const refreshToken = localStorage.getItem('refreshToken');
            const response = await axios.post('https://accounts.spotify.com/api/token', qs.stringify({
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
            }), {
                headers: {
                    'Authorization': `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            const { access_token } = response.data;
            localStorage.setItem('accessToken', access_token);
            return fetchUserProfile();

        } else {
            console.error('Error fetching user profile:', error);
        }
    }
};
//searching for tracks
export const searchTracks = async (query, accessToken) => {
    try {
        const response = await axios.get(`${BASE_URL}/search`, {
            params: {
                q: query,
                type: 'track',
            },
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data.tracks.items;
    } catch (error) {
        console.error('Error searching tracks:', error);
        return [];
    }
};