import React from "react";
import { Header } from '../../components/Header';
import { Container } from "react-bootstrap";
import { Videos } from "../../components/Videos"
import { LiveVideos } from "../../components/LiveVideos"
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const VideosP = () => {

  return (
    <div>
      <Header />
      <Container>
      <LiveVideos />
      <Videos />
      </Container>
    </div>
  );
};

export { VideosP };