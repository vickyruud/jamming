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

  //adds track to playlist
  const addTrack = (track) => {
    let tracks = state.playlistTracks
    if (state.playlistTracks.find((savedTrack) => savedTrack.id === track.id)){
      return;
    } else {
      tracks.push(track)
      setState({
        ...state,
        playlistTracks: tracks 
      })
    }
    
  }

  //removes track from playlist
  const removeTrack = (track => {
    const tracks = state.playlistTracks.filter(song => song.id !== track.id)
    setState({
      ...state,
      playlistTracks: tracks,
    })

  });

  //change playlist name
  const updatePlaylistName = (input) => {
    setState({
      ...state,
      playlistName: input
    })
    
  }

  //saves playlist
  const savePLaylist = () => {
    if (state.playlistTracks && state.playlistName) {
     const trackUris = state.playlistTracks.map(track => {
       return track.uri;
      }); 
      console.log(trackUris);
    }
  }
  //search for songs
  const search = (term) => {
    console.log(term);
  }
 

  return (
<div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
    <SearchBar onSearch={search} />
        <div className="App-playlist">
          <SearchResults onAdd={addTrack} searchResults = {state.searchResults} />
          <Playlist onSave={savePLaylist} onNameChange={updatePlaylistName} playlistName={state.playlistName} playlistTracks={state.playlistTracks} onRemove= {removeTrack} />
        </div>
  </div>
</div>
  );
}

export default App;
