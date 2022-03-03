
const clientId = '47f8572a626845fdbe9ba575cf8873c4'
const redirectUri = "http://localhost:3000/";

let accessToken = '';

const Spotify = {
  //handle access tokens and expiry of tokens
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const newAccessToken = window.location.href.match(/access_token=([^&]*)/);
    const newExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
    if (newAccessToken && newExpiresIn) {
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
  search(term) {
    console.log(term);
    const accessToken = Spotify.getAccessToken();
    const fetchUrl = `https://api.spotify.com/v1/search?type=track&q=${term}` 
    console.log(fetchUrl);
    return fetch(fetchUrl, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    })
      .then(resp => {
        return resp.json()
      })
      .then(resp => {
          console.log(resp.tracks);
          if (!resp.tracks) {
            return [];
          }
          console.log(resp);
          return resp.tracks.items.map((track) => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri,   
          }))
        })
  },


}

export default Spotify