import React from 'react'
import './TrackList.css'
import Track from '../Track/Track'

const TrackList = (props) => {

  const arrayOfTracks = props.searchResults.map(track => {
    return <Track
      trackObj = {track}
      key={track.id}
      trackName={track.name}
      artist={track.artist}
      album={track.album}
      buttonValue={props.buttonValue}
      onAdd={props.onAdd}
      removeTrack={props.removeTrack}
      onRemove={props.onRemove}
    />
  })
  return (
  <div className="TrackList">
    {arrayOfTracks}
  </div>
  )
}

export default TrackList