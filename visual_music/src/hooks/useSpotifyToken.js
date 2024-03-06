import { useState, useEffect } from 'react';
import axios from 'axios';

const useSpotifyToken = (initialToken) => {
    const [accessToken, setAccessToken] = useState(initialToken);
    
    useEffect(() => {
        const refreshToken = async () => {
            try {
                const response = await axios.post('/api/refresh_token', {
                    refreshToken: localStorage.getItem('refreshToken'),
                });
                setAccessToken(response.data.accessToken);
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                console.log('Access Token refreshed:', response.data.accessToken);
            } catch (error) {
                console.error('Error refreshing access token:', error);
                window.location.href = '/login';
                throw error;
            }
        };

        const interval = setInterval(() => {
            refreshToken();
        }, 1000 * 60 * 30); 

        return () => clearInterval(interval);
    }, []);

    return accessToken;
};

export default useSpotifyToken;
