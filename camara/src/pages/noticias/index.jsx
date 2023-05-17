
import { Header } from '../../components/Header';
import { Container } from 'react-bootstrap';
import React from 'react';
import { NoticiasCard } from '../../components/NoticiasCard';

const Noticias = () => {
    return (
        <>
        <Header />
        <Container>
          <div>
            <NoticiasCard />
          </div>
        </Container >
        </>
    );
}

export { Noticias }