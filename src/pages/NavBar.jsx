import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  BsHouseFill,
  BsMusicNoteList,
  BsSearch,
  BsPlusSquareFill,
  BsHeartFill,
}
from 'react-icons/bs';
import logoTrybe from '../imgs/logo-trybe.svg';

export default class NavBar extends Component {
  render() {
    return (
      <nav className="nav-bar flex-column d-flex" data-testid="page-search">
        <div className="nav-bar-header d-flex pl-4 pt-4 pb-4">
          <img className="logo" src={ logoTrybe } alt="logoTrybe" />
          <h4 className="nav-bar-header-title">TrybeTunes</h4>
        </div>

        <hr className="root-list-divider" />

        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="iconLink nav-link d-flex align-items-center" to="/home">
              <BsHouseFill className="icon" />
              <span>Home</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="iconLink nav-link d-flex align-items-center" to="/search">
              <BsSearch className="icon" />
              <span>Buscar</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="iconLink nav-link d-flex align-items-center" to="/favorites">
              <BsMusicNoteList className="icon" />
              <span>Biblioteca</span>
            </Link>
          </li>
        </ul>

        <hr className="root-list-divider" />

        <div className="root-list d-flex flex-column">
          <div className="root-list-header">
            <h2>Playlist</h2>
          </div>

          <div className="root-list-body">
            <Link className="root-list-item d-flex align-items-center" to="/favorites">
              <BsPlusSquareFill className="icon root-list-icon" />
              <span>Criar Playlist</span>
            </Link>

            <Link className="root-list-item d-flex align-items-center" to="/favorites">
              <BsHeartFill className="icon heart root-list-icon" />
              <span>Favoritas</span>
            </Link>
          </div>

          <hr className="root-list-divider" />

          <ul className="navbar-nav play-list-scroll overflow-auto">
            <li>
              <Link
                className="play-list-item align-items-center"
                to="/#"
              >
                Músicas de filmes que marcaram
              </Link>
            </li>
          </ul>

        </div>
      </nav>
    );
  }
}
