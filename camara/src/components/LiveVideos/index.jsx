import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card } from "react-bootstrap";
import { Carousel as ResponsiveCarousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ReactPlayer from "react-player";

import "./videoslive.css"

const LiveVideos = () => {
  const [videos, setVideos] = useState([]);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const API_KEY = "AIzaSyDPCd7t9cOe9NuvhJ1BS-LB8ikdkuXLJtA";
        const CHANNEL_ID = "UC-ZkSRh-7UEuwXJQ9UMCFJA"; // Câmara dos Deputados

        // Primeiro, tentar buscar vídeos ao vivo
        console.log('🔴 Buscando vídeos ao vivo da Câmara...');
        const liveResponse = await axios.get(
          "https://www.googleapis.com/youtube/v3/search", {
          params: {
            part: "snippet",
            channelId: CHANNEL_ID,
            eventType: "live",
            type: "video",
            maxResults: 5,
            key: API_KEY
          }
        });

        console.log('Vídeos ao vivo encontrados:', liveResponse.data.items?.length || 0);

        if (liveResponse.data.items && liveResponse.data.items.length > 0) {
          setVideos(liveResponse.data.items);
          setIsLive(true);
          console.log('✅ Exibindo vídeos ao vivo');
        } else {
          // Se não houver ao vivo, buscar últimos vídeos gravados
          console.log('Nenhum vídeo ao vivo, buscando últimas transmissões...');
          const recordedResponse = await axios.get(
            "https://www.googleapis.com/youtube/v3/search", {
            params: {
              part: "snippet",
              channelId: CHANNEL_ID,
              order: "date",
              type: "video",
              maxResults: 5,
              key: API_KEY
            }
          });

          console.log('Últimas transmissões encontradas:', recordedResponse.data.items?.length || 0);

          if (recordedResponse.data.items && recordedResponse.data.items.length > 0) {
            setVideos(recordedResponse.data.items);
            setIsLive(false);
            console.log('✅ Exibindo últimas transmissões gravadas');
          }
        }
      } catch (error) {
        console.error('❌ Erro ao buscar vídeos:', error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div style={{
      marginBottom: '60px',
      backgroundColor: '#fff',
      borderRadius: '16px',
      padding: '40px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
    }}>
      <h2 style={{
        textAlign: 'center',
        marginBottom: '30px',
        color: '#1a1a1a',
        fontSize: '28px',
        fontWeight: 'bold',
        borderBottom: '3px solid #0066cc',
        paddingBottom: '15px',
        display: 'inline-block',
        width: '100%'
      }}>🔴 Vídeos ao Vivo da Câmara</h2>

      {videos.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          backgroundColor: '#f9f9f9',
          borderRadius: '12px',
          color: '#666'
        }}>
          <p style={{ fontSize: '18px', margin: 0 }}>Nenhuma transmissão ao vivo no momento</p>
        </div>
      ) : (
        <ResponsiveCarousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop={false}
          autoPlay={false}
          interval={3000}
          className="carousel-root">
          {videos.map((video) => (
            <div key={video.id.videoId} style={{
              padding: '0 20px',
              marginBottom: '20px'
            }}>
              <h3 style={{
                fontSize: '20px',
                color: '#1a1a1a',
                marginBottom: '20px',
                fontWeight: '600',
                lineHeight: '1.4'
              }}>
                {isLive && <span style={{ color: '#ff0000', marginRight: '8px' }}>🔴 AO VIVO</span>}
                {video.snippet.title}
              </h3>
              <div style={{
                position: 'relative',
                paddingTop: '56.25%',
                backgroundColor: '#000',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
              }}>
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                  controls={true}
                  width="100%"
                  height="100%"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0
                  }}
                />
              </div>
            </div>
          ))}
        </ResponsiveCarousel>
      )}
    </div>
  );
};

export { LiveVideos };
