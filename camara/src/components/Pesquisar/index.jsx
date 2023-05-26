import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Form, FormControl, Button, Dropdown } from 'react-bootstrap';
import { ModalD } from '../ModalD';
import Filtro from '../Filtro';
import './index.css';

const Pesquisar = () => {
  const [query, setQuery] = useState('');
  const [deputados, setDeputados] = useState([]);
  const [filteredDeputados, setFilteredDeputados] = useState([]);
  const [quantidadeDeputados, setQuantidadeDeputados] = useState(20);
  const [sortOrder, setSortOrder] = useState('asc');
  const [showModal, setShowModal] = useState(false);
  const [selectedDeputado, setSelectedDeputado] = useState(null);
  const [despesas, setDespesas] = useState([]);
  const [despesasVisiveis, setDespesasVisiveis] = useState(5);
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedState, setSelectedState] = useState('');

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
    const applyFilters = () => {
      const filtered = deputados.filter((deputado) => {
        if (selectedGender && deputado.genero !== selectedGender) {
          return false;
        }
        if (selectedStatus && deputado.status !== selectedStatus) {
          return false;
        }
        if (selectedState && deputado.siglaUf !== selectedState) {
          return false;
        }
        return true;
      });
      setFilteredDeputados(filtered);
    };

    applyFilters();
  }, [deputados, selectedGender, selectedStatus, selectedState]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
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
      <FormControl
  type="text"
  value={query}
  onChange={handleInputChange}
/>

<Dropdown>
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
      <Filtro
        selectedGender={selectedGender}
        selectedStatus={selectedStatus}
        selectedState={selectedState}
        handleGenderChange={handleGenderChange}
        handleStatusChange={handleStatusChange}
        handleStateChange={handleStateChange}
      />
      <Row className="text-center">
        {(selectedGender === '' && selectedStatus === '' && selectedState === '') ? (
          deputados.map((deputado) => (
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
          ))
        ) : (
          filteredDeputados.map((deputado) => (
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
          ))
        )}
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
      <ModalD
        showModal={showModal}
        setShowModal={setShowModal}
        selectedDeputado={selectedDeputado}
        despesas={despesas}
        despesasVisiveis={despesasVisiveis}
        handleShowMoreDespesas={handleShowMoreDespesas}
      />
    </div>
  );
};

export { Pesquisar };
