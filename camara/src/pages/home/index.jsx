import React from 'react';

import { Header } from '../../components/Header';
import { Subheader } from '../../components/Subheader';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.css';

const Home = () => {

    return (<>
      <Subheader />
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