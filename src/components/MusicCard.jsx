import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BsHeartFill } from 'react-icons/bs';
import Loading from '../pages/Loading';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  state = {
    loading: false,
    isFavorite: false,
  }

  componentDidMount() {
    const { favoriteMusics, track } = this.props;
    this.setState({
      isFavorite: favoriteMusics.some((song) => song.trackId === track.trackId) });
  }

  onInputChange = async ({ target: { checked } }) => {
    const { track, refreshFavoriteList } = this.props;
    this.setState({
      loading: true,
      isFavorite: checked,
    });
    if (checked) await addSong(track);
    else await removeSong(track);
    if (refreshFavoriteList) {
      const favorites = await getFavoriteSongs();
      refreshFavoriteList(favorites);
    }
    this.setState({ loading: false });
  }

  render() {
    const { track } = this.props;
    const { loading, isFavorite } = this.state;
    return (
      loading ? <Loading /> : (
        <div className="music-content">
          <p>{track.trackName}</p>
          <audio
            data-testid="audio-component"
            src={ track.previewUrl }
            type="audio/mp3"
            controls
          >
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {track.trackName}
            <code>audio</code>
          </audio>
          <label htmlFor={ track.trackId }>
            <BsHeartFill className={ `favorite ${isFavorite}` } />
            <input
              type="checkbox"
              id={ track.trackId }
              className="input-favorite"
              checked={ isFavorite }
              onChange={ this.onInputChange }
            />
          </label>
        </div>
      )
    );
  }
}

MusicCard.propTypes = {
  favoriteMusics: PropTypes.arrayOf(PropTypes.shape({
  })).isRequired,
  refreshFavoriteList: PropTypes.func,
  track: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
};

MusicCard.defaultProps = {
  refreshFavoriteList: false,
};
