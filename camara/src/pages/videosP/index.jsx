import React from "react";
import { useTheme } from '../../contexts/ThemeContext';
import { Header } from '../../components/Header';
import { Container } from "react-bootstrap";
import { Videos } from "../../components/Videos"
import { LiveVideos } from "../../components/LiveVideos"
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Subheader } from '../../components/Subheader';
import { Bottom } from '../../components/Bottom';

const VideosP = () => {
  const { colors } = useTheme();

  return (
    <div style={{ backgroundColor: colors.backgroundAlt, minHeight: '100vh' }}>
      <Subheader />
      <Header />
      <Container style={{ maxWidth: '1200px', padding: '40px 20px' }}>
        <h1 style={{
          textAlign: 'center',
          marginBottom: '50px',
          color: colors.text,
          fontSize: '36px',
          fontWeight: 'bold'
        }}>
          Vídeos da Câmara dos Deputados
        </h1>
        <LiveVideos />
        <Videos />
      </Container>
      <Bottom />
    </div>
  );
};

export { VideosP };