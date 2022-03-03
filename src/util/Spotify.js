import React from 'react'

let userAccessToken = '';

const Spotify =  {
  getAccessToken() {
    if (userAccessToken) {
      return userAccessToken
    }
  }
  
}

export default Spotify