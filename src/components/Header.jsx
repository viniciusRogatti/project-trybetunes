import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsGithub, BsFilterLeft } from 'react-icons/bs';
import imageDefault from '../imgs/17004.png';
import { getUser } from '../services/userAPI';

function Header() {
  // const [show, handleShow] = useState(false);
  const [userName] = useState(getUser().name);
  const [userImage] = useState(getUser().image);

  /* const transitionHeader = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', transitionHeader);
    return () => window.removeEventListener('scroll', transitionHeader);
  }, []); */

  return (
    <header
      className="d-flex position-relative header"
      id="Header"
    >
      <div className="icons-action-left d-flex">
        {/* <div className="header-overlay"></div> */}
        <a
          target="_blank"
          href="https://github.com/viniciusRogatti"
          rel="noreferrer"
          className="d-flex justify-content-center align-items-center"
        >
          <BsGithub className="icon" />
          <span>Vinicius Rogatti</span>
        </a>
      </div>

      <div className="d-flex ml-auto icons-action-right">
        <div className="dropdown menu ml-3">
          <button
            data-toggle="dropdown"
            className="d-flex align-items-center"
            type="button"
          >
            { userImage ? <img src={ userImage } alt="profile" className="avatar" /> : (
              <img
                src={ imageDefault }
                alt="imageUserDefault"
                className="avatar"
              />
            )}
            <span>{userName}</span>
            <BsFilterLeft className="icon" />
          </button>

          <div className="dropdown-menu mt-0 p-0">
            <Link
              className="dropdown-item"
              to="/profile/edit"
            >
              Editar Perfil
            </Link>
            <Link className="dropdown-item" to="/">
              Desologar
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
