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
    <input onChange={(event) => handleTermChange(event)} placeholder="Enter A Song, Album, or Artist" />
    <a onClick={() => submitSearch(searchTerm)}>SEARCH</a>
  </div>
  )
}

export default SearchBar