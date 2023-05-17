import React, { useState, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import axios from 'axios';

function DeputadosCard () {
  const [deputados, setDeputados] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://dadosabertos.camara.leg.br/api/v2/deputados');
      setDeputados(response.data.dados);
    };
    fetchData();
  }, []);
  return (
      <>
        <Row>
          <h1>Deputados</h1>
          {deputados.map(deputado => (
            <div className='col-md-3' key={deputado.id}>
              <h3>{deputado.nome}</h3>
              <img 
                  key={deputado.id}
                  src={deputado.urlFoto}
                  alt={deputado.nome}
                  className="img-fluid" 
                  style={{ maxWidth: '120px' }} 
                />
            </div>
          ))}
      </Row>
      </>
  );
}


export { DeputadosCard }