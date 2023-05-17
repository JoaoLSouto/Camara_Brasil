import { React } from 'react';
import { Header } from '../../components/Header';
import { Container } from 'react-bootstrap';
import { Pesquisar } from '../../components/Pesquisar';
function Deputados() {
  return (
      <>
      <Header />
      <Container>
        <div>
      <Pesquisar />
        </div>
      </Container>
        
      </>
  );
}


export { Deputados }