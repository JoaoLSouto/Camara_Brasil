import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Row, Col } from 'react-bootstrap';

function NoticiasCard() {
  const [news, setNews] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
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
      });
  }, []);

  const handleShowMore = () => {
    setShowMore(true);
  };

  return (
    <div>
      <h1>Notícias da Câmara dos Deputados</h1>
      <Row xs={1} md={3} className="g-3">
  {news.slice(0, showMore ? news.length : 6).map((article, index) => (
    <Col key={index} xs={6}>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={article.urlToImage || 'https://via.placeholder.com/150'} />
        <Card.Body>
          <Card.Title>{article.title}</Card.Title>
          <Button href={article.url} target="_blank" variant="primary"                     
          style={{
                  backgroundColor: 'green',
                  display: 'block',
                  margin: '10px auto',
                }}>Ler mais</Button>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">{new Date(article.publishedAt).toLocaleString('pt-BR')}</small>
        </Card.Footer>
      </Card>
    </Col>
  ))}
</Row>

      {news.length > 6 && !showMore && (
        <button onClick={handleShowMore}
        style={{
          backgroundColor: 'green',
          display: 'block',
          margin: '0 auto',
        }}>Mostrar Mais
        </button>
      )}
    </div>
  );
}

export {NoticiasCard};
