import React, { useState } from 'react';
import { Modal, Button, Tabs, Tab, Spinner, Badge } from 'react-bootstrap';

const ModalD = ({
  showModal,
  setShowModal,
  selectedDeputado,
  despesas = [],
  despesasVisiveis = 5,
  handleShowMoreDespesas,
  discursos = [],
  eventos = [],
  frentes = [],
  orgaos = [],
  profissoes = [],
  historico = [],
  dadosCompletos,
  loadingModal = false
}) => {
  const [key, setKey] = useState('info');

  if (!selectedDeputado) return null;

  return (
    <Modal
      show={showModal}
      onHide={() => {
        setShowModal(false);
        setKey('info');
      }}
      size="lg"
      dialogClassName="modal-90w"
    >
      <Modal.Header closeButton>
        <Modal.Title>{selectedDeputado && selectedDeputado.nome}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
        {loadingModal ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '300px',
            gap: '15px'
          }}>
            <Spinner animation="border" style={{ width: '3rem', height: '3rem', color: '#28a745' }} />
            <p>Carregando informações...</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-4">
              <img
                src={selectedDeputado?.urlFoto || ''}
                alt={selectedDeputado?.nome || 'Deputado'}
                className="img-fluid rounded-circle"
                style={{ maxWidth: '150px', border: '4px solid #28a745' }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>

            <Tabs
              id="deputado-tabs"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className="mb-3"
            >
              {/* ABA 1: INFORMAÇÕES BÁSICAS */}
              <Tab eventKey="info" title="📋 Informações">
                <div style={{ padding: '15px' }}>
                  <h5 style={{ borderBottom: '2px solid #28a745', paddingBottom: '10px', marginBottom: '20px' }}>
                    Dados Pessoais
                  </h5>
                  {dadosCompletos && (
                    <div style={{ lineHeight: '2' }}>
                      <p><strong>Nome Civil:</strong> {dadosCompletos.nomeCivil || 'Não informado'}</p>
                      <p><strong>Nome Eleitoral:</strong> {dadosCompletos.ultimoStatus?.nomeEleitoral || 'Não informado'}</p>
                      <p><strong>CPF:</strong> {dadosCompletos.cpf || 'Não informado'}</p>
                      <p><strong>Sexo:</strong> {dadosCompletos.sexo === 'M' ? 'Masculino' : 'Feminino'}</p>
                      <p><strong>Data de Nascimento:</strong> {dadosCompletos.dataNascimento ? new Date(dadosCompletos.dataNascimento).toLocaleDateString('pt-BR') : 'Não informado'}</p>
                      <p><strong>Local de Nascimento:</strong> {dadosCompletos.municipioNascimento || 'Não informado'} - {dadosCompletos.ufNascimento || ''}</p>
                      <p><strong>Escolaridade:</strong> {dadosCompletos.escolaridade || 'Não informado'}</p>
                    </div>
                  )}

                  <h5 style={{ borderBottom: '2px solid #28a745', paddingBottom: '10px', marginTop: '30px', marginBottom: '20px' }}>
                    Mandato Atual
                  </h5>
                  {dadosCompletos?.ultimoStatus && (
                    <div style={{ lineHeight: '2' }}>
                      <p><strong>Situação:</strong> <Badge bg={dadosCompletos.ultimoStatus.situacao === 'Exercicio' ? 'success' : 'secondary'}>{dadosCompletos.ultimoStatus.situacao || 'Não informado'}</Badge></p>
                      <p><strong>Condição:</strong> {dadosCompletos.ultimoStatus.condicaoEleitoral || 'Não informado'}</p>
                      <p><strong>Partido:</strong> {dadosCompletos.ultimoStatus.siglaPartido || selectedDeputado.siglaPartido || 'Não informado'}</p>
                      <p><strong>Estado:</strong> {dadosCompletos.ultimoStatus.siglaUf || selectedDeputado.siglaUf || 'Não informado'}</p>
                      <p><strong>Gabinete:</strong> {dadosCompletos.ultimoStatus.gabinete?.nome || 'Não informado'}</p>
                      <p><strong>Email:</strong> {dadosCompletos.ultimoStatus.email || 'Não informado'}</p>
                    </div>
                  )}

                  {dadosCompletos?.urlWebsite && (
                    <>
                      <h5 style={{ borderBottom: '2px solid #28a745', paddingBottom: '10px', marginTop: '30px', marginBottom: '20px' }}>
                        Links
                      </h5>
                      <p><strong>Website:</strong> <a href={dadosCompletos.urlWebsite} target="_blank" rel="noreferrer">{dadosCompletos.urlWebsite}</a></p>
                    </>
                  )}
                </div>
              </Tab>

              {/* ABA 2: DESPESAS */}
              <Tab eventKey="despesas" title={`💰 Despesas (${despesas.length})`}>
                <div style={{ padding: '15px' }}>
                  <h5 style={{ borderBottom: '2px solid #28a745', paddingBottom: '10px', marginBottom: '20px' }}>
                    Despesas Parlamentares - 2024
                  </h5>
                  {despesas.length > 0 ? (
                    <>
                      <ul style={{ listStyle: 'none', padding: 0 }}>
                        {despesas.slice(0, despesasVisiveis).map((despesa, index) => (
                          <li key={index} style={{
                            padding: '15px',
                            marginBottom: '10px',
                            backgroundColor: '#f8f9fa',
                            borderRadius: '8px',
                            borderLeft: '4px solid #28a745'
                          }}>
                            <strong>{despesa.tipoDespesa}</strong><br />
                            <small>{despesa.dataDocumento ? new Date(despesa.dataDocumento).toLocaleDateString('pt-BR') : ''}</small><br />
                            <span style={{ color: '#28a745', fontWeight: 'bold', fontSize: '18px' }}>
                              R$ {despesa.valorLiquido?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </span><br />
                            {despesa.nomeFornecedor && <small>Fornecedor: {despesa.nomeFornecedor}</small>}
                          </li>
                        ))}
                      </ul>
                      {despesas.length > despesasVisiveis && (
                        <Button
                          onClick={handleShowMoreDespesas}
                          variant="success"
                          style={{ display: 'block', margin: '10px auto' }}
                        >
                          Ver mais despesas
                        </Button>
                      )}
                    </>
                  ) : (
                    <p className="text-center text-muted">Não há despesas registradas para este deputado em 2024.</p>
                  )}
                </div>
              </Tab>

              {/* ABA 3: DISCURSOS */}
              <Tab eventKey="discursos" title={`🎤 Discursos (${discursos.length})`}>
                <div style={{ padding: '15px' }}>
                  <h5 style={{ borderBottom: '2px solid #28a745', paddingBottom: '10px', marginBottom: '20px' }}>
                    Últimos Discursos
                  </h5>
                  {discursos.length > 0 ? (
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {discursos.map((discurso, index) => (
                        <li key={index} style={{
                          padding: '15px',
                          marginBottom: '15px',
                          backgroundColor: '#f8f9fa',
                          borderRadius: '8px',
                          borderLeft: '4px solid #28a745'
                        }}>
                          <strong>{new Date(discurso.dataHoraInicio).toLocaleDateString('pt-BR')}</strong><br />
                          <small>Fase: {discurso.faseEvento?.titulo || 'Não informado'}</small><br />
                          <p style={{ marginTop: '10px', fontSize: '14px' }}>{discurso.transcricao || discurso.sumario || 'Transcrição não disponível'}</p>
                          {discurso.urlTexto && (
                            <a href={discurso.urlTexto} target="_blank" rel="noreferrer" style={{ fontSize: '13px' }}>
                              Ver texto completo →
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-center text-muted">Não há discursos registrados recentemente.</p>
                  )}
                </div>
              </Tab>

              {/* ABA 4: EVENTOS */}
              <Tab eventKey="eventos" title={`📅 Eventos (${eventos.length})`}>
                <div style={{ padding: '15px' }}>
                  <h5 style={{ borderBottom: '2px solid #28a745', paddingBottom: '10px', marginBottom: '20px' }}>
                    Eventos Recentes
                  </h5>
                  {eventos.length > 0 ? (
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {eventos.map((evento, index) => (
                        <li key={index} style={{
                          padding: '15px',
                          marginBottom: '10px',
                          backgroundColor: '#f8f9fa',
                          borderRadius: '8px',
                          borderLeft: '4px solid #28a745'
                        }}>
                          <strong>{evento.descricao || evento.descricaoTipo || 'Evento'}</strong><br />
                          <small>{evento.dataHoraInicio ? new Date(evento.dataHoraInicio).toLocaleString('pt-BR') : ''}</small><br />
                          {evento.localCamara?.nome && <small>Local: {evento.localCamara.nome}</small>}
                          {evento.situacao && <div><Badge bg="info">{evento.situacao}</Badge></div>}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-center text-muted">Não há eventos registrados recentemente.</p>
                  )}
                </div>
              </Tab>

              {/* ABA 5: FRENTES */}
              <Tab eventKey="frentes" title={`🤝 Frentes (${frentes.length})`}>
                <div style={{ padding: '15px' }}>
                  <h5 style={{ borderBottom: '2px solid #28a745', paddingBottom: '10px', marginBottom: '20px' }}>
                    Frentes Parlamentares
                  </h5>
                  {frentes.length > 0 ? (
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {frentes.map((frente, index) => (
                        <li key={index} style={{
                          padding: '15px',
                          marginBottom: '10px',
                          backgroundColor: '#f8f9fa',
                          borderRadius: '8px',
                          borderLeft: '4px solid #28a745'
                        }}>
                          <strong>{frente.titulo}</strong><br />
                          {frente.idLegislatura && <small>Legislatura: {frente.idLegislatura}</small>}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-center text-muted">Não participa de frentes parlamentares registradas.</p>
                  )}
                </div>
              </Tab>

              {/* ABA 6: COMISSÕES */}
              <Tab eventKey="orgaos" title={`🏛️ Comissões (${orgaos.length})`}>
                <div style={{ padding: '15px' }}>
                  <h5 style={{ borderBottom: '2px solid #28a745', paddingBottom: '10px', marginBottom: '20px' }}>
                    Comissões e Órgãos
                  </h5>
                  {orgaos.length > 0 ? (
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {orgaos.map((orgao, index) => (
                        <li key={index} style={{
                          padding: '15px',
                          marginBottom: '10px',
                          backgroundColor: '#f8f9fa',
                          borderRadius: '8px',
                          borderLeft: '4px solid #28a745'
                        }}>
                          <strong>{orgao.siglaOrgao}</strong> - {orgao.nomeOrgao}<br />
                          <Badge bg="primary">{orgao.titulo || 'Membro'}</Badge><br />
                          <small>
                            {orgao.dataInicio ? `De ${new Date(orgao.dataInicio).toLocaleDateString('pt-BR')}` : ''}
                            {orgao.dataFim ? ` até ${new Date(orgao.dataFim).toLocaleDateString('pt-BR')}` : ' (atual)'}
                          </small>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-center text-muted">Não participa de comissões registradas.</p>
                  )}
                </div>
              </Tab>

              {/* ABA 7: PROFISSÕES */}
              <Tab eventKey="profissoes" title={`💼 Profissões (${profissoes.length})`}>
                <div style={{ padding: '15px' }}>
                  <h5 style={{ borderBottom: '2px solid #28a745', paddingBottom: '10px', marginBottom: '20px' }}>
                    Profissões Anteriores
                  </h5>
                  {profissoes.length > 0 ? (
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {profissoes.map((profissao, index) => (
                        <li key={index} style={{
                          padding: '15px',
                          marginBottom: '10px',
                          backgroundColor: '#f8f9fa',
                          borderRadius: '8px',
                          borderLeft: '4px solid #28a745'
                        }}>
                          <strong>{profissao.titulo}</strong><br />
                          {profissao.dataHora && <small>{new Date(profissao.dataHora).toLocaleDateString('pt-BR')}</small>}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-center text-muted">Não há profissões anteriores registradas.</p>
                  )}
                </div>
              </Tab>

              {/* ABA 8: HISTÓRICO */}
              <Tab eventKey="historico" title={`📜 Histórico (${historico.length})`}>
                <div style={{ padding: '15px' }}>
                  <h5 style={{ borderBottom: '2px solid #28a745', paddingBottom: '10px', marginBottom: '20px' }}>
                    Histórico de Mandatos
                  </h5>
                  {historico.length > 0 ? (
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {historico.map((item, index) => (
                        <li key={index} style={{
                          padding: '15px',
                          marginBottom: '10px',
                          backgroundColor: '#f8f9fa',
                          borderRadius: '8px',
                          borderLeft: '4px solid #28a745'
                        }}>
                          <strong>{item.siglaPartido || 'Partido não informado'}</strong> - {item.siglaUf}<br />
                          <small>Legislatura: {item.idLegislatura}</small><br />
                          <small>
                            {item.dataInicio ? `De ${new Date(item.dataInicio).toLocaleDateString('pt-BR')}` : ''}
                            {item.dataFim ? ` até ${new Date(item.dataFim).toLocaleDateString('pt-BR')}` : ' (atual)'}
                          </small>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-center text-muted">Não há histórico de mandatos registrado.</p>
                  )}
                </div>
              </Tab>
            </Tabs>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export { ModalD };

