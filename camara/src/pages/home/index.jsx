import { Header } from '../../components/Header';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.css';

const Home = () => {

    return (<>
        <Header />
        <div className="video-background">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="video-background__video"
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>
        </div>
    </>)
}

export { Home }