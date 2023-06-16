import React, { useEffect, useState } from "react";
import { Header } from '../../components/Header';
import { Subheader } from '../../components/Subheader';
import './index.css';
import { Bottom } from '../../components/Bottom';
import axios from "axios";
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";

const Estatisticas = () => {

  const [partidos, setPartidos] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://dadosabertos.camara.leg.br/api/v2/deputados`
        );

        const obj = {}
        response.data.dados.map((item) => {
          const qtd = item.siglaPartido in obj ? obj[item.siglaPartido] + 1 : 1
          obj[item.siglaPartido] = qtd
        })

        const arrDeObj = Object.entries(obj).map(([chave, valor]) => ({ 'partido': chave, 'valor': valor }));

        setPartidos(arrDeObj)
      } catch (error) {
        console.error('Erro ao buscar deputados:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Subheader />
      <Header />
      <BarChart width={1250} height={500} data={partidos}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="partido" />
        <YAxis />
        <Bar dataKey="valor" fill="#8884d8" />
        <Tooltip />
        <Legend />
      </BarChart>
      <Bottom />
    </div>
  );
};

export default Estatisticas;