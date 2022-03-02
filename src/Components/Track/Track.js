import React from 'react'
import './Track.css'

const Track = (props) => {


  const handleOnClick = () => {
    if (props.buttonValue === "+") {
      props.onAdd(props.trackObj);
    } else {
      props.onRemove(props.trackObj);
    }
  }
  
  return (
  <div className="Track">
    <div className="Track-information">
      <h3>{props.trackName}</h3>
      <p>{props.artist} | {props.album}</p>
    </div>
      <button  onClick={handleOnClick} className="Track-action">{props.buttonValue}</button>
  </div>
  )
}

export default Track