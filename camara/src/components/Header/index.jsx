import React from 'react'
import congresso from  '../../assets/congresso.png'
import { Link } from 'react-router-dom';

import {
    Container,
    Row,
    nav
} from './styles'

const Header = ({autenticado}) => {
  return (
          <nav class="navbar navbar-expand-lg bg-body-tertiary bg-success fs-5 fw-bold">
            <div class="container-fluid">
              <img src={congresso} alt="Logo" />
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                  <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="/">Página Inicial</a>
                  </li>
                  <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="/deputados">Deputados</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/partidos">Partidos</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/noticias">Notícias</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
)}
export { Header }