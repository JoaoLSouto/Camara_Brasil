import React, { useEffect, useState } from "react";
import { Header } from '../../components/Header';
import { Subheader } from '../../components/Subheader';
import './index.css';
import { Bottom } from '../../components/Bottom';
import axios from "axios";
import { BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Tooltip } from "react-bootstrap";
import { Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

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
        console.log(obj);

        setPartidos(obj)
      } catch (error) {
        console.error('Erro ao buscar deputados:', error);
      }
    };

    fetchData();
  }, []);

  const data = [
    {name: 'Page A', pv: 2400, amt: 2400},
    {name: 'Page B', pv: 1398, amt: 2210},
    {name: 'Page C', pv: 9800, amt: 2290},
    {name: 'Page D', pv: 3908, amt: 2000},
    {name: 'Page E', pv: 4800, amt: 2181},
    {name: 'Page F', pv: 3800, amt: 2500},
    {name: 'Page G', pv: 4300, amt: 2100},
  ];


  return (
    <div>
      <Subheader />
      <Header />
      <BarChart width={730} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis  dataKey="pv"/>
        <Bar dataKey="pv" fill="#aaaaaa" />
        <Tooltip />
        <Legend />
      </BarChart>
      <Bottom />
    </div>
  );
};

export default Estatisticas;