import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import NavBar from './NavBar';
import Footer from '../components/Footer';

export default class Album extends Component {
  state = {
    loading: false,
    favoriteMusics: [],
  }

  componentDidMount= async () => {
    this.fetchMusic();
    const favoriteMusics = await getFavoriteSongs();
    this.setState({ loading: true }, () => {
      this.setState({ loading: false, favoriteMusics });
    });
  }

  fetchMusic = () => {
    const { match: { params: { id } } } = this.props;
    this.setState({ loading: true }, async () => {
      const response = await getMusics(id);
      const track = response.filter((e, index) => index !== 0);
      this.setState({ loading: false, albums: response, tracks: track });
    });
  }

  render() {
    const { loading, albums, tracks, favoriteMusics } = this.state;
    return (
      <div className="root" data-testid="page-album">
        <Header />
        <NavBar />
        <Footer />
        { loading ? <Loading /> : (
          <div className="main">
            { albums && (
              <div className="container-music">
                <div className="musics-header">
                  <img
                    src={ albums[0].artworkUrl100.replace('100x100bb', '1000x1000bb') }
                    alt={ albums[0].collectionName }
                  />
                  <h1>{`This is ${albums[0].artistName}`}</h1>
                  <h2>
                    {`This is ${albums[0].collectionName}
                    The essential tracks, all in one playlist.`}
                  </h2>
                  <h3>{`${albums[0].trackCount} Songs ${albums[0].copyright}`}</h3>
                </div>
                {tracks.map((track, index) => (
                  <MusicCard
                    key={ index }
                    track={ track }
                    favoriteMusics={ favoriteMusics }
                    reloadFavoriteList={ this.reloadFavoriteList }
                  />
                ))}
              </div>
            )}
          </div>)}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
