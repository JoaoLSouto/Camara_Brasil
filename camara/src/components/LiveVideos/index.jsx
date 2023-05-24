import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card } from "react-bootstrap";
import { Carousel as ResponsiveCarousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ReactPlayer from "react-player";

const LiveVideos = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          "https://www.googleapis.com/youtube/v3/search", {
            params: {
              part: "snippet",
              maxResults: 5,
              channelId: "UC-ZkSRh-7UEuwXJQ9UMCFJA",
              eventType: "live",
              type: "video",
              key: "AIzaSyDPCd7t9cOe9NuvhJ1BS-LB8ikdkuXLJtA"
            }
          }
        );

        setVideos(response.data.items);
      } catch (error) {
        console.error(error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div>
      <Container>
        <h2>Vídeos ao Vivo da Câmara</h2>
        <ResponsiveCarousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop={true}
            autoPlay={true}
            interval={3000}>
          {videos.map((video) => (
            <div key={video.id.videoId}>
              <Card>
               <Card.Body>
                  <Card.Title>{video.snippet.title}</Card.Title>
               </Card.Body>
             </Card>
                <ReactPlayer url={`https://www.youtube.com/watch?v=${video.id.videoId}`} controls={true}               
                 />
            </div>
          ))}
        </ResponsiveCarousel>
      </Container>
    </div>
  );
};

export { LiveVideos };
