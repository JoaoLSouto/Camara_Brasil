import React, { useState, useEffect } from "react";
import axios from "axios";
import { Header } from '../../components/Header';
import { Card, Row, Col } from "react-bootstrap";
import ReactPlayer from "react-player";

const Videos = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Função assíncrona para buscar os vídeos do YouTube
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          "https://www.googleapis.com/youtube/v3/playlistItems", {
            params: {
              part: "snippet",
              maxResults: 10, // Defina o número máximo de vídeos que você deseja exibir
              playlistId: "PLitz1J-q25kPRgqVugWcL7PwHO_hIWyJD", // Substitua pela ID da playlist do YouTube
              key: "AIzaSyDPCd7t9cOe9NuvhJ1BS-LB8ikdkuXLJtA" // Substitua pela sua chave de API do YouTube
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
      <Header />
      <Row>
        {videos.map((video) => (
          <Col md={4} key={video.id}>
            <Card>
              <ReactPlayer url={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`} />
              <Card.Body>
                <Card.Title>{video.snippet.title}</Card.Title>
                <Card.Text>{video.snippet.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export { Videos };