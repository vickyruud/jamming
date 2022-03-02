import React from 'react'
import './SearchBar.css'

const SearchBar = (props) => {
  return (
  <div className="SearchBar">
    <input onChange={(event)=> props.onSearch(event.target.value)} placeholder="Enter A Song, Album, or Artist" />
    <button className="SearchButton">SEARCH</button>
  </div>
  )
}

export default SearchBar