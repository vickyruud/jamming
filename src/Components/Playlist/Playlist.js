import React from 'react'
import TrackList from '../TrackList/TrackList'
import './Playlist.css'

const Playlist = (props) => {
  return (
  <div className="Playlist">
      <input readOnly value={props.playlistName}/>
      <TrackList
        onRemove={props.onRemove}
        buttonValue="-"
        searchResults={props.playlistTracks} />
    <button className="Playlist-save">SAVE TO SPOTIFY</button>
  </div>
  )
}

export default Playlist