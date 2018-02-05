import React from 'react';

import Header from '../Header/Header';
import Spotify from '../../util/Spotify';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

import './App.css';

Spotify.getAccessToken();

class App extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            searchResults: [], 
            playlistName: 'New Playlist', 
            playlistTracks: []
        }

        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);
    }

    addTrack(track) {
        if (this.state.playlistTracks.every(playlistTrack => playlistTrack.id !== track.id)) {
            let newTrack = this.state.playlistTracks.concat(track);
            
            this.setState({playlistTracks: newTrack});
        }
    }

    removeTrack(track) {
        this.setState({
            playlistTracks: this.state.playlistTracks.filter(playlistTrack => playlistTrack.id !== track.id)
        });
    }

    updatePlaylistName(name) {
        this.setState({ playlistName: name });
    }

    savePlaylist() {
        let trackURIs = this.state.playlistTracks.map(track => track.uri);

        if (this.state.playlistName && trackURIs && trackURIs.length > 0) {
            Spotify.savePlaylist(this.state.playlistName, trackURIs);

            this.setState(
                {
                    searchResults: [], 
                    playlistName: 'New Playlist', 
                    playlistTracks: []
                }
            );
        }
    }

    search(searchTerm) {
        Spotify.search(searchTerm)
            .then(searchResults => this.setState({
                searchResults: searchResults
        }));
    }

    render() {
        return (
            <div>
                <Header />
                <div class="App">
                    <SearchBar onSearch={this.search} />
                    <div class="App-playlist">
                        <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
                        <Playlist name={this.state.playlistName} tracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;

