import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Form, FormControl, Button, Dropdown, Modal } from 'react-bootstrap';
import './index.css';

const Pesquisar = () => {
  const [query, setQuery] = useState('');
  const [deputados, setDeputados] = useState([]);
  const [quantidadeDeputados, setQuantidadeDeputados] = useState(20);
  const [sortOrder, setSortOrder] = useState('asc');
  const [filteredDeputados, setFilteredDeputados] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDeputado, setSelectedDeputado] = useState(null);
  const [despesas, setDespesas] = useState([]);
  const [despesasVisiveis, setDespesasVisiveis] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `https://dadosabertos.camara.leg.br/api/v2/deputados?nome=${query}`
      );
      setDeputados(result.data.dados);
    };
    fetchData();
  }, [query]);

  useEffect(() => {
    const sortDeputados = () => {
      const sortedDeputados = [...filteredDeputados].sort((a, b) => {
        const nameA = a.nome.toUpperCase();
        const nameB = b.nome.toUpperCase();
        if (sortOrder === 'asc') {
          return nameA.localeCompare(nameB);
        } else {
          return nameB.localeCompare(nameA);
        }
      });
      setFilteredDeputados(sortedDeputados);
    };

    sortDeputados();
  });

  useEffect(() => {
    setFilteredDeputados([...deputados]);
  }, [deputados]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleShowMoreClick = () => {
    setQuantidadeDeputados(quantidadeDeputados + 10);
  };

  const handleSortOrderClick = (order) => {
    setSortOrder(order);
  };

  const handleDeputadoClick = async (deputado) => {
    setSelectedDeputado(deputado);
    setShowModal(true);

    const result = await axios.get(
      `https://dadosabertos.camara.leg.br/api/v2/deputados/${deputado.id}/despesas?ordem=DESC&ano=2023`
    );
    setDespesas(result.data.dados);
    setDespesasVisiveis(5);
  };

  const handleShowMoreDespesas = () => {
    setDespesasVisiveis(despesasVisiveis + 5);
  };

  return (
    <div>
      <Form.Label style={{ fontSize: '30px', marginRight: '10px' }}>
        Pesquise um deputado ou veja a lista em ordem alfabética:
      </Form.Label>
      <Form className="d-flex align-items-center">
        <FormControl type="text" value={query} onChange={handleInputChange} />
        <Dropdown style={{ marginLeft: '10px' }}>
          <Dropdown.Toggle variant="secondary" id="sortDropdown">
            Classificar por
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleSortOrderClick('asc')}>
              Ordem Crescente
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleSortOrderClick('desc')}>
              Ordem Decrescente
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Form>
      <Row className="text-center">
        {filteredDeputados.slice(0, quantidadeDeputados).map((deputado) => (
          <div className="col-md-3" key={deputado.id}>
            <div className="deputado-card hover-effect">
              <img
                key={deputado.id}
                src={deputado.urlFoto}
                alt={deputado.nome}
                className="img-fluid"
                style={{ maxWidth: '120px' }}
                onClick={() => handleDeputadoClick(deputado)}
                />
                <h3>{deputado.nome}</h3>
            </div>
          </div>
        ))}
      </Row>
      {filteredDeputados.length > quantidadeDeputados && (
        <Button
          onClick={handleShowMoreClick}
          style={{
            backgroundColor: 'green',
            display: 'block',
            margin: '0 auto',
          }}
        >
          Mostrar Mais
        </Button>
      )}

      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          setDespesas([]);
          setDespesasVisiveis(5);
        }}
        dialogClassName="modal-content"
      >
        <Modal.Header closeButton>
          <Modal.Title>{selectedDeputado && selectedDeputado.nome}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="modal-dialog-scrollable">
          {selectedDeputado && (
            <div className="d-flex align-items-center justify-content-center flex-column">
              <img
                key={selectedDeputado.id}
                src={selectedDeputado.urlFoto}
                alt={selectedDeputado.nome}
                className="img-fluid mx-auto"
                style={{ maxWidth: '120px' }}
              />
              <div className="ml-4 text-center">
                <h4>Informações adicionais:</h4>
                <p>
                  Partido:{' '}
                  {selectedDeputado.siglaPartido
                    ? selectedDeputado.siglaPartido
                    : 'Não fornecido pela API'}
                </p>
                <p>
                  Email:{' '}
                  {selectedDeputado.email
                    ? selectedDeputado.email
                    : 'Não fornecido pela API'}
                </p>
                <p>
                  Estado:{' '}
                  {selectedDeputado.siglaUf
                    ? selectedDeputado.siglaUf
                    : 'Não fornecido pela API'}
                </p>
                <p>
                  Escolaridade:{' '}
                  {selectedDeputado.escolaridade
                    ? selectedDeputado.escolaridade
                    : 'Não fornecido pela API'}
                </p>
                <h4>Despesas:</h4>
                {despesas.length > 0 ? (
                  <ul>
                    {despesas.slice(0, despesasVisiveis).map((despesa) => (
                      <li key={despesa.id}>
                        {despesa.tipoDespesa} - Valor: R$ {despesa.valorLiquido}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Não há despesas registradas para este deputado.</p>
                )}
                {despesas.length > despesasVisiveis && (
                  <Button
                    onClick={handleShowMoreDespesas}
                    style={{
                      backgroundColor: 'green',
                      display: 'block',
                      margin: '10px auto',
                    }}
                  >
                    Ver mais despesas
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </Modal.Body>
      </Modal>
    </div>
  );
};

export { Pesquisar };