import React, { useState, useEffect } from "react";
import axios from "axios";
import { Header } from '../../components/Header';
const Partidos = () => {
  const [partidos, setPartidos] = useState([]);

  useEffect(() => {
    const fetchPartidos = async () => {
      const response = await axios.get(
        "https://dadosabertos.camara.leg.br/api/v2/partidos?ordem=ASC&ordenarPor=sigla"
      );
      setPartidos(response.data.dados);
    };
    fetchPartidos();
  }, []);

  return (
    <div>
      <Header />
      {partidos.map((partido) => (
        <div key={partido.id}>
          <img src={partido.urlLogo} alt={partido.sigla} />
          <div>{partido.nome}</div>
        </div>
      ))}
    </div>
  );
};

export { Partidos};