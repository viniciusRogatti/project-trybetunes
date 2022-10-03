import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { createUser } from '../services/userAPI';
import imageDefault from '../imgs/profile-default.jpg';
import logoTrybe from '../imgs/logo-trybe.svg';

class Login extends Component {
  state = {
    name: '',
    email: '',
    image: '',
    description: '',
    isDisabledButton: true,
  };

  checkUserName = () => {
    const caractersMin = 3;
    const { name } = this.state;
    return name.length < caractersMin;
  }

  onInputChange = ({ target: { name, value, files } }) => {
    const filesImage = files;
    const checkValue = name === 'image' ? URL.createObjectURL(filesImage[0]) : value;
    this.setState({ [name]: checkValue }, () => {
      this.setState({ isDisabledButton: this.checkUserName() });
    });
  }

  logIn = () => {
    this.setState({ loadingAwait: true }, () => {
      const { history } = this.props;
      const { name, email, image, description } = this.state;
      createUser({ name, email, image, description });
      history.push('/home');
    });
  }

  render() {
    const { isDisabledButton, loadingAwait, image } = this.state;
    return (
      <div className="login-page">
        { loadingAwait ? <Loading />
          : (

            <form className="login-form">
              <div className="nav-bar-header d-flex pl-4 pt-4 pb-4">
                <img className="logo" src={ logoTrybe } alt="logoTrybe" />
                <h4 className="nav-bar-header-title">TrybeTunes</h4>
              </div>
              <label htmlFor="input-UserName" className="text-center">
                User Name
                <br />
                <input
                  type="text"
                  name="name"
                  id="input-UserName"
                  placeholder="Digite um nome de usuário"
                  onChange={ this.onInputChange }
                />
              </label>
              <label htmlFor="input-userEmail" className="text-center">
                User Email
                <br />
                <input
                  type="text"
                  name="email"
                  id="input-userEmail"
                  placeholder="Digite um email"
                  onChange={ this.onInputChange }
                />
              </label>
              <label htmlFor="input-userImage" className="text-center">
                { image ? (
                  <img
                    src={ image }
                    alt="profileImage"
                    className="image-profile"
                  />)
                  : (
                    <img
                      src={ imageDefault }
                      alt="profileimage"
                      className="image-profile"
                    />)}
                <input
                  onChange={ this.onInputChange }
                  className="input-userImage"
                  name="image"
                  id="input-userImage"
                  type="file"
                  accept="image/*"
                />
                <p>click para escolher uma imagem</p>
              </label>
              <label htmlFor="input-description" className="text-center">
                Bio
                <br />
                <textarea
                  type="text"
                  onChange={ this.onInputChange }
                  id="input-description"
                  name="description"
                />
              </label>
              <button
                type="submit"
                onClick={ this.logIn }
                disabled={ isDisabledButton }
                data-testid="login-submit-button"
              >
                Entrar
              </button>
            </form>
          ) }
      </div>
    );
  }
}

export default Login;

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
