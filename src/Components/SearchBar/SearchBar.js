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

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && event.target.value) {
      submitSearch(searchTerm);
      setSearchTerm('');
    }
  }
  return (
  <div className="SearchBar">
    <input onKeyPress={(event) => handleKeyPress(event)} onChange={(event) => handleTermChange(event)} placeholder="Enter A Song, Album, or Artist" />
    <button onClick={() => submitSearch(searchTerm)}  className="SearchButton">SEARCH</button>
  </div>
  )
}

export default SearchBar