import React, { useState } from 'react';

import { Header } from '../../components/Header';
import { Subheader } from '../../components/Subheader';
import { Bottom } from '../../components/Bottom';
import Comissao from './comissao';
function Feed () {

  const comissoes = [
    { id: 1, nome: 'Comissão de Constituição e Justiça', area: 'Jurídico', descricao: 'Descrição A Comissão de Constituição e Justiça (CCJ) é uma das comissões permanentes presentes em instituições legislativas, como câmaras municipais, assembleias legislativas e congressos nacionais. A CCJ é considerada uma das mais importantes comissões, uma vez que é responsável por analisar a constitucionalidade e a legalidade dos projetos de lei apresentados.' },
    { id: 2, nome: 'Comissão de Finanças e Orçamento', area: 'Economia', descricao: 'Descrição: A Comissão de Orçamentos e Finanças é uma das comissões permanentes presentes em instituições legislativas, como câmaras municipais, assembleias legislativas e congressos nacionais. Essa comissão tem como principal função analisar e deliberar sobre as questões financeiras e orçamentárias do órgão legislativo, bem como do Poder Executivo.' },
    { id: 3, nome: 'Comissão de Educação', area: 'Educação', descricao: ' Descrição: A Comissão de Educação é uma das comissões permanentes presentes em instituições legislativas, como câmaras municipais, assembleias legislativas e congressos nacionais. Essa comissão tem como objetivo principal analisar, discutir e propor ações relacionadas à área da educação, tanto no âmbito legislativo quanto no executivo.' },
    { id: 4, nome: 'Comissão de Saúde', area: 'Saúde', descricao: ' Descrição: A Comissão de Saúde é uma das comissões permanentes presentes em instituições legislativas, como câmaras municipais, assembleias legislativas e congressos nacionais. Essa comissão tem como principal objetivo analisar e propor medidas relacionadas à saúde pública, bem como fiscalizar a execução das políticas e programas na área da saúde.' ,},
    
  ];

  const [filtroArea, setFiltroArea] = useState('Todas');
  const handleChangeFiltro = event => {
    setFiltroArea(event.target.value);
  };

  const comissoesFiltradas = filtroArea === 'Todas' ? comissoes : comissoes.filter(comissao => comissao.area === filtroArea);
  return (
      <>
      <Subheader />
      <Header />
      <div className="container">
      <h1>Comissões Permanentes</h1>
      <div className="select-container">
        <label htmlFor="filtro">Filtrar por área:</label>
        <select id="filtro" value={filtroArea} onChange={handleChangeFiltro}>
          <option value="Todas">Todas</option>
          <option value="Jurídico">Jurídico</option>
          <option value="Economia">Economia</option>
          <option value="Educação">Educação</option>
          <option value="Saúde">Saúde</option>
        </select>
      </div>
      <ul>
        {comissoesFiltradas.map(comissao => (
          <Comissao key={comissao.id} nome={comissao.nome} area={comissao.area} descricao={comissao.descricao} />
        ))}
      </ul>
    </div>
      <Bottom />
      </>
  );
}


export { Feed }