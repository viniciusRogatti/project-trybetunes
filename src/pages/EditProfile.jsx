import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NavBar from './NavBar';

export default class EditProfile extends Component {
  state = {
    loading: false,
    name: '',
    isDisabledButton: true,
    email: '',
    image: '',
    description: '',
  }

  componentDidMount() {
    this.setState({ loading: true }, () => {
      const user = getUser();
      const { name, email, image, description } = user;
      this.setState({ loading: false, name, email, image, description });
    });
  }

  validationOfInput = () => {
    const { name, email, image, description } = this.state;
    const arrayOfInputs = [name, email, image, description];
    return arrayOfInputs.some((input) => input === '');
  }

  onInputChange = ({ target: { name, value, files } }) => {
    const filesImage = files;
    const checkValue = name === 'image' ? URL.createObjectURL(filesImage[0]) : value;
    this.setState({ [name]: checkValue }, () => {
      this.setState({ isDisabledButton: this.validationOfInput() });
    });
  }

  updateProfile = () => {
    this.setState({ loading: true }, () => {
      const { history } = this.props;
      const { name, email, image, description } = this.state;
      updateUser({ name, email, image, description });
      history.push('/profile');
    });
  }

  render() {
    const { loading, isDisabledButton, image, name, email, description } = this.state;
    return (
      <div className="root">
        <Header />
        <NavBar />
        <Footer />
        <div className="main">
          { loading ? <Loading /> : (
            <form className="login-form">
              <label htmlFor="input-UserName" className="text-center">
                Name
                <br />
                <input
                  data-testid="edit-input-name"
                  type="text"
                  value={ name }
                  name="name"
                  id="input-UserName"
                  onChange={ this.onInputChange }
                />
              </label>
              <label htmlFor="input-userEmail" className="text-center">
                E-mail
                <br />
                <input
                  data-testid="edit-input-email"
                  type="text"
                  value={ email }
                  name="email"
                  id="input-userEmail"
                  onChange={ this.onInputChange }
                />
              </label>
              <label htmlFor="input-userImage" className="text-center">
                Imagem
                <br />
                { image && (
                  <img
                    src={ image }
                    alt="profileImage"
                    className="image-profile"
                  />)}
                <input
                  className="input-userImage"
                  onChange={ this.onInputChange }
                  files={ image }
                  name="image"
                  id="input-userImage"
                  type="file"
                  accept="image/*"
                />
              </label>
              <label htmlFor="input-description" className="text-center">
                Bio
                <br />
                <textarea
                  data-testid="edit-input-description"
                  type="text"
                  value={ description }
                  onChange={ this.onInputChange }
                  id="input-description"
                  name="description"
                />
              </label>
              <button
                type="submit"
                onClick={ this.updateProfile }
                disabled={ isDisabledButton }
                data-testid="edit-button-save"
              >
                Editar perfil
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }
}

EditProfile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
