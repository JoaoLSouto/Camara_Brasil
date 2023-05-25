import React, { useState } from 'react';
import { Form, Dropdown, ButtonGroup } from 'react-bootstrap';

const Filtro = ({
  selectedGender,
  selectedStatus,
  selectedState,
  selectedParty,
  setSelectedGender,
  setSelectedStatus,
  setSelectedState,
  setSelectedParty,
}) => {
  const [showAllDeputados, setShowAllDeputados] = useState(true);

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
    setShowAllDeputados(
      event.target.value === '' &&
      selectedStatus === '' &&
      selectedState === '' &&
      selectedParty === ''
    );
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
    setShowAllDeputados(
      selectedGender === '' &&
      event.target.value === '' &&
      selectedState === '' &&
      selectedParty === ''
    );
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    setShowAllDeputados(
      selectedGender === '' &&
      selectedStatus === '' &&
      event.target.value === '' &&
      selectedParty === ''
    );
  };

  const handlePartyChange = (event) => {
    setSelectedParty(event.target.value);
    setShowAllDeputados(
      selectedGender === '' &&
      selectedStatus === '' &&
      selectedState === '' &&
      event.target.value === ''
    );
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary" id="filtro-dropdown">
        Filtro
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.ItemText>
          <Form.Group>
            <Form.Label>Gênero</Form.Label>
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
              <option value="Afastado">Afastado</option>
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
              <option value="PODE">Podemos (PODE)</option>
              <option value="PROS">Partido Republicano da Ordem Social (PROS)</option>
              <option value="PTB">Partido Trabalhista Brasileiro (PTB)</option>
              <option value="PV">Partido Verde (PV)</option>
              <option value="REDE">Rede Sustentabilidade (REDE)</option>
              <option value="DC">Democracia Cristã (DC)</option>
              <option value="PMN">Partido da Mobilização Nacional (PMN)</option>
              <option value="PSC">Partido Social Cristão (PSC)</option>
              <option value="PRTB">Partido Renovador Trabalhista Brasileiro (PRTB)</option>
              <option value="PCB">Partido Comunista Brasileiro (PCB)</option>
              <option value="PCO">Partido da Causa Operária (PCO)</option>
              <option value="PSTU">Partido Socialista dos Trabalhadores Unificado (PSTU)</option>
              <option value="UP">Unidade Popular (UP)</option>
              <option value="PMB">Partido da Mulher Brasileira (PMB)</option>
              <option value="NOVO">Partido Novo (NOVO)</option>
              <option value="REDE">Rede Sustentabilidade (REDE)</option>
            </Form.Control>
          </Form.Group>
        </Dropdown.ItemText>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Filtro;
