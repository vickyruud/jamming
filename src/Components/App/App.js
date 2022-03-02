import { useState } from 'react';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import './App.css';

function App(props) {
  //hard coded songs
  const songs = [
    {
      id: 1,
      name: "Square Hammer",
      artist: "Ghost",
      album: "Popestar"
    },
    {
      id: 2,
      name: "I want it that way",
      artist: "Backstreet Boys",
      album: "Millenium"
    },    
  ]

  //state holds tracks, search results and playlist name
  const [state, setState] = useState({
    searchResults: songs,
    playlistTracks: [],
    playlistName: 'My Songs',
    
  });

  const addTrack = (track) => {
    if (state.playlistTracks.find((savedTrack) => savedTrack.id === track.id)){
      return;
    } else {
      setState({
        ...state,
        playlistTracks: []
      })
    }
    
  }
 

  return (
<div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
    <SearchBar />
        <div className="App-playlist">
          <SearchResults onAdd={addTrack} searchResults = {state.searchResults} />
          <Playlist playlistName={state.playlistName} playlistTracks={state.playlistTracks} />
        </div>
  </div>
</div>
  );
}

export default App;
