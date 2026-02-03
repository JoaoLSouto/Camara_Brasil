import React, { useState } from "react";
import { useTheme } from '../../contexts/ThemeContext';
import { Header } from "../../components/Header";
import { Subheader } from '../../components/Subheader';
import { Bottom } from '../../components/Bottom';
import { FaTwitter, FaInstagram, FaExternalLinkAlt } from 'react-icons/fa';
import { Tabs, Tab, Card, Button } from 'react-bootstrap';
import { TwitterFeed } from '../../components/TwitterFeed';

const RedeSocial = () => {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState('instagram');

  return (
    <div style={{ backgroundColor: colors.backgroundAlt, minHeight: '100vh' }}>
      <Subheader />
      <Header />
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 20px'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
          padding: '40px',
          marginBottom: '40px',
          borderRadius: '16px',
          color: 'white',
          boxShadow: '0 4px 20px rgba(40,167,69,0.3)'
        }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '700',
            marginBottom: '10px'
          }}>
            Redes Sociais da Câmara
          </h1>
          <p style={{ fontSize: '16px', opacity: 0.9, margin: 0 }}>
            Acompanhe as atualizações oficiais nas redes sociais
          </p>
        </div>

        {/* Conteúdo com Abas */}
        <Card style={{
          border: 'none',
          boxShadow: `0 2px 12px ${colors.shadow}`,
          borderRadius: '16px',
          backgroundColor: colors.card,
          overflow: 'hidden'
        }}>
          <Card.Body style={{ padding: '20px' }}>
            <Tabs
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k)}
              className="mb-3"
              style={{ borderBottom: `2px solid ${colors.border}` }}
            >
              <Tab eventKey="instagram" title={
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: colors.text }}>
                  <FaInstagram /> Instagram
                </span>
              }>
                <div style={{ padding: '15px 0' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px',
                    flexWrap: 'wrap',
                    gap: '10px'
                  }}>
                    <h5 style={{ color: colors.text, margin: 0, fontWeight: '600' }}>
                      Feed @camaradosdeputados
                    </h5>
                    <Button
                      href="https://www.instagram.com/camaradosdeputados/"
                      target="_blank"
                      rel="noopener noreferrer"
                      size="sm"
                      style={{
                        background: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
                        border: 'none',
                        borderRadius: '20px',
                        padding: '8px 16px',
                        fontWeight: '600',
                        fontSize: '13px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <FaExternalLinkAlt size={11} /> Ver Perfil
                    </Button>
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    minHeight: '800px'
                  }}>
                    <iframe
                      src="https://www.instagram.com/camaradosdeputados/embed/"
                      title="Feed do Instagram da Câmara dos Deputados"
                      width="100%"
                      height="900"
                      frameBorder="0"
                      scrolling="yes"
                      allowTransparency="true"
                      style={{
                        border: 'none',
                        borderRadius: '12px',
                        backgroundColor: colors.background,
                        maxWidth: '540px'
                      }}
                    />
                  </div>

                  <div style={{
                    marginTop: '20px',
                    padding: '15px',
                    backgroundColor: colors.backgroundAlt,
                    borderRadius: '8px',
                    fontSize: '13px',
                    color: colors.textSecondary,
                    textAlign: 'center'
                  }}>
                    <strong>💡 Dica:</strong> Clique no botão "Ver Perfil" acima para ver todas as publicações no Instagram.
                  </div>
                </div>
              </Tab>

              <Tab eventKey="twitter" title={
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: colors.text }}>
                  <FaTwitter /> Feed do Twitter
                </span>
              }>
                <div style={{ padding: '15px 0' }}>
                  <TwitterFeed />
                </div>
              </Tab>
            </Tabs>
          </Card.Body>
        </Card>
      </div>
      <Bottom />
    </div>
  );
};

export { RedeSocial };
