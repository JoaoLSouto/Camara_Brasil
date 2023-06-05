import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTelegram, faFacebook, faTwitter, faTiktok } from '@fortawesome/free-brands-svg-icons';
import './Subheader.css';
const Subheader = ({ autenticado }) => {
  return (
    <nav className="navbar navbar-expand-lg bg-custom-gray fs-5 fw-bold">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="https://www.instagram.com/camaradeputados/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://t.me/CamaradosDeputados" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTelegram} />
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://www.facebook.com/camaradeputados" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://twitter.com/camaradeputados" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://www.tiktok.com/@camaradosdeputados" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTiktok} />
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/faleconosco">Fale Conosco</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export { Subheader };
