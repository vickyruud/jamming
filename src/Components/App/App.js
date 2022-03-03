import { useState } from 'react';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import './App.css';
import Spotify from '../../util/Spotify';

function App(props) {
  

  //state holds tracks, search results and playlist name
  const [state, setState] = useState({
    searchResults: [],
    playlistTracks: [],
    playlistName: '',
    searchTerm : ''
    
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
    let tracks = state.playlistTracks;
    if (tracks.length && state.playlistName) {
     let trackUris = tracks.map(trackIndex => {
       return trackIndex.uri;
     });
      Spotify.savePlaylist(state.playlistName, trackUris)
        .then(() => {
          setState({
            ...state,
            playlistName: '',
            playlistTracks: []
          });
          
      })
    }
  }
  //search for songs
  const search = (term) => {
    Spotify.search(term).then(results => {
      setState({
        ...state,
        searchResults: results,
      })
    })
  }
 

  return (
<div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
        <SearchBar setState={setState}searchTerm={state.searchTerm }onSearch={search} />
        <div className="App-playlist">
          <SearchResults onAdd={addTrack} searchResults = {state.searchResults} />
          <Playlist onSave={savePLaylist} onNameChange={updatePlaylistName} playlistName={state.playlistName} playlistTracks={state.playlistTracks} onRemove= {removeTrack} />
        </div>
  </div>
</div>
  );
}

export default App;
