import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card } from "react-bootstrap";
import { Carousel as ResponsiveCarousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ReactPlayer from "react-player";

const Videos = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          "https://www.googleapis.com/youtube/v3/playlistItems", {
            params: {
              part: "snippet",
              maxResults: 5,
              playlistId: "PLhWY8l8K2BUPTSscuiHU4sLcRByYQxnp6",
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
        <h2>Voz do Brasil</h2>
        <ResponsiveCarousel
        >
          {videos.map((video) => (
           <div key={video.id}>
           <div >
             <Card>
               <Card.Body>
                 <Card.Title>{video.snippet.title}</Card.Title>
               </Card.Body>
             </Card>
             <ReactPlayer
               url={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`}
             />
           </div>
         </div>
       ))}
     </ResponsiveCarousel>
   </Container>
 </div>
  );
};

export { Videos };