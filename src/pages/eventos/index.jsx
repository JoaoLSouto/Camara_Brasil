import React, { useEffect, useState } from "react";
import { useTheme } from '../../contexts/ThemeContext';
import { Header } from '../../components/Header';
import { format } from 'date-fns';
import { Card, Container, Badge, Spinner, Row, Col, Button } from 'react-bootstrap';
import { Subheader } from '../../components/Subheader';
import { FaCalendarAlt, FaSearch, FaVideo, FaLandmark, FaMapMarkerAlt } from 'react-icons/fa';
import './index.css';
import { Bottom } from '../../components/Bottom';

const Eventos = () => {
  const { colors } = useTheme();
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroSituacao, setFiltroSituacao] = useState('Todos');

  useEffect(() => {
    const fetchEventos = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://dadosabertos.camara.leg.br/api/v2/eventos?itens=50');
        const data = await response.json();
        const eventosOrdenados = data.dados.sort((a, b) => {
          return new Date(b.dataHoraInicio) - new Date(a.dataHoraInicio);
        });
        setEventos(eventosOrdenados);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchEventos();
  }, []);

  const formatarDataHora = (dataHora) => {
    return format(new Date(dataHora), "dd/MM/yyyy 'às' HH:mm");
  };

  const getBadgeColor = (situacao) => {
    switch (situacao?.toLowerCase()) {
      case 'encerrada':
      case 'encerrado':
        return 'secondary';
      case 'em andamento':
        return 'success';
      case 'prevista':
        return 'warning';
      case 'cancelada':
      case 'cancelado':
        return 'danger';
      default:
        return 'info';
    }
  };

  const eventosFiltrados = filtroSituacao === 'Todos'
    ? eventos
    : eventos.filter(e => e.situacao === filtroSituacao);

  const situacoesDisponiveis = ['Todos', ...new Set(eventos.map(e => e.situacao))];

  return (
    <div style={{ backgroundColor: colors.backgroundAlt, minHeight: '100vh' }}>
      <Subheader />
      <Header />

      <Container style={{ padding: '40px 0' }}>
        <div style={{
          background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
          padding: '40px',
          marginBottom: '40px',
          borderRadius: '16px',
          color: 'white',
          boxShadow: '0 4px 20px rgba(40,167,69,0.2)'
        }}>
          <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <FaCalendarAlt /> Eventos da Câmara
          </h1>
          <p style={{ fontSize: '16px', opacity: 0.9, margin: 0 }}>
            Acompanhe as reuniões, sessões e audiências públicas
          </p>
        </div>

        {/* Filtros */}
        <Card style={{
          marginBottom: '30px',
          border: 'none',
          boxShadow: `0 2px 12px ${colors.shadow}`,
          borderRadius: '16px',
          backgroundColor: colors.card
        }}>
          <Card.Body style={{ padding: '25px' }}>
            <h5 style={{ marginBottom: '15px', color: colors.text, fontWeight: '600', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FaSearch /> Filtrar por Situação
            </h5>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {situacoesDisponiveis.map((situacao) => (
                <Badge
                  key={situacao}
                  bg={filtroSituacao === situacao ? 'success' : 'light'}
                  text={filtroSituacao === situacao ? 'white' : 'dark'}
                  style={{
                    padding: '8px 16px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    border: filtroSituacao === situacao ? 'none' : '2px solid #e0e0e0',
                    fontWeight: filtroSituacao === situacao ? '600' : '500',
                    transition: 'all 0.3s'
                  }}
                  onClick={() => setFiltroSituacao(situacao)}
                >
                  {situacao} {situacao === 'Todos' && `(${eventos.length})`}
                </Badge>
              ))}
            </div>
          </Card.Body>
        </Card>

        {loading ? (
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
            <p style={{ marginTop: '20px', fontSize: '18px', color: colors.textSecondary }}>
              Carregando eventos...
            </p>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '20px', color: colors.textSecondary }}>
              <strong>{eventosFiltrados.length}</strong> {eventosFiltrados.length === 1 ? 'evento encontrado' : 'eventos encontrados'}
            </div>

            {eventosFiltrados.length === 0 ? (
              <Card style={{
                border: 'none',
                borderRadius: '16px',
                padding: '60px',
                textAlign: 'center',
                boxShadow: `0 2px 12px ${colors.shadow}`,
                backgroundColor: colors.card
              }}>
                <div style={{ fontSize: '64px', marginBottom: '20px' }}>📭</div>
                <h4 style={{ color: colors.textSecondary, marginBottom: '10px' }}>Nenhum evento encontrado</h4>
                <p style={{ color: colors.textSecondary }}>
                  Tente ajustar os filtros ou volte mais tarde
                </p>
              </Card>
            ) : (
              <Row>
                {eventosFiltrados.map((evento) => (
                  <Col key={evento.id} xs={12} md={6} lg={4} style={{ marginBottom: '25px' }}>
                    <Card
                      className="evento-card"
                      style={{
                        border: 'none',
                        borderRadius: '16px',
                        height: '100%',
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
                      <Card.Body style={{ padding: '25px' }}>
                        {/* Header com data e situação */}
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          marginBottom: '15px'
                        }}>
                          <div style={{ flex: 1 }}>
                            <div style={{
                              fontSize: '13px',
                              color: '#28a745',
                              fontWeight: '600',
                              marginBottom: '5px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}>
                              <FaCalendarAlt /> {formatarDataHora(evento.dataHoraInicio)}
                            </div>
                          </div>
                          <Badge bg={getBadgeColor(evento.situacao)} style={{ fontSize: '11px' }}>
                            {evento.situacao}
                          </Badge>
                        </div>

                        {/* Tipo do evento */}
                        <h5 style={{
                          fontSize: '16px',
                          fontWeight: '700',
                          marginBottom: '15px',
                          color: colors.text,
                          lineHeight: '1.4'
                        }}>
                          {evento.descricaoTipo}
                        </h5>

                        {/* Descrição */}
                        {evento.descricao && (
                          <p style={{
                            fontSize: '14px',
                            color: colors.textSecondary,
                            marginBottom: '15px',
                            lineHeight: '1.6',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}>
                            {evento.descricao}
                          </p>
                        )}

                        {/* Órgão */}
                        {evento.orgaos && evento.orgaos.length > 0 && (
                          <div style={{
                            backgroundColor: colors.backgroundAlt,
                            padding: '12px',
                            borderRadius: '8px',
                            marginBottom: '12px'
                          }}>
                            <div style={{ fontSize: '12px', color: colors.textSecondary, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <FaLandmark /> Órgão
                            </div>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: colors.text }}>
                              {evento.orgaos[0].apelido}
                            </div>
                          </div>
                        )}

                        {/* Local */}
                        {evento.localCamara?.nome && (
                          <div style={{
                            backgroundColor: colors.backgroundAlt,
                            padding: '12px',
                            borderRadius: '8px',
                            marginBottom: '15px'
                          }}>
                            <div style={{ fontSize: '12px', color: colors.textSecondary, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <FaMapMarkerAlt /> Local
                            </div>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: colors.text }}>
                              {evento.localCamara.nome}
                            </div>
                          </div>
                        )}

                        {/* Botão para assistir */}
                        {evento.urlRegistro && (
                          <a
                            href={evento.urlRegistro}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: 'none' }}
                          >
                            <Button
                              style={{
                                width: '100%',
                                backgroundColor: '#28a745',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '10px',
                                fontWeight: '600',
                                fontSize: '14px',
                                transition: 'all 0.3s',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#218838';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#28a745';
                              }}
                            >
                              <FaVideo /> Assistir Evento
                            </Button>
                          </a>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </>
        )}
      </Container>
      <Bottom />
    </div>
  );
};

export { Eventos };
