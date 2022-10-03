import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import NavBar from './NavBar';

export default class Profile extends Component {
  state = {
    loading: false,
    name: '',
  }

  componentDidMount() {
    this.setState({ loading: true }, () => {
      const user = getUser();
      const { name, email, image, description } = user;
      this.setState({ loading: false, name, email, image, description });
    });
  }

  render() {
    const { loading, name, image, email, description } = this.state;
    return (
      <div className="root">
        <NavBar />
        <Header />
        <Footer />
        <div className="main">
          { loading ? <Loading /> : (
            <div className="login-form">
              <img
                src={ image }
                alt={ name }
                className="image-profile"
              />
              <Link to="/profile/edit">
                Editar perfil
              </Link>
              <h2>Nome</h2>
              <h3>{name}</h3>
              <h2>E-email</h2>
              <h3>{email}</h3>
              <h2>Descrição</h2>
              <p>{description}</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
