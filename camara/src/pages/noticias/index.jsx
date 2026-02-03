import { Header } from '../../components/Header';
import { Container } from 'react-bootstrap';
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { NoticiasCard } from '../../components/NoticiasCard';
import { Subheader } from '../../components/Subheader';
import { Bottom } from '../../components/Bottom';
import { FaNewspaper } from 'react-icons/fa';

const Noticias = () => {
  const { colors } = useTheme();

  return (
    <div style={{ backgroundColor: colors.backgroundAlt, minHeight: '100vh' }}>
      <Subheader />
      <Header />
      <Container style={{ padding: '40px 0' }}>
        <div style={{
          background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
          padding: '40px',
          marginBottom: '40px',
          borderRadius: '16px',
          color: 'white',
          boxShadow: '0 4px 20px rgba(40,167,69,0.2)'
        }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '700',
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <FaNewspaper /> Notícias da Câmara dos Deputados
          </h1>
          <p style={{ fontSize: '16px', opacity: 0.9, margin: 0 }}>
            Acompanhe as últimas notícias e acontecimentos
          </p>
        </div>
        <div>
          <NoticiasCard />
        </div>
      </Container >
      <Bottom />
    </div>
  );
}

export { Noticias }