import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header";

const Frentes = () => {
  const [frentes, setFrentes] = useState([]);
  const [termoPesquisa, setTermoPesquisa] = useState("");
  const [frentesFiltradas, setFrentesFiltradas] = useState([]);

  useEffect(() => {
    const fetchFrentes = async () => {
      try {
        const response = await fetch(
          "https://dadosabertos.camara.leg.br/api/v2/frentes"
        );
        const data = await response.json();
        setFrentes(data.dados);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFrentes();
  }, []);

  useEffect(() => {
    // Filtrar as frentes com base no termo de pesquisa
    const frentesFiltradas = frentes.filter((frente) =>
      frente.titulo.toLowerCase().includes(termoPesquisa.toLowerCase())
    );
    setFrentesFiltradas(frentesFiltradas);
  }, [frentes, termoPesquisa]);

  const handlePesquisa = (event) => {
    setTermoPesquisa(event.target.value);
  };

  return (
    <div>
      <Header />
      <div>
        <input
          type="text"
          placeholder="Pesquisar frente parlamentar"
          value={termoPesquisa}
          onChange={handlePesquisa}
        />
      </div>
      <ul>
        {frentesFiltradas.map((frente) => (
          <li key={frente.id}>{frente.titulo}</li>
        ))}
      </ul>
    </div>
  );
};

export { Frentes };
