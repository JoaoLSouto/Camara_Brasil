import React, { useEffect, useState } from "react";
import { Header } from '../../components/Header';
import { format } from 'date-fns';
import { Card, ListGroup, Accordion } from 'react-bootstrap';
import './index.css';

const Estatisticas = () => {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await fetch('https://dadosabertos.camara.leg.br/api/v2/eventos');
        const data = await response.json();
        const eventosOrdenados = data.dados.sort((a, b) => {
          return new Date(b.dataHoraInicio) - new Date(a.dataHoraInicio);
        });
        setEventos(eventosOrdenados);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEventos();
  }, []);

  const formatarDataHora = (dataHora) => {
    return format(new Date(dataHora), "dd/MM/yyyy HH:mm");
  };

  return (
    <div>
      <Header />
      <h2>Últimos eventos:</h2>
      <Accordion flush>
        {eventos.map((evento) => (
          <Card key={evento.id} className="mb-0">
            <Accordion.Item eventKey={evento.id}>
              <Accordion.Header>
                {formatarDataHora(evento.dataHoraInicio)} - {evento.orgaos[0]?.apelido}
              </Accordion.Header>
              <Accordion.Body>
                <Card.Body>
                <ListGroup className="list-group-flush">
                  <Card.Text>
                    <p>
                      <a href={evento.urlRegistro} target="_blank" rel="noopener noreferrer">
                        Assistir esse evento
                      </a>
                    </p>
                  </Card.Text>
                </ListGroup>
                  <ListGroup className="list-group-flush">
                    <Card.Text>Situação: {evento.situacao}</Card.Text>
                  </ListGroup>
                  <ListGroup className="list-group-flush">
                    <Card.Text>{evento.descricaoTipo}</Card.Text>
                  </ListGroup>
                  <ListGroup className="list-group-flush">
                    <Card.Text>Descrição: <p>{evento.descricao}</p></Card.Text>
                  </ListGroup>
                  <ListGroup className="list-group-flush">
                    <Card.Text>Local da Câmara: {evento.localCamara?.nome}</Card.Text>
                  </ListGroup>
                </Card.Body>
              </Accordion.Body>
            </Accordion.Item>
          </Card>
        ))}
      </Accordion>
    </div>
  );
};

export { Estatisticas };
