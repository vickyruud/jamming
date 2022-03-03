
const clientId = '47f8572a626845fdbe9ba575cf8873c4'
const redirectUri = "http://jamming-vickyruud.surge.sh";
// const redirectUri = "http://localhost:3000/";
 
let accessToken = '';

const Spotify = {
  //handle access tokens and expiry of tokens
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    //grab access tokens 
    const newAccessToken = window.location.href.match(/access_token=([^&]*)/);
    const newExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
    if (newAccessToken && newExpiresIn) { //if access token and expiry exist proceed
      accessToken = newAccessToken[1];
      const expiresIn = Number(newExpiresIn[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&show_dialog=true&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  //handles search and displays results 
  search(term) {
    const accessToken = Spotify.getAccessToken();
    const fetchUrl = `https://api.spotify.com/v1/search?type=track&q=${term}` 
    return fetch(fetchUrl, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    })
      .then(resp => {
        return resp.json()
      })
      .then(resp => {
          if (!resp.tracks) {
            return [];
          }
          return resp.tracks.items.map((track) => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri,   
          }))
        })
  },

  //saves playlist to spotify after obtaining user id
  savePlaylist(playlistName, trackURIs) {
    if (playlistName && trackURIs.length) {
      const accessToken = Spotify.getAccessToken();
      const headers = {
        Authorization: `Bearer ${accessToken}`
      };
      let userID;
      let playlistID;
      return fetch('https://api.spotify.com/v1/me', {headers: headers}).then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Request failed!');
      }, networkError => {
        console.log(networkError.message);
      }).then(jsonResponse => {
        userID = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({name: playlistName})
        }).then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Request failed!');
        }, networkError => {
          console.log(networkError.message);
        }).then(jsonResponse => {
          playlistID = jsonResponse.id;
          return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({uris: trackURIs})
          }).then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error('Request failed!');
          }, networkError => {
            console.log(networkError.message);
          }).then(jsonResponse => jsonResponse);
        });
      });

    } else {
      return;
    }
  }


}

export default Spotify