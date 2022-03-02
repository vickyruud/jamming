import { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import './App.css';

function App(props) {
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

  const [state, setState] = useState({
    searchResults: songs,
    
  });

  return (
<div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
    <SearchBar />
        <div className="App-playlist">
          <SearchResults searchResults = {state.searchResults} />
          {/* <!-- Add a Playlist component --> */}
        </div>
  </div>
</div>
  );
}

export default App;
