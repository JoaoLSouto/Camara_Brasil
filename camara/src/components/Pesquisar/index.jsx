import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Form, FormControl, Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import { ModalD } from '../ModalD';
import './index.css';

const Pesquisar = () => {
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedDeputado, setSelectedDeputado] = useState(null);
  const [despesas, setDespesas] = useState([]);
  const [despesasVisiveis, setDespesasVisiveis] = useState(5);
  const [deputados, setDeputados] = useState([]);
  const [filteredDeputados, setFilteredDeputados] = useState([]);
  const [quantidadeDeputados, setQuantidadeDeputados] = useState(20);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedParty, setSelectedParty] = useState('');
  const [deputadosEncontrados, setDeputadosEncontrados] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://dadosabertos.camara.leg.br/api/v2/deputados?nome=${query}`
        );
        setDeputados(response.data.dados);
      } catch (error) {
        console.error('Erro ao buscar deputados:', error);
      }
    };
  
    fetchData();
  }, [query]);
  
  const handleShowMoreClick = () => {
    setQuantidadeDeputados(quantidadeDeputados + 20);
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

  const handleGenderChange = (event) => {
    const { id, checked } = event.target;
  
    if (id === 'masculino-checkbox' && checked) {
      setSelectedGender('M');
    } else if (id === 'feminino-checkbox' && checked) {
      setSelectedGender('F');
    } else {
      setSelectedGender('');
    }
  };

const handleStatusChange = (event) => {
  setSelectedStatus(event.target.value);
  return;
};

const handleStateChange = (event) => {
  setSelectedState(event.target.value);
  return;
};

const handlePartyChange = (event) => {
  setSelectedParty(event.target.value);
  return;
};

const filterDeputados = () => {
  const filtered = deputados.filter((deputado) => {
    if (selectedGender && deputado.sexo !== selectedGender.toUpperCase()) {
      return false;
    }
    if (selectedStatus && deputado.situacao !== selectedStatus) {
      return false;
    }
    if (selectedState && deputado.siglaUf !== selectedState) {
      return false;
    }
    if (selectedParty && deputado.siglaPartido !== selectedParty) {
      return false;
    }
    return true;
  });

  setFilteredDeputados(filtered);
  setQuantidadeDeputados(20);
  setDeputadosEncontrados(filtered.length);
};

useEffect(() => {
  filterDeputados();
}, [deputados, selectedGender, selectedStatus, selectedState, selectedParty]);

  return (
    <div>
      <Form.Label style={{ fontSize: '30px', marginRight: '10px' }}>
        Pesquise um deputado ou veja a lista em ordem alfabética:
      </Form.Label>
      <Form className="d-flex align-items-center">
        <FormControl
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </Form>
      <p>{deputadosEncontrados} deputados encontrados</p>
      <Dropdown>
      <Dropdown.Toggle variant="primary" id="filtro-dropdown">
        Filtro
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.ItemText>
          <Form.Group>
            <Form.Label>Gênero:</Form.Label>
            <ButtonGroup>
            <Form.Check
              type="checkbox"
              id="masculino-checkbox"
              label="Masculino"
              checked={selectedGender === 'M'}
              onChange={handleGenderChange}
            />
            <Form.Check
              type="checkbox"
              id="feminino-checkbox"
              label="Feminino"
              checked={selectedGender === 'F'}
              onChange={handleGenderChange}
            />
            </ButtonGroup>
          </Form.Group>
        </Dropdown.ItemText>
        <Dropdown.ItemText>
          <Form.Group>
            <Form.Label>Status de Atividade</Form.Label>
            <Form.Control
              as="select"
              value={selectedStatus}
              onChange={handleStatusChange}
            >
              <option value="">Todos</option>
              <option value="Exercicio">Em Exercício</option>
              <option value="Licenca">Em Licença</option>
              <option value="expirado">Mandato Expirado</option>
              <option value="Suplencia">Suplência</option>
            </Form.Control>
          </Form.Group>
        </Dropdown.ItemText>
        <Dropdown.ItemText>
          <Form.Group>
            <Form.Label>Estado</Form.Label>
            <Form.Control
              as="select"
              value={selectedState}
              onChange={handleStateChange}
            >
              <option value="">Todos</option>
              <option value="AC">Acre</option>
              <option value="AL">Alagoas</option>
              <option value="AP">Amapá</option>
              <option value="AM">Amazonas</option>
              <option value="BA">Bahia</option>
              <option value="CE">Ceará</option>
              <option value="DF">Distrito Federal</option>
              <option value="ES">Espírito Santo</option>
              <option value="GO">Goiás</option>
              <option value="MA">Maranhão</option>
              <option value="MT">Mato Grosso</option>
              <option value="MS">Mato Grosso do Sul</option>
              <option value="MG">Minas Gerais</option>
              <option value="PA">Pará</option>
              <option value="PB">Paraíba</option>
              <option value="PR">Paraná</option>
              <option value="PE">Pernambuco</option>
              <option value="PI">Piauí</option>
              <option value="RJ">Rio de Janeiro</option>
              <option value="RN">Rio Grande do Norte</option>
              <option value="RS">Rio Grande do Sul</option>
              <option value="RO">Rondônia</option>
              <option value="RR">Roraima</option>
              <option value="SC">Santa Catarina</option>
              <option value="SP">São Paulo</option>
              <option value="SE">Sergipe</option>
              <option value="TO">Tocantins</option>
            </Form.Control>
          </Form.Group>
        </Dropdown.ItemText>
        <Dropdown.ItemText>
          <Form.Group>
            <Form.Label>Partido</Form.Label>
            <Form.Control
              as="select"
              value={selectedParty}
              onChange={handlePartyChange}
            >
              <option value="">Todos</option>
              <option value="PT">Partido dos Trabalhadores (PT)</option>
              <option value="PSDB">Partido da Social Democracia Brasileira (PSDB)</option>
              <option value="MDB">Movimento Democrático Brasileiro (MDB)</option>
              <option value="PSL">Partido Social Liberal (PSL)</option>
              <option value="DEM">Democratas (DEM)</option>
              <option value="PP">Progressistas (PP)</option>
              <option value="PSB">Partido Socialista Brasileiro (PSB)</option>
              <option value="PL">Partido Liberal (PL)</option>
              <option value="PDT">Partido Democrático Trabalhista (PDT)</option>
              <option value="REPUBLICANOS">Republicanos (REPUBLICANOS)</option>
              <option value="PSD">Partido Social Democrático (PSD)</option>
              <option value="PSOL">Partido Socialismo e Liberdade (PSOL)</option>
              <option value="PCdoB">Partido Comunista do Brasil (PCdoB)</option>
              <option value="NOVO">Partido Novo (NOVO)</option>
              <option value="CIDADANIA">Cidadania (CIDADANIA)</option>
              <option value="AVANTE">Avante (AVANTE)</option>
              <option value="PATRIOTA">Patriota (PATRIOTA)</option>
              <option value="SOLIDARIEDADE">Solidariedade (SOLIDARIEDADE)</option>
              <option value="PROS">Partido Republicano da Ordem Social (PROS)</option>
              <option value="PV">Partido Verde (PV)</option>
              <option value="PSC">Partido Social Cristão (PSC)</option>
              <option value="PTB">Partido Trabalhista Brasileiro (PTB)</option>
              <option value="DC">Democracia Cristã (DC)</option>
              <option value="PMN">Partido da Mobilização Nacional (PMN)</option>
              <option value="PRTB">Partido Renovador Trabalhista Brasileiro (PRTB)</option>
              <option value="PODE">Podemos (PODE)</option>
              <option value="PMB">Partido da Mulher Brasileira (PMB)</option>
              <option value="PROGRESSISTAS">Partido Progressistas (PROGRESSISTAS)</option>
              <option value="PTC">Partido Trabalhista Cristão (PTC)</option>
              <option value="PTdoB">Partido Trabalhista do Brasil (PTdoB)</option>
              <option value="REDE">Rede Sustentabilidade (REDE)</option>
              <option value="PATRI">Patriota (PATRI)</option>
              <option value="PMDB">Partido do Movimento Democrático Brasileiro (PMDB)</option>
              <option value="PHS">Partido Humanista da Solidariedade (PHS)</option>
              <option value="PPL">Partido Pátria Livre (PPL)</option>
              <option value="PRB">Partido Republicano Brasileiro (PRB)</option>
              <option value="PSDC">Partido Social Democrata Cristão (PSDC)</option>
              <option value="PSL">Partido Social Liberal (PSL)</option>
              <option value="PSTU">Partido Socialista dos Trabalhadores Unificado (PSTU)</option>
              <option value="PTN">Partido Trabalhista Nacional (PTN)</option>
              <option value="PV">Partido Verde (PV)</option>
              <option value="SD">Solidariedade (SD)</option>
              <option value="UP">Unidade Popular (UP)</option>
            </Form.Control>
          </Form.Group>
        </Dropdown.ItemText>
        <Dropdown.ItemText>
          <Button variant="primary" onClick={filterDeputados}>
            Filtrar
          </Button>
        </Dropdown.ItemText>
      </Dropdown.Menu>
    </Dropdown>
      <Row className="text-center">
        {(selectedGender === '' && selectedStatus === '' && selectedState === '')
          ? deputados.slice(0, quantidadeDeputados).map((deputado) => (
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
          : filteredDeputados.slice(0, quantidadeDeputados).map((deputado) => (
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
