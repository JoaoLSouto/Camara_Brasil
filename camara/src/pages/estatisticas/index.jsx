import React, { useEffect, useState } from "react";
import { Header } from '../../components/Header';
import { format } from 'date-fns';
import { Card, ListGroup } from 'react-bootstrap';

const Estatisticas = () => {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await fetch('https://dadosabertos.camara.leg.br/api/v2/eventos');
        const data = await response.json();
        setEventos(data.dados);
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
      <h2>Ùltimos eventos:</h2>
      {eventos.map((evento) => (
        <Card key={evento.id} className="mb-4">
          <Card.Body>
          <Card.Title>{evento.orgaos[0]?.apelido}</Card.Title>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <Card.Text>Data e Hora: {formatarDataHora(evento.dataHoraInicio)} - {formatarDataHora(evento.dataHoraFim)}</Card.Text>
          </ListGroup> 
          <ListGroup className="list-group-flush">
            <Card.Text>Situação: {evento.situacao}</Card.Text>
          </ListGroup>
          <ListGroup className="list-group-flush">
            <Card.Text>{evento.descricaoTipo}</Card.Text>
          </ListGroup>
          <ListGroup className="list-group-flush">
            <Card.Text>Descrição: {evento.descricao}</Card.Text>
            </ListGroup>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>Local da Câmara: {evento.localCamara?.nome}</ListGroup.Item>
          </ListGroup>
          <Card.Body>
            <Card.Link href={evento.urlRegistro}>Ver este evento.</Card.Link>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export { Estatisticas };
