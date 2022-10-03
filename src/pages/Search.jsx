import React, { Component } from 'react';
import { BsSearch } from 'react-icons/bs';
import CardAlbum from '../components/CardAlbum';
import Footer from '../components/Footer';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import NavBar from './NavBar';

export default class Search extends Component {
  state = {
    artist: '',
    isDisabledButton: true,
    loading: false,
    searchArtist: '',
  }

  checkArtist = () => {
    const { artist } = this.state;
    return artist.length < 2;
  }

  onInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => {
      this.setState({ isDisabledButton: this.checkArtist() });
    });
  }

  searchArtist = (event) => {
    event.preventDefault();
    const { artist } = this.state;
    this.setState({ artist: '', loading: true, searchArtist: artist }, async () => {
      const albums = await searchAlbumsAPI(artist);
      this.setState({ loading: false, albums });
    });
  }

  render() {
    const { isDisabledButton, loading, searchArtist, albums } = this.state;
    return (
      <div className="root">
        <Header />
        <NavBar />
        <Footer />
        { loading ? <Loading /> : (
          <form className="main container-search">
            <button
              data-testid="search-artist-button"
              type="submit"
              disabled={ isDisabledButton }
              onClick={ this.searchArtist }
            >
              <BsSearch />
            </button>
            <input
              type="text"
              name="artist"
              placeholder="Nome do Artista"
              data-testid="search-artist-input"
              onChange={ this.onInputChange }
            />
          </form>)}
        { searchArtist && (
          <p className="main search-artist">
            {`Resultado de álbuns de: ${searchArtist}`}
          </p>) }
        { albums && <CardAlbum albums={ albums } />}
      </div>
    );
  }
}
