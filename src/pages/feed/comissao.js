import React from 'react';

const Comissao = ({ nome, area, descricao }) => {
  return (
    <li>
      <h2>{nome}</h2>
      <p>Área: {area}</p>
      <p>{descricao}</p>
      
    </li>
  );
}

export default Comissao;