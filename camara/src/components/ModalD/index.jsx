import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalD = ({ showModal, setShowModal, selectedDeputado, despesas, despesasVisiveis, handleShowMoreDespesas }) => {
  return (
    <Modal
      show={showModal}
      onHide={() => {
        setShowModal(false);
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
                    Gênero:{' '}
                    {selectedDeputado.sexo
                      ? selectedDeputado.sexo
                      : 'Não fornecido pela API'}
                  </p>
                  <p>
                    Situação:{' '}
                    {selectedDeputado.situacao
                      ? selectedDeputado.situacao
                      : 'Não fornecido pela API'}
                  </p>
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
  );
};

export { ModalD} ;
