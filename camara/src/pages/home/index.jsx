import { useNavigate  } from "react-router-dom";
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';

import { Container, Title, TitleHighlight, TextContent} from './styles';

import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.css';

const Home = () => {

    const navigate = useNavigate();

    const handleClickSignIn = () => {
        navigate('/feed')
    }


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