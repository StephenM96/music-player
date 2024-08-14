import React, { useState, useEffect } from "react";
import axios from "axios";
import SpotifyPlayer from "react-spotify-web-playback";
import { loginUrl, getTokenFromUrl } from "./components/SpotifyPlayer";
// import SongList from './components/SongList'; // testing song selection
// import MusicPlayer from './components/MusicPlayer'; //testing song selection
import "./App.css";

function App() {
  // const [currentSong, setCurrentSong] = useState(null); // testing song selection
  const [token, setToken] = useState("");
  const [tracks, setTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState("");

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    let _token = hash.access_token;

    if (_token) {
      setToken(_token);
      window.localStorage.setItem("token", _token); //stor the token in local storage
    } else {
      const storedToken = window.localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, []);

  const searchTracks = async (query) => {
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: query,
        type: "track",
        limit: 10,
      },
    });
    setTracks(data.tracks.items);
  };

  const logout = () => {
    setToken('');
    window.localStorage.removeItem('token');
    window.sessionStorage.removeItem('token');
  
    //clear cookies
    document.cookie.split(";").forEach((cookie) => {
      document.cookie = cookie
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
  
    //Redir to clean page
    setTimeout(() => {
      window.location.href = '/logout'; 
    }, 100);
  };

  // const songs = [
  //   { title: "Song 1", artist: "Artist 1", url: "/songs/song1.mp3" },
  //   { title: "Song 2", artist: "Artist 2", url: "/songs/song2.mp3" },
  //   { title: "Song 3", artist: "Artist 3", url: "/songs/song3.mp3" },
  // ]; // test song selection

  return (
    <div>
      <h1>Spotify Music Player</h1>
      {/* <SongList songs={songs} onSelect={setCurrentSong} />
      {currentSong && <MusicPlayer song={currentSong} />} */}
      {/* Test song selection */}

      {!token ? (
        <a href={loginUrl}>Login to Spotify</a>
      ) : (
        <div>
          <button onClick={logout}>Logout</button>

          <input
            type="text"
            placeholder="Search for a song"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                searchTracks(e.target.value);
              }
            }}
          />
          <ul>
            {tracks.map((track) => (
              <li key={track.id} onClick={() => setSelectedTrack(track.uri)}>
                {track.name} - {track.artists[0].name}
              </li>
            ))}
          </ul>
          {selectedTrack && (
            <SpotifyPlayer
              token={token}
              uris={[selectedTrack]}
              autoPlay={true}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
