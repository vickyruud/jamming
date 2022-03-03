import React, { useState } from 'react'
import './SearchBar.css'

const SearchBar = (props) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleTermChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const submitSearch = (term) => {
    props.onSearch(term);
  }

  return (
  <div className="SearchBar">
    <input  onChange={(event) => handleTermChange(event)} placeholder="Enter A Song, Album, or Artist" />
    <button onClick={() => submitSearch(searchTerm)}  className="SearchButton">SEARCH</button>
  </div>
  )
}

export default SearchBar