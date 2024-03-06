import React, { useEffect, useState } from 'react';
import { fetchUserProfile } from '../services/spotifyApiService';

const UserProfile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem('spotify_access_token');
    if (accessToken) {
      fetchUserProfile(accessToken)
        .then(data => setProfile(data))
        .catch(error => console.error(error));
    }
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <h1>{profile.display_name}'s Profile</h1>
      <img src={profile.images[0].url} alt="Profile" />
      <p>Email: {profile.email}</p>
      <p>Followers: {profile.followers.total}</p>
      <p>Playlists: {profile.playlists.total}</p>
      <p>Top Tracks: {profile.toptracks.items.length}</p>
      <p>Top Artists: {profile.topartists.items.length}</p>
    </div>
  );
};

export default UserProfile;