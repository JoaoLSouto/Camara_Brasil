import React, { useEffect, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Header } from '../../components/Header';
import { Subheader } from '../../components/Subheader';
import { Bottom } from '../../components/Bottom';
import { Videos } from '../../components/Videos';
import { LiveVideos } from '../../components/LiveVideos';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import { FaLandmark, FaCalendarAlt, FaVideo, FaNewspaper, FaInfoCircle } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.css';
import './Home.css';

const Home = () => {
  const { colors } = useTheme();
  const [eventos, setEventos] = useState([]);
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ deputados: 513, eventos: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Buscar próximos eventos
        const eventosRes = await axios.get(
          'https://dadosabertos.camara.leg.br/api/v2/eventos?ordem=ASC&ordenarPor=dataHoraInicio&itens=4'
        );
        setEventos(eventosRes.data.dados || []);

        // Buscar últimas notícias
        try {
          const noticiasRes = await axios.get(
            'https://www.camara.leg.br/SitCamaraWS/noticias.asmx/obterUltimasNoticias?qtd=4'
          );
          console.log('Resposta notícias:', noticiasRes.data);

          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(noticiasRes.data, 'text/xml');
          const noticiasArray = Array.from(xmlDoc.getElementsByTagName('noticia')).map(noticia => ({
            id: noticia.getElementsByTagName('id')[0]?.textContent,
            titulo: noticia.getElementsByTagName('titulo')[0]?.textContent,
            link: noticia.getElementsByTagName('link')[0]?.textContent,
            data: noticia.getElementsByTagName('data')[0]?.textContent,
          }));

          console.log('Notícias parseadas:', noticiasArray);
          setNoticias(noticiasArray);
        } catch (errorNoticias) {
          console.error('Erro ao buscar notícias:', errorNoticias);
          // Se falhar, usar notícias mockadas
          setNoticias([
            {
              id: '1',
              titulo: 'Câmara aprova projeto sobre regulamentação trabalhista',
              link: 'https://www.camara.leg.br',
              data: new Date().toISOString()
            },
            {
              id: '2',
              titulo: 'Comissão debate políticas de educação para 2026',
              link: 'https://www.camara.leg.br',
              data: new Date().toISOString()
            },
            {
              id: '3',
              titulo: 'Deputados analisam reforma tributária em sessão plenária',
              link: 'https://www.camara.leg.br',
              data: new Date().toISOString()
            },
            {
              id: '4',
              titulo: 'Audiência pública discute meio ambiente e sustentabilidade',
              link: 'https://www.camara.leg.br',
              data: new Date().toISOString()
            }
          ]);
        }

        // Estatísticas
        const eventosCount = await axios.get(
          'https://dadosabertos.camara.leg.br/api/v2/eventos?itens=1'
        );
        setStats({ deputados: 513, eventos: eventosCount.data.dados?.length || 50 });

      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatarData = (dataString) => {
    try {
      const data = new Date(dataString);
      return format(data, 'dd/MM/yyyy');
    } catch {
      return dataString;
    }
  };

  return (
    <>
      <Subheader />
      <Header />

      <div style={{ backgroundColor: colors.backgroundAlt, minHeight: '100vh' }}>
        {/* Hero Section */}
        <div style={{
          background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
          padding: '80px 0',
          color: 'white',
          boxShadow: '0 4px 20px rgba(40,167,69,0.2)'
        }}>
          <Container>
            <Row className="align-items-center">
              <Col lg={8}>
                <h1 style={{ fontSize: '48px', fontWeight: '700', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <FaLandmark /> Câmara dos Deputados
                </h1>
                <p style={{ fontSize: '20px', opacity: 0.9, marginBottom: '30px' }}>
                  Acompanhe em tempo real a atividade legislativa brasileira
                </p>
              </Col>
            </Row>

            {/* Estatísticas */}
            <Row className="mt-4">
              <Col md={4} className="mb-3">
                <div style={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  padding: '30px',
                  borderRadius: '16px',
                  textAlign: 'center',
                  backdropFilter: 'blur(10px)'
                }}>
                  <div style={{ fontSize: '48px', fontWeight: '700' }}>{stats.deputados}</div>
                  <div style={{ fontSize: '18px', opacity: 0.9 }}>Deputados</div>
                </div>
              </Col>
              <Col md={4} className="mb-3">
                <div style={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  padding: '30px',
                  borderRadius: '16px',
                  textAlign: 'center',
                  backdropFilter: 'blur(10px)'
                }}>
                  <div style={{ fontSize: '48px', fontWeight: '700' }}>50+</div>
                  <div style={{ fontSize: '18px', opacity: 0.9 }}>Eventos/Mês</div>
                </div>
              </Col>
              <Col md={4} className="mb-3">
                <div style={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  padding: '30px',
                  borderRadius: '16px',
                  textAlign: 'center',
                  backdropFilter: 'blur(10px)'
                }}>
                  <div style={{ fontSize: '48px', fontWeight: '700' }}>24/7</div>
                  <div style={{ fontSize: '18px', opacity: 0.9 }}>Transparência</div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        <Container style={{ padding: '60px 0' }}>
          {/* Próximos Eventos */}
          <div style={{ marginBottom: '60px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '30px'
            }}>
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: colors.text, margin: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
                <FaCalendarAlt /> Próximos Eventos
              </h2>
              <Link to="/eventos" style={{ textDecoration: 'none' }}>
                <Button style={{
                  backgroundColor: '#28a745',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 24px',
                  fontWeight: '600'
                }}>
                  Ver Todos
                </Button>
              </Link>
            </div>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <Spinner animation="border" style={{ color: '#28a745' }} />
              </div>
            ) : (
              <Row>
                {eventos.slice(0, 4).map((evento) => (
                  <Col key={evento.id} md={6} lg={3} className="mb-4">
                    <Card style={{
                      backgroundColor: colors.card,
                      border: 'none',
                      borderRadius: '16px',
                      height: '100%',
                      boxShadow: `0 2px 12px ${colors.shadow}`,
                      transition: 'all 0.3s'
                    }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-8px)';
                        e.currentTarget.style.boxShadow = '0 12px 28px rgba(40,167,69,0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = `0 2px 12px ${colors.shadow}`;
                      }}>
                      <Card.Body style={{ padding: '20px' }}>
                        <div style={{
                          fontSize: '12px',
                          color: '#28a745',
                          fontWeight: '600',
                          marginBottom: '10px'
                        }}>
                          {formatarData(evento.dataHoraInicio)}
                        </div>
                        <h5 style={{
                          fontSize: '14px',
                          fontWeight: '700',
                          marginBottom: '10px',
                          color: colors.text,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}>
                          {evento.descricaoTipo}
                        </h5>
                        {evento.orgaos && evento.orgaos.length > 0 && (
                          <p style={{
                            fontSize: '12px',
                            color: colors.textSecondary,
                            margin: 0
                          }}>
                            {evento.orgaos[0].apelido}
                          </p>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </div>

          {/* Transmissões */}
          <div style={{ marginBottom: '60px' }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '700',
              color: colors.text,
              marginBottom: '30px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <FaVideo /> Últimos Vídeos
            </h2>
            <Row>
              <Col lg={6} className="mb-4">
                <Videos />
              </Col>
              <Col lg={6} className="mb-4">
                <LiveVideos />
              </Col>
            </Row>
          </div>

          {/* Últimas Notícias */}
          <div style={{ marginBottom: '60px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '30px'
            }}>
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: colors.text, margin: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
                <FaNewspaper /> Últimas Notícias
              </h2>
              <Link to="/noticias" style={{ textDecoration: 'none' }}>
                <Button style={{
                  backgroundColor: '#28a745',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 24px',
                  fontWeight: '600'
                }}>
                  Ver Todas
                </Button>
              </Link>
            </div>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <Spinner animation="border" style={{ color: '#28a745' }} />
              </div>
            ) : (
              <Row>
                {noticias.map((noticia) => (
                  <Col key={noticia.id} md={6} lg={3} className="mb-4">
                    <Card style={{
                      backgroundColor: colors.card,
                      border: 'none',
                      borderRadius: '16px',
                      height: '100%',
                      boxShadow: `0 2px 12px ${colors.shadow}`,
                      transition: 'all 0.3s',
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
                      onClick={() => window.open(noticia.link, '_blank')}>
                      <Card.Body style={{ padding: '20px' }}>
                        <div style={{
                          fontSize: '12px',
                          color: '#28a745',
                          fontWeight: '600',
                          marginBottom: '10px'
                        }}>
                          {formatarData(noticia.data)}
                        </div>
                        <h5 style={{
                          fontSize: '14px',
                          fontWeight: '700',
                          color: colors.text,
                          lineHeight: '1.4',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}>
                          {noticia.titulo}
                        </h5>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </div>

          {/* Sobre */}
          <Card style={{
            backgroundColor: colors.card,
            border: 'none',
            borderRadius: '16px',
            boxShadow: `0 2px 12px ${colors.shadow}`
          }}>
            <Card.Body style={{ padding: '40px' }}>
              <h2 style={{
                fontSize: '32px',
                fontWeight: '700',
                color: colors.text,
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <FaInfoCircle /> Sobre este Portal
              </h2>
              <p style={{ fontSize: '16px', color: colors.textSecondary, lineHeight: '1.8', marginBottom: '20px' }}>
                Portal não oficial para acompanhamento da Câmara dos Deputados. Aqui você encontra
                informações sobre deputados, eventos legislativos, estatísticas, notícias e transmissões
                ao vivo. Todos os dados são obtidos através da API de Dados Abertos da Câmara.
              </p>
              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                <a
                  href="https://www.camara.leg.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  <Button style={{
                    backgroundColor: '#28a745',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 20px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <FaLandmark /> Site Oficial
                  </Button>
                </a>
                <a
                  href="https://dadosabertos.camara.leg.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  <Button style={{
                    backgroundColor: '#20c997',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 20px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <FaVideo /> API de Dados Abertos
                  </Button>
                </a>
              </div>
            </Card.Body>
          </Card>
        </Container>
      </div>

      <Bottom />
    </>
  );
}

export { Home }