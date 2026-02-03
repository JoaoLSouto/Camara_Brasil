import React, { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import axios from 'axios';
import { Card, Button, Row, Col, Spinner } from 'react-bootstrap';
import { FaExternalLinkAlt, FaClock } from 'react-icons/fa';

function NoticiasCard() {
  const { colors } = useTheme();
  const [news, setNews] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        'https://newsapi.org/v2/everything', {
        params: {
          q: 'câmara dos deputados',
          language: 'pt',
          apiKey: '52dad923ede948719e9fbf65bfb6fcf3',
          sortBy: 'publishedAt',
        }
      }
      )
      .then((response) => {
        setNews(response.data.articles);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleShowMore = () => {
    setShowMore(true);
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px',
        backgroundColor: colors.card,
        borderRadius: '16px',
        padding: '60px'
      }}>
        <Spinner animation="border" style={{ width: '4rem', height: '4rem', color: '#28a745' }} />
        <p style={{ marginTop: '20px', fontSize: '18px', color: colors.textSecondary, fontWeight: '500' }}>
          Carregando notícias...
        </p>
      </div>
    );
  }

  return (
    <div>
      <Row xs={1} md={2} lg={3} className="g-4">
        {news.slice(0, showMore ? news.length : 9).map((article, index) => (
          <Col key={index}>
            <Card
              style={{
                height: '100%',
                border: 'none',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: `0 2px 12px ${colors.shadow}`,
                backgroundColor: colors.card,
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 12px 28px rgba(40,167,69,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = `0 2px 12px ${colors.shadow}`;
              }}
            >
              <div style={{
                height: '200px',
                overflow: 'hidden',
                backgroundColor: colors.backgroundAlt,
                position: 'relative'
              }}>
                <Card.Img
                  variant="top"
                  src={article.urlToImage || 'https://via.placeholder.com/400x200/28a745/ffffff?text=Sem+Imagem'}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                />
              </div>
              <Card.Body style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <Card.Title style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: colors.text,
                  lineHeight: '1.4',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  minHeight: '50px'
                }}>
                  {article.title}
                </Card.Title>

                {article.description && (
                  <p style={{
                    fontSize: '14px',
                    color: colors.textSecondary,
                    lineHeight: '1.6',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    margin: 0
                  }}>
                    {article.description}
                  </p>
                )}

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '13px',
                  color: colors.textSecondary,
                  marginTop: 'auto',
                  paddingTop: '15px',
                  borderTop: `1px solid ${colors.border}`
                }}>
                  <FaClock />
                  {new Date(article.publishedAt).toLocaleString('pt-BR', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>

                <Button
                  href={article.url}
                  target="_blank"
                  style={{
                    backgroundColor: '#28a745',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 20px',
                    fontWeight: '600',
                    fontSize: '14px',
                    transition: 'all 0.3s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#218838'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#28a745'}
                >
                  Ler mais <FaExternalLinkAlt size={12} />
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {news.length > 9 && !showMore && (
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Button
            onClick={handleShowMore}
            style={{
              backgroundColor: '#28a745',
              border: 'none',
              padding: '12px 32px',
              fontSize: '16px',
              fontWeight: '600',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(40,167,69,0.2)',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.backgroundColor = '#218838';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.backgroundColor = '#28a745';
            }}
          >
            Carregar Mais Notícias
          </Button>
        </div>
      )}
    </div>
  );
}

export { NoticiasCard };
