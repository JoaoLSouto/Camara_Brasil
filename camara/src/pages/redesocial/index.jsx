import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Subheader } from '../../components/Subheader';
import { Bottom } from '../../components/Bottom';

const RedeSocial = () => {
  const [useNitter, setUseNitter] = useState(false);

  useEffect(() => {
    if (!useNitter) {
      // Limpa scripts antigos
      const oldScripts = document.querySelectorAll('script[src*="platform.twitter.com"]');
      oldScripts.forEach(s => s.remove());

      // Carrega o script do Twitter/X
      const script = document.createElement('script');
      script.src = 'https://platform.twitter.com/widgets.js';
      script.async = true;
      script.charset = 'utf-8';

      script.onload = () => {
        console.log('Script do Twitter carregado');
        if (window.twttr && window.twttr.widgets) {
          window.twttr.widgets.load();
        }
      };

      script.onerror = () => {
        console.error('Erro ao carregar script do Twitter');
      };

      document.body.appendChild(script);

      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    }
  }, [useNitter]);

  if (useNitter) {
    return (
      <div>
        <Subheader />
        <Header />
        <div style={{
          maxWidth: '800px',
          margin: '30px auto',
          padding: '20px'
        }}>
          <h2 style={{
            textAlign: 'center',
            marginBottom: '20px',
            color: '#14171a',
            fontSize: '24px',
            fontWeight: 'bold'
          }}>
            Feed da Câmara dos Deputados
          </h2>

          <div style={{
            padding: '15px',
            backgroundColor: '#e3f2fd',
            borderRadius: '8px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            <p style={{ margin: '0 0 10px 0', color: '#1976d2' }}>
              Visualizando através do Nitter (alternativa ao X/Twitter)
            </p>
            <button
              onClick={() => setUseNitter(false)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#1d9bf0',
                color: '#fff',
                border: 'none',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Tentar X/Twitter novamente
            </button>
          </div>

          <iframe
            src="https://nitter.poast.org/camaradeputados"
            style={{
              width: '100%',
              height: '800px',
              border: '1px solid #e1e8ed',
              borderRadius: '12px',
              backgroundColor: '#fff'
            }}
            title="Feed Câmara dos Deputados via Nitter"
          />
        </div>
        <Bottom />
      </div>
    );
  }

  return (
    <div>
      <Subheader />
      <Header />
      <div style={{
        maxWidth: '650px',
        margin: '30px auto',
        padding: '20px'
      }}>
        <h2 style={{
          textAlign: 'center',
          marginBottom: '30px',
          color: '#14171a',
          fontSize: '24px',
          fontWeight: 'bold'
        }}>
          Feed da Câmara dos Deputados
        </h2>

        <div style={{
          padding: '20px',
          backgroundColor: '#fff3cd',
          borderRadius: '8px',
          marginBottom: '20px',
          border: '1px solid #ffc107'
        }}>
          <p style={{ margin: '0 0 10px 0', color: '#856404', fontWeight: 'bold' }}>
            ⚠️ Erro 429 - Muitas Requisições
          </p>
          <p style={{ margin: '0 0 15px 0', color: '#856404', fontSize: '14px' }}>
            O Twitter está bloqueando temporariamente as requisições.
            Aguarde 15-30 minutos ou use a alternativa abaixo.
          </p>
          <button
            onClick={() => setUseNitter(true)}
            style={{
              padding: '10px 20px',
              backgroundColor: '#1d9bf0',
              color: '#fff',
              border: 'none',
              borderRadius: '20px',
              cursor: 'pointer',
              fontSize: '15px',
              fontWeight: 'bold'
            }}
          >
            Ver via Nitter (Alternativa)
          </button>
        </div>

        <div style={{
          backgroundColor: '#fff',
          borderRadius: '12px',
          padding: '10px',
          minHeight: '500px'
        }}>
          <a
            className="twitter-timeline"
            data-height="800"
            data-width="100%"
            data-theme="light"
            data-chrome="noheader noborders"
            data-tweet-limit="20"
            data-dnt="false"
            href="https://twitter.com/camaradeputados?ref_src=twsrc%5Etfw"
          >
            Posts de @camaradeputados
          </a>
        </div>

        <div style={{
          textAlign: 'center',
          marginTop: '20px'
        }}>
          <a
            href="https://twitter.com/camaradeputados"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              backgroundColor: '#1d9bf0',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '20px',
              fontSize: '15px',
              fontWeight: 'bold'
            }}
          >
            Abrir no X/Twitter →
          </a>
        </div>
      </div>
      <Bottom />
    </div>
  );
};

export { RedeSocial };
