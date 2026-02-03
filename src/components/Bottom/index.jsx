import React from 'react';

const Bottom = ({ autenticado }) => {
  return (
    <footer>
      <div className="bg-dark text-light py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <h5>Sobre a Câmara</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="https://www2.camara.leg.br/a-camara/programas-institucionais/experiencias-presenciais/parlamentojovem/quem-somos-1" target="_blank" rel="noopener noreferrer">Quem somos</a>
                </li>
                <li>
                  <a href="https://www2.camara.leg.br/a-camara/conheca/o-papel-da-camara-dos-deputados" target="_blank" rel="noopener noreferrer">O que fazemos</a>
                </li>
                <li>
                  <a href="https://www2.camara.leg.br/a-camara/conheca/historia" target="_blank" rel="noopener noreferrer">História</a>
                </li>
                <li>
                  <a href="https://www2.camara.leg.br/atividade-legislativa/legislacao/regimento-interno-da-camara-dos-deputados" target="_blank" rel="noopener noreferrer">Estatuto e Regimento Interno</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6">
              <h5>Transparência</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="https://www.camara.leg.br/transparencia/" target="_blank" rel="noopener noreferrer">Portal da Transparência</a>
                </li>
                <li>
                  <a href="https://dadosabertos.camara.leg.br/swagger/api.html" target="_blank" rel="noopener noreferrer">Dados Abertos</a>
                </li>
                <li>
                  <a href="https://www2.camara.leg.br/transparencia/acesso-a-informacao" target="_blank" rel="noopener noreferrer">Acesso à Informação</a>
                </li>
                <li>
                  <a href="https://www.gov.br/compras/pt-br" target="_blank" rel="noopener noreferrer">Licitações</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6">
              <h5>Participe</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="https://www2.camara.leg.br/atividade-legislativa/participe" target="_blank" rel="noopener noreferrer">Como participar</a>
                </li>
                <li>
                  <a href="https://www2.camara.leg.br/transparencia/acesso-a-informacao/atendimento" target="_blank" rel="noopener noreferrer">Contato</a>
                </li>
                <li>
                  <a href="https://www2.camara.leg.br/a-camara/presidencia/contatos" target="_blank" rel="noopener noreferrer">Fale com o Deputado</a>
                </li>
                <li>
                  <a href="https://www2.camara.leg.br/a-camara/estruturaadm/ouvidoria" target="_blank" rel="noopener noreferrer">Ouvidoria</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6">
              <h5>Outras Informações</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="https://www2.camara.leg.br/transparencia/acesso-a-informacao/copy_of_perguntas-frequentes" target="_blank" rel="noopener noreferrer">Perguntas Frequentes</a>
                </li>
                <li>
                  <a href="https://www2.camara.leg.br/transparencia/acesso-a-informacao" target="_blank" rel="noopener noreferrer">Acesso à Informação</a>
                </li>
                <li>
                  <a href="https://dadosabertos.camara.leg.br/swagger/api.html" target="_blank" rel="noopener noreferrer">Dados Abertos</a>
                </li>
                <li>
                  <a href="https://www2.camara.leg.br/termo-de-uso-e-politica-de-privacidade" target="_blank" rel="noopener noreferrer">Política de Privacidade</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-dark text-muted py-3">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <p className="mb-0">
                © {new Date().getFullYear()} Câmara dos Deputados - Todos os direitos reservados
              </p>
              <p className="mb-0">Palácio do Congresso Nacional - Praça dos Três Poderes, Brasília - DF - Brasil - CEP 70160-900</p>
              <p className="mb-0">CNPJ: 00.530.352/0001-59</p>
              <p className="mb-0">Disque-Câmara: 0800-0-619-619, de 8h às 20h</p>
              <p className="mb-0">Atendimento presencial: de 9h às 19h</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Bottom };
