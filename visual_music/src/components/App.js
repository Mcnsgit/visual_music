import React, { useState, useEffect } from 'react';
import './../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Card, Row } from 'react-bootstrap';
const CLIENT_ID = '1f42356ed83f46cc9ffd35c525fc8541';
const CLIENT_SECRET = '0b524c44f9404b808cabd354d04df737';

function App() {
  const [searchInput, setSearchInput] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [album, setAlbum] = useState([]);

  useEffect(() => {
    //API Acess Token
    var authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }
    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(result => result.json())
      .then(data => setAccessToken(data.access_token))
  }, [])

  //search
  async function search() {
    console.log("search for" + searchInput)

    //get request using search to get artistID
    var searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }
    var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParameters)
      .then(response => response.json())
      .then(data => {return data.artists.items[0].id})

      console.log("Artist ID is" + artistID)
    //get request with artist ID grab all the albums
    var returnedAlbum = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums' + '?include_groups=album&market=BR&limit=50', searchParameters)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setAlbum(data.items)
      })
      .catch(error => console.log(error))
    //display albums

  }
  console.log(album)
  return (
    <div className="app">
      
    </div>
  );
}

export default App;

