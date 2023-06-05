import { React } from 'react';
import { Header } from '../../components/Header';
import { Container } from 'react-bootstrap';
import { Pesquisar } from '../../components/Pesquisar';
import { Subheader } from '../../components/Subheader';

function Deputados() {
  return (
      <>
      < Subheader />
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