import React from 'react'
import './Track.css'

const Track = (props) => {
  return (
  <div className="Track">
    <div className="Track-information">
      <h3>{props.trackName}</h3>
      <p>{props.artist} | {props.album}</p>
    </div>
      <button className="Track-action">{props.buttonValue}</button>
  </div>
  )
}

export default Track