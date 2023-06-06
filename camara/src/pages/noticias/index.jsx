
import { Header } from '../../components/Header';
import { Container } from 'react-bootstrap';
import React from 'react';
import { NoticiasCard } from '../../components/NoticiasCard';
import { Subheader } from '../../components/Subheader';
import { Bottom } from '../../components/Bottom';
const Noticias = () => {
    return (
        <>
        <Subheader />
        <Header />
        <Container>
          <div>
            <NoticiasCard />
          </div>
        </Container >
        <Bottom />
        </>
    );
}

export { Noticias }