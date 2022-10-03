import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class CardAlbum extends Component {
  render() {
    const { albums } = this.props;
    return (
      albums.length > 0 ? (
        <div className="main container-album-card">
          {albums.map((album) => (
            <Link
              key={ album.collectionId }
              className="album-card"
              to={ `/album/${album.collectionId}` }
            >
              <div
                key={ album.artistId }
                data-testid={ `link-to-album-${album.artistId}` }
              >
                <img
                  className="img-album"
                  src={ album.artworkUrl100.replace('100x100bb', '1000x1000bb') }
                  alt={ album.artistName }
                />
                <h3 className="collection-name-album">{album.collectionName}</h3>
                <h2 className="name-album">{album.artistName}</h2>
              </div>
            </Link>
          ))}
        </div>
      ) : 'Nenhum álbum foi encontrado'
    );
  }
}

CardAlbum.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};
