import React, { Component } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import NavBar from './NavBar';

export default class Home extends Component {
  render() {
    return (
      <div className="root" data-testid="page-search">
        <NavBar />
        <Header />
        <Footer />
      </div>
    );
  }
}
