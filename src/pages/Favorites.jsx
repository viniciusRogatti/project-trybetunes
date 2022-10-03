import React, { Component } from 'react';
import Loading from './Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import Header from '../components/Header';
import NavBar from './NavBar';

export default class Favorites extends Component {
  state = {
    loading: false,
    favoriteMusics: [],
  }

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      const favoriteMusics = await getFavoriteSongs();
      this.setState({ favoriteMusics, loading: false });
    });
  }

  refreshFavoriteList = (array) => {
    this.setState({ favoriteMusics: array });
  }

  render() {
    const { loading, favoriteMusics } = this.state;
    return (
      <div className="root" data-testid="page-favorites">
        <NavBar />
        <Header />
        { loading && <Loading /> }
        <div className="main">
          {favoriteMusics.length > 0 ? (
            favoriteMusics.map((track) => (
              <MusicCard
                key={ track.trackId }
                track={ track }
                favoriteMusics={ favoriteMusics }
                refreshFavoriteList={ this.refreshFavoriteList }
              />))
          ) : <h4>Nenhuma musica foi favoritada</h4>}
        </div>
      </div>
    );
  }
}
