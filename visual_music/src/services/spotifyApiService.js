import axios from 'axios'

export const fetchUserProfile = async () => {
    const accessToken = localStorage.getItem('accessToken'); // Assuming the token is stored in local storage
    if (!accessToken) {
        console.error('Access Token is not available.');
        return;
    }
    
    try {
        const response = await axios.get('https://api.spotify.com/v1/me', {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        
        console.log('User Profile:', response.data);
        return response.data;
    } catch (error) {
        if(error.response && error.response.status === 401) {
            console.error('Access Token expired. Fetching new access token...');
            const refreshToken = localStorage.getItem('refreshToken');
            const response = await axios.post('https://accounts.spotify.com/api/token', {
                grant_type: 'refresh_token',
                refresh_token: refreshToken
            });
            const { access_token } = response.data;
            localStorage.setItem('accessToken', access_token);
            return fetchUserProfile();

        } else {
        console.error('Error fetching user profile:', error);
        }
    }
};
export const fetchUserPlaylists = async () => {
    const accessToken = localStorage.getItem('accessToken'); // Assuming the token is stored in local storage
    if (!accessToken) {
        console.error('Access Token is not available.');
        return;
    }
    
    try {
        const response = await axios.get('https://api.spotify.com/v1/me/playlists', {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        
        console.log('User Playlists:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching playlists:', error);
        throw error;
    }
    
};
