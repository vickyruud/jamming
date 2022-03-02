import React from 'react'
import './SearchResults.css'
import TrackList from '../TrackList/TrackList'

const SearchResults = (props) => {
  return (
  <div className="SearchResults">
    <h2>Results</h2>
      <TrackList onAdd={props.onAdd} isRemoval={false} searchResults={props.searchResults} buttonValue = "+"/>
  </div>
  )
}

export default SearchResults