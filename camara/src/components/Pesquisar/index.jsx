import React, { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import axios from 'axios';
import { Row, Form, FormControl, Button, Dropdown, ButtonGroup, Spinner } from 'react-bootstrap';
import { ModalD } from '../ModalD';
import { FaSearch, FaFilter, FaLandmark, FaMapMarkerAlt } from 'react-icons/fa';
import './index.css';

const Pesquisar = () => {
  const { colors } = useTheme();
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedDeputado, setSelectedDeputado] = useState(null);
  const [despesas, setDespesas] = useState([]);
  const [despesasVisiveis, setDespesasVisiveis] = useState(5);
  const [deputados, setDeputados] = useState([]);
  const [filteredDeputados, setFilteredDeputados] = useState([]);
  const [quantidadeDeputados, setQuantidadeDeputados] = useState(20);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedParty, setSelectedParty] = useState('');
  const [deputadosEncontrados, setDeputadosEncontrados] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [discursos, setDiscursos] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [frentes, setFrentes] = useState([]);
  const [orgaos, setOrgaos] = useState([]);
  const [profissoes, setProfissoes] = useState([]);
  const [historico, setHistorico] = useState([]);
  const [dadosCompletos, setDadosCompletos] = useState(null);
  const [loadingModal, setLoadingModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://dadosabertos.camara.leg.br/api/v2/deputados?nome=${query}`
        );
        setDeputados(response.data.dados);
      } catch (error) {
        console.error('Erro ao buscar deputados:', error);
      } finally {
        setLoading(false);
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
    setLoadingModal(true);

    // Resetar estados para evitar dados antigos
    setDespesas([]);
    setDiscursos([]);
    setEventos([]);
    setFrentes([]);
    setOrgaos([]);
    setProfissoes([]);
    setHistorico([]);
    setDadosCompletos(null);

    try {
      console.log('🔍 Buscando informações do deputado:', deputado.id);

      // Buscar todas as informações em paralelo com allSettled (continua mesmo se uma falhar)
      const results = await Promise.allSettled([
        axios.get(`https://dadosabertos.camara.leg.br/api/v2/deputados/${deputado.id}/despesas?ordem=DESC&ano=2024`).catch(() => ({ data: { dados: [] } })),
        axios.get(`https://dadosabertos.camara.leg.br/api/v2/deputados/${deputado.id}/discursos?ordenarPor=dataHoraInicio&ordem=DESC&pagina=1&itens=10`).catch(() => ({ data: { dados: [] } })),
        axios.get(`https://dadosabertos.camara.leg.br/api/v2/deputados/${deputado.id}/eventos?ordenarPor=dataHoraInicio&ordem=DESC&pagina=1&itens=10`).catch(() => ({ data: { dados: [] } })),
        axios.get(`https://dadosabertos.camara.leg.br/api/v2/deputados/${deputado.id}/frentes`).catch(() => ({ data: { dados: [] } })),
        axios.get(`https://dadosabertos.camara.leg.br/api/v2/deputados/${deputado.id}/orgaos`).catch(() => ({ data: { dados: [] } })),
        axios.get(`https://dadosabertos.camara.leg.br/api/v2/deputados/${deputado.id}/profissoes`).catch(() => ({ data: { dados: [] } })),
        axios.get(`https://dadosabertos.camara.leg.br/api/v2/deputados/${deputado.id}/historico`).catch(() => ({ data: { dados: [] } })),
        axios.get(`https://dadosabertos.camara.leg.br/api/v2/deputados/${deputado.id}`).catch(() => ({ data: { dados: null } }))
      ]);

      // Processar resultados com segurança
      const [despesasRes, discursosRes, eventosRes, frentesRes, orgaosRes, profissoesRes, historicoRes, dadosRes] = results;

      console.log('📊 Resultados:', {
        despesas: despesasRes.value?.data?.dados?.length || 0,
        discursos: discursosRes.value?.data?.dados?.length || 0,
        eventos: eventosRes.value?.data?.dados?.length || 0,
        frentes: frentesRes.value?.data?.dados?.length || 0,
        orgaos: orgaosRes.value?.data?.dados?.length || 0,
        profissoes: profissoesRes.value?.data?.dados?.length || 0,
        historico: historicoRes.value?.data?.dados?.length || 0,
        dadosCompletos: dadosRes.value?.data?.dados ? 'OK' : 'VAZIO'
      });

      setDespesas(despesasRes.status === 'fulfilled' && despesasRes.value?.data?.dados ? despesasRes.value.data.dados : []);
      setDiscursos(discursosRes.status === 'fulfilled' && discursosRes.value?.data?.dados ? discursosRes.value.data.dados : []);
      setEventos(eventosRes.status === 'fulfilled' && eventosRes.value?.data?.dados ? eventosRes.value.data.dados : []);
      setFrentes(frentesRes.status === 'fulfilled' && frentesRes.value?.data?.dados ? frentesRes.value.data.dados : []);
      setOrgaos(orgaosRes.status === 'fulfilled' && orgaosRes.value?.data?.dados ? orgaosRes.value.data.dados : []);
      setProfissoes(profissoesRes.status === 'fulfilled' && profissoesRes.value?.data?.dados ? profissoesRes.value.data.dados : []);
      setHistorico(historicoRes.status === 'fulfilled' && historicoRes.value?.data?.dados ? historicoRes.value.data.dados : []);
      setDadosCompletos(dadosRes.status === 'fulfilled' && dadosRes.value?.data?.dados ? dadosRes.value.data.dados : null);
      setDespesasVisiveis(5);
    } catch (error) {
      console.error('Erro ao buscar informações do deputado:', error);
    } finally {
      setLoadingModal(false);
    }
  };

  const handleShowMoreDespesas = () => {
    setDespesasVisiveis(despesasVisiveis + 5);
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
  }, [deputados, selectedStatus, selectedState, selectedParty]);

  return (
    <div style={{ backgroundColor: colors.backgroundAlt, minHeight: '100vh', padding: '40px 0' }}>
      <div className="page-header" style={{ margin: '0 auto 40px', maxWidth: '1200px' }}>
        <h1 style={{ color: colors.text, display: 'flex', alignItems: 'center', gap: '12px' }}>
          <FaLandmark /> Deputados Federais
        </h1>
        <p style={{ color: colors.textSecondary }}>Conheça os representantes eleitos na Câmara dos Deputados</p>
      </div>

      <div className="search-container" style={{ margin: '0 auto', maxWidth: '1200px', backgroundColor: colors.card, boxShadow: `0 2px 12px ${colors.shadow}` }}>
        <Form.Label style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px', color: colors.text, display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FaSearch /> Pesquisar Deputado
        </Form.Label>
        <Form className="d-flex align-items-center" style={{ marginBottom: '20px' }}>
          <FormControl
            type="text"
            placeholder="Digite o nome do deputado..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              padding: '12px 20px',
              fontSize: '16px',
              borderRadius: '12px',
              border: `2px solid ${colors.border}`,
              backgroundColor: colors.background,
              color: colors.text,
              transition: 'border-color 0.3s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#28a745'}
            onBlur={(e) => e.target.style.borderColor = colors.border}
          />
        </Form>

        <div className="results-info">
          <div className="results-count" style={{ color: colors.text }}>
            <span>{deputadosEncontrados}</span> {deputadosEncontrados === 1 ? 'deputado encontrado' : 'deputados encontrados'}
          </div>
          <Dropdown>
            <Dropdown.Toggle
              variant="outline-primary"
              id="filtro-dropdown"
              style={{
                borderRadius: '12px',
                padding: '10px 24px',
                fontWeight: '600',
                border: '2px solid #28a745',
                backgroundColor: colors.card,
                color: colors.text,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <FaFilter /> Filtros
            </Dropdown.Toggle>
            <Dropdown.Menu>
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
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {loading ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '400px',
            gap: '20px',
            backgroundColor: colors.card,
            borderRadius: '16px',
            padding: '60px'
          }}>
            <Spinner
              animation="border"
              role="status"
              style={{
                width: '4rem',
                height: '4rem',
                borderWidth: '0.3rem',
                color: '#28a745'
              }}
            />
            <p style={{
              fontSize: '18px',
              color: colors.textSecondary,
              fontWeight: '500'
            }}>
              Carregando deputados...
            </p>
          </div>
        ) : (
          <>
            <Row className="g-4">
              {(selectedStatus === '' && selectedState === '' && selectedParty === '')
                ? deputados.slice(0, quantidadeDeputados).map((deputado) => (
                  <div className="col-lg-3 col-md-4 col-sm-6" key={deputado.id}>
                    <div
                      className="deputado-card"
                      onClick={() => handleDeputadoClick(deputado)}
                      style={{
                        backgroundColor: colors.card,
                        boxShadow: `0 2px 8px ${colors.shadow}`
                      }}
                    >
                      <img
                        src={deputado.urlFoto}
                        alt={deputado.nome}
                        className="img-fluid"
                      />
                      <h3 style={{ color: colors.text }}>{deputado.nome}</h3>
                      <div className="deputado-info">
                        {deputado.siglaPartido && (
                          <span className="deputado-partido">{deputado.siglaPartido}</span>
                        )}
                        {deputado.siglaUf && (
                          <div style={{ marginTop: '8px', color: colors.textSecondary, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <FaMapMarkerAlt /> {deputado.siglaUf}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
                : filteredDeputados.slice(0, quantidadeDeputados).map((deputado) => (
                  <div className="col-lg-3 col-md-4 col-sm-6" key={deputado.id}>
                    <div
                      className="deputado-card"
                      onClick={() => handleDeputadoClick(deputado)}
                      style={{
                        backgroundColor: colors.card,
                        boxShadow: `0 2px 8px ${colors.shadow}`
                      }}
                    >
                      <img
                        src={deputado.urlFoto}
                        alt={deputado.nome}
                        className="img-fluid"
                      />
                      <h3 style={{ color: colors.text }}>{deputado.nome}</h3>
                      <div className="deputado-info">
                        {deputado.siglaPartido && (
                          <span className="deputado-partido">{deputado.siglaPartido}</span>
                        )}
                        {deputado.siglaUf && (
                          <div style={{ marginTop: '8px', color: colors.textSecondary, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <FaMapMarkerAlt /> {deputado.siglaUf}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </Row>
            {((selectedStatus === '' && selectedState === '' && selectedParty === '')
              ? deputados.length
              : filteredDeputados.length) > quantidadeDeputados && (
                <div style={{ textAlign: 'center', marginTop: '40px' }}>
                  <Button
                    onClick={handleShowMoreClick}
                    style={{
                      backgroundColor: '#28a745',
                      border: 'none',
                      padding: '12px 32px',
                      fontSize: '16px',
                      fontWeight: '600',
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px rgba(0,102,204,0.2)',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                    onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                  >
                    Mostrar Mais Deputados
                  </Button>
                </div>
              )}
          </>
        )}
      </div>
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
