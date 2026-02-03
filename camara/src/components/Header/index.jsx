import React from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import { IoMoon, IoSunny } from 'react-icons/io5'
import congresso from '../../assets/congresso.png'

const Header = ({ autenticado }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary bg-success fs-5 fw-bold">
      <div className="container-fluid">
        <img src={congresso} alt="Logo" />
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">Página Inicial</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/deputados">Deputados</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/estatisticas">Estatísticas</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/videos">Ao vivo da Câmara</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/eventos">Eventos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/noticias">Notícias</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/redesocial">Rede Social</a>
            </li>
          </ul>
          <button
            onClick={toggleTheme}
            style={{
              marginLeft: 'auto',
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '0 15px'
            }}
            title={isDark ? 'Modo Claro' : 'Modo Escuro'}
          >
            {isDark ? <IoSunny /> : <IoMoon />}
          </button>
        </div>
      </div>
    </nav>
  )
}
export { Header }