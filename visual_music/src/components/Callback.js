import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Updated import
import { handleAuthCode } from '../services/spotifyService';

function Callback() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const returnedState = new URLSearchParams(location.search).get('state');
        const storedState = localStorage.getItem("spotify_auth_state");

        if (returnedState !== storedState) {
            console.error('Invalid state parameter');
            navigate.push('/'); 
        }
        try {
            const query = new URLSearchParams(location.search);
            const code = query.get('code');

            if (code) {
                console.log('Authorization code:', code);
                handleAuthCode(code).then(() => {
                    navigate('/', { replace: true });
                });
            } else {
                console.error('No authorization code found in the URL');
                    navigate.push('/'); 
                }
        } catch (error) {
            console.error('Error occurred during authentication:', error);
        }
    }, [location, navigate]);

    return <div>Authentication successful. You can close this window.</div>;
}

export default Callback;