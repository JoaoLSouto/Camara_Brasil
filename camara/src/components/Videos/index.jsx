import React, { useState, useEffect } from "react";
import axios from "axios";

const Videos = () => {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const API_KEY = "AIzaSyDPCd7t9cOe9NuvhJ1BS-LB8ikdkuXLJtA";

        // Canais oficiais da Voz do Brasil
        const OFFICIAL_CHANNELS = ['CanalGov', 'Câmara dos Deputados', 'Rádio e TV Justiça', 'EBC'];

        // Primeiro, tentar buscar vídeo ao vivo da Voz do Brasil
        console.log('Buscando vídeo ao vivo da Voz do Brasil...');
        const liveResponse = await axios.get(
          "https://www.googleapis.com/youtube/v3/search", {
          params: {
            part: "snippet",
            q: "A Voz do Brasil",
            eventType: "live",
            type: "video",
            maxResults: 10,
            key: API_KEY
          }
        });

        console.log('Vídeos ao vivo encontrados:', liveResponse.data.items?.length || 0);

        // Procurar por vídeo ao vivo de canal oficial
        let selectedVideo = null;
        if (liveResponse.data.items && liveResponse.data.items.length > 0) {
          selectedVideo = liveResponse.data.items.find(v =>
            OFFICIAL_CHANNELS.some(channel =>
              v.snippet.channelTitle.includes(channel)
            )
          );

          if (selectedVideo) {
            setVideo(selectedVideo);
            setIsLive(true);
            setLoading(false);
            console.log('✅ Vídeo ao vivo oficial encontrado:', selectedVideo.snippet.title, '- Canal:', selectedVideo.snippet.channelTitle);
            return;
          }
        }

        // Se não houver vídeo ao vivo, buscar último vídeo gravado
        console.log('Nenhum vídeo ao vivo oficial, buscando últimos vídeos...');
        const recordedResponse = await axios.get(
          "https://www.googleapis.com/youtube/v3/search", {
          params: {
            part: "snippet",
            q: "A Voz do Brasil",
            order: "date",
            type: "video",
            maxResults: 15,
            key: API_KEY
          }
        });

        console.log('Últimos vídeos encontrados:', recordedResponse.data.items?.length || 0);

        if (recordedResponse.data.items && recordedResponse.data.items.length > 0) {
          // Procurar vídeo de canal oficial
          selectedVideo = recordedResponse.data.items.find(v =>
            OFFICIAL_CHANNELS.some(channel =>
              v.snippet.channelTitle.includes(channel)
            )
          );

          if (selectedVideo) {
            setVideo(selectedVideo);
            setIsLive(false);
            console.log('✅ Vídeo gravado oficial encontrado:', selectedVideo.snippet.title, '- Canal:', selectedVideo.snippet.channelTitle);
          } else {
            // Fallback: pegar o primeiro vídeo com "A Voz do Brasil" no título
            selectedVideo = recordedResponse.data.items[0];
            setVideo(selectedVideo);
            setIsLive(false);
            console.log('⚠️ Usando primeiro resultado:', selectedVideo.snippet.title, '- Canal:', selectedVideo.snippet.channelTitle);
          }
        }

        setLoading(false);
      } catch (error) {
        console.error('❌ Erro ao buscar vídeo:', error);
        setLoading(false);
      }
    };

    fetchVideo();
  }, []);

  return (
    <div style={{
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
      }}>📻 Voz do Brasil</h2>

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {loading ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            backgroundColor: '#f9f9f9',
            borderRadius: '12px',
            color: '#666'
          }}>
            <p style={{ fontSize: '18px', margin: 0 }}>Carregando...</p>
          </div>
        ) : video ? (
          <>
            {isLive && (
              <div style={{
                backgroundColor: '#ff0000',
                color: '#fff',
                padding: '10px 20px',
                borderRadius: '8px',
                textAlign: 'center',
                marginBottom: '20px',
                fontWeight: 'bold',
                fontSize: '16px',
                animation: 'pulse 2s infinite'
              }}>
                🔴 AO VIVO AGORA
              </div>
            )}

            <h3 style={{
              fontSize: '20px',
              color: '#1a1a1a',
              marginBottom: '25px',
              fontWeight: '600',
              lineHeight: '1.4',
              textAlign: 'center'
            }}>{video.snippet.title}</h3>

            <div style={{
              position: 'relative',
              paddingTop: '56.25%',
              backgroundColor: '#000',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
            }}>
              <iframe
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 0
                }}
                src={`https://www.youtube.com/embed/${video.id.videoId}?autoplay=${isLive ? 1 : 0}`}
                title={video.snippet.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            <div style={{
              marginTop: '20px',
              textAlign: 'center'
            }}>
              <a
                href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  padding: '12px 24px',
                  backgroundColor: '#ff0000',
                  color: '#fff',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontWeight: 'bold',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#cc0000'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#ff0000'}
              >
                ▶ Assistir no YouTube
              </a>
            </div>
          </>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            backgroundColor: '#f9f9f9',
            borderRadius: '12px',
            color: '#666'
          }}>
            <p style={{ fontSize: '18px', margin: '0 0 20px 0' }}>
              Nenhum vídeo disponível no momento
            </p>
            <a
              href="https://www.youtube.com/@canalgov/streams"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                padding: '12px 24px',
                backgroundColor: '#0066cc',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: 'bold'
              }}
            >
              Ver canal no YouTube
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export { Videos };
