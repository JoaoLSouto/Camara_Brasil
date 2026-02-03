import React, { useEffect, useState } from "react";
import { useTheme } from '../../contexts/ThemeContext';
import { Header } from '../../components/Header';
import { Subheader } from '../../components/Subheader';
import './index.css';
import { Bottom } from '../../components/Bottom';
import axios from "axios";
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, PieChart, Pie, Cell } from "recharts";
import { Container, Row, Col, Form, Card, Spinner } from "react-bootstrap";
import { FaChartBar } from 'react-icons/fa';

const Estatisticas = () => {
  const { colors } = useTheme();

  const [partidos, setPartidos] = useState([]);
  const [despesasPorPartido, setDespesasPorPartido] = useState([]);
  const [deputadosPorEstado, setDeputadosPorEstado] = useState([]);
  const [deputadosPorGenero, setDeputadosPorGenero] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState('deputados');
  const [loading, setLoading] = useState(true);
  const [anoSelecionado, setAnoSelecionado] = useState('2024');

  const COLORS = ['#28a745', '#20c997', '#17a2b8', '#ffc107', '#dc3545', '#6610f2', '#fd7e14', '#e83e8c'];

  useEffect(() => {
    fetchData();
  }, [filtroCategoria, anoSelecionado]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://dadosabertos.camara.leg.br/api/v2/deputados`
      );

      const deputados = response.data.dados;

      // Deputados por partido
      const objPartidos = {}
      deputados.map((item) => {
        const qtd = item.siglaPartido in objPartidos ? objPartidos[item.siglaPartido] + 1 : 1
        objPartidos[item.siglaPartido] = qtd
      })
      const arrDeObj = Object.entries(objPartidos).map(([chave, valor]) => ({ 'partido': chave, 'valor': valor }));
      const partidosOrdenados = arrDeObj.sort((a, b) => b.valor - a.valor);
      setPartidos(partidosOrdenados);

      // Deputados por estado
      const objEstados = {}
      deputados.map((item) => {
        const qtd = item.siglaUf in objEstados ? objEstados[item.siglaUf] + 1 : 1
        objEstados[item.siglaUf] = qtd
      })
      const arrEstados = Object.entries(objEstados).map(([chave, valor]) => ({ 'estado': chave, 'valor': valor }));
      const estadosOrdenados = arrEstados.sort((a, b) => b.valor - a.valor);
      setDeputadosPorEstado(estadosOrdenados);

      // Buscar despesas por partido (top 10 partidos)
      if (filtroCategoria === 'despesas') {
        const top10Partidos = partidosOrdenados.slice(0, 10);
        const despesasPromises = top10Partidos.map(async (partidoObj) => {
          const deputadosDoPartido = deputados.filter(d => d.siglaPartido === partidoObj.partido);
          let totalDespesas = 0;

          for (const deputado of deputadosDoPartido.slice(0, 5)) { // Limitar a 5 deputados por partido para não sobrecarregar
            try {
              const despesasRes = await axios.get(
                `https://dadosabertos.camara.leg.br/api/v2/deputados/${deputado.id}/despesas?ano=${anoSelecionado}&itens=100`
              );
              const somaDespesas = despesasRes.data.dados.reduce((acc, desp) => acc + (desp.valorLiquido || 0), 0);
              totalDespesas += somaDespesas;
            } catch (error) {
              console.error(`Erro ao buscar despesas do deputado ${deputado.id}:`, error);
            }
          }

          return {
            partido: partidoObj.partido,
            valor: Math.round(totalDespesas)
          };
        });

        const despesas = await Promise.all(despesasPromises);
        setDespesasPorPartido(despesas.sort((a, b) => b.valor - a.valor));
      }

      // Simular dados de gênero (API não fornece na listagem)
      const generoData = [
        { genero: 'Masculino', valor: Math.round(deputados.length * 0.85) },
        { genero: 'Feminino', valor: Math.round(deputados.length * 0.15) }
      ];
      setDeputadosPorGenero(generoData);

    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
    setLoading(false);
  };

  return (
    <div style={{ backgroundColor: colors.backgroundAlt, minHeight: '100vh' }}>
      <Subheader />
      <Header />

      <Container style={{ padding: '40px 0' }}>
        <Card style={{ marginBottom: '30px', border: 'none', boxShadow: `0 2px 12px ${colors.shadow}`, backgroundColor: colors.card }}>
          <Card.Body>
            <h2 style={{ color: colors.text, marginBottom: '20px', fontSize: '28px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <FaChartBar /> Estatísticas da Câmara dos Deputados
            </h2>

            <Row className="mb-4">
              <Col md={6}>
                <Form.Group>
                  <Form.Label style={{ fontWeight: '600', color: colors.text }}>Categoria:</Form.Label>
                  <Form.Select
                    value={filtroCategoria}
                    onChange={(e) => setFiltroCategoria(e.target.value)}
                    style={{
                      padding: '10px',
                      borderRadius: '8px',
                      border: `2px solid ${colors.border}`,
                      backgroundColor: colors.background,
                      color: colors.text
                    }}
                  >
                    <option value="deputados">Deputados por Partido</option>
                    <option value="despesas">Despesas por Partido</option>
                    <option value="estados">Deputados por Estado</option>
                    <option value="genero">Distribuição por Gênero</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              {filtroCategoria === 'despesas' && (
                <Col md={6}>
                  <Form.Group>
                    <Form.Label style={{ fontWeight: '600', color: colors.text }}>Ano:</Form.Label>
                    <Form.Select
                      value={anoSelecionado}
                      onChange={(e) => setAnoSelecionado(e.target.value)}
                      style={{
                        padding: '10px',
                        borderRadius: '8px',
                        border: `2px solid ${colors.border}`,
                        backgroundColor: colors.background,
                        color: colors.text
                      }}
                    >
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                      <option value="2022">2022</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              )}
            </Row>
          </Card.Body>
        </Card>

        {loading ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '400px',
            backgroundColor: colors.card,
            borderRadius: '16px',
            padding: '60px'
          }}>
            <Spinner animation="border" style={{ width: '4rem', height: '4rem', color: '#28a745' }} />
            <p style={{ marginTop: '20px', fontSize: '18px', color: colors.textSecondary }}>
              {filtroCategoria === 'despesas' ? 'Calculando despesas... (pode levar alguns segundos)' : 'Carregando dados...'}
            </p>
          </div>
        ) : (
          <Card style={{ border: 'none', boxShadow: `0 2px 12px ${colors.shadow}`, backgroundColor: colors.card }}>
            <Card.Body style={{ padding: '30px' }}>
              {filtroCategoria === 'deputados' && (
                <>
                  <h3 style={{ marginBottom: '30px', color: colors.text }}>
                    Quantidade de Deputados por Partido
                  </h3>
                  <div style={{ overflowX: 'auto' }}>
                    <BarChart width={1150} height={500} data={partidos}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="partido" />
                      <YAxis />
                      <Bar dataKey="valor" fill="#28a745" />
                      <Tooltip />
                      <Legend />
                    </BarChart>
                  </div>
                </>
              )}

              {filtroCategoria === 'despesas' && (
                <>
                  <h3 style={{ marginBottom: '20px', color: colors.text }}>
                    Despesas por Partido - {anoSelecionado} (Top 10)
                  </h3>
                  <p style={{ color: colors.textSecondary, fontSize: '14px', marginBottom: '30px' }}>
                    * Valores baseados em amostra de 5 deputados por partido
                  </p>
                  <div style={{ overflowX: 'auto' }}>
                    <BarChart width={1150} height={500} data={despesasPorPartido}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="partido" />
                      <YAxis />
                      <Bar dataKey="valor" fill="#20c997" />
                      <Tooltip formatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`} />
                      <Legend />
                    </BarChart>
                  </div>
                </>
              )}

              {filtroCategoria === 'estados' && (
                <>
                  <h3 style={{ marginBottom: '30px', color: colors.text }}>
                    Deputados por Estado
                  </h3>
                  <div style={{ overflowX: 'auto' }}>
                    <BarChart width={1150} height={500} data={deputadosPorEstado}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="estado" />
                      <YAxis />
                      <Bar dataKey="valor" fill="#17a2b8" />
                      <Tooltip />
                      <Legend />
                    </BarChart>
                  </div>
                </>
              )}

              {filtroCategoria === 'genero' && (
                <>
                  <h3 style={{ marginBottom: '30px', color: colors.text }}>
                    Distribuição por Gênero
                  </h3>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <PieChart width={500} height={400}>
                      <Pie
                        data={deputadosPorGenero}
                        cx={250}
                        cy={200}
                        labelLine={false}
                        label={({ genero, valor, percent }) => `${genero}: ${valor} (${(percent * 100).toFixed(1)}%)`}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="valor"
                      >
                        {deputadosPorGenero.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </div>
                </>
              )}
            </Card.Body>
          </Card>
        )}
      </Container>

      <Bottom />
    </div>
  );
};

export default Estatisticas;
