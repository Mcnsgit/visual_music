import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Callback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        if (code) {
            const exchangeCodeForTokens = async (code) => {
                try {
                    // Correct way to construct the URL for Axios request
                    const url = new URL('/exchange_code', window.location.origin);
                    const response = await axios.post(url.toString(), { code }); // Your backend endpoint
                    const { accessToken, refreshToken } = response.data;
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('refreshToken', refreshToken);
                    navigate('/'); // Navigate to the home page or dashboard
                } catch (error) {
                    console.error('Error exchanging auth code for tokens:', error);
                    navigate('/login'); // Navigate back to login on failure
                }
            };
            
            exchangeCodeForTokens(code);
        } else {
            console.error('Authorization code not found.');
            navigate('/login');
        }
    }, [navigate]);

    return (
        <div>Loading...</div>
    );
};

export default Callback;
