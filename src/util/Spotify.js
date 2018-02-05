const clientId = 'ef5eba0327124ab0b9a1abc3986ee4bb';
const redirectUri = 'http://jammmingpapierz.surge.sh/';
const spotifyUrl = `https://accounts.spotify.com/authorize?response_type=token&scope=playlist-modify-public&client_id=${clientId}&redirect_uri=${redirectUri}`;
let accessToken = undefined;

const Spotify = {

    getAccessToken() {

        if (accessToken) {
            return accessToken;
        }

        const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
        let expiresIn = window.location.href.match(/expires_in=([^&]*)/);

        if (urlAccessToken && expiresIn) {
            accessToken = urlAccessToken[1];
            expiresIn = expiresIn[1];

            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
          
        } else {
            window.location = spotifyUrl;
        }
    },

    search(term) {
        const searchUrl = `https://api.spotify.com/v1/search?q=${term.replace(' ', '%20')}&type=track`;
        
        return fetch(searchUrl, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
        })
        .then(response => response.json())
        .then(jsonResponse => {
            if (!jsonResponse.tracks) return [];
            return jsonResponse.tracks.items.map(track => {
              return {
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri,
                cover: track.album.images[1].url
              }
            })
        });
    },

    savePlaylist(name, trackUris) {
        if (!name || !trackUris || trackUris.length === 0) return;
        
        const userUrl = 'https://api.spotify.com/v1/me';
        
        const headers = {
            Authorization: `Bearer ${accessToken}`
        };

        let userId = undefined;
        let playlistId = undefined;
        
        fetch(userUrl, {
            headers: headers 
        })
        .then(response => response.json())
        .then(jsonResponse => userId = jsonResponse.id)
        .then(() => {
            const playlistURL = `https://api.spotify.com/v1/users/${userId}/playlists`;
          
            fetch(playlistURL, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    name: name
                })
            })
            .then(response => response.json())
            .then(jsonResponse => playlistId = jsonResponse.id)
            .then(() => {
                const trackUrl = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`;
              
                fetch(trackUrl, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                        uris: trackUris
                    })
                });
            })
        })
      }
};

export default Spotify;