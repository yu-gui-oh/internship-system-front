import React from 'react';

import { FiArrowLeft } from 'react-icons/fi';

import {
    Container,
    MainDiv,
} from './styles';

const Home = () => {
    return (
        <Container>
            <MainDiv>
                <Container>
                    <h1>Bem vindo(a)!</h1>
                </Container>
                <h2>
                    <FiArrowLeft />
                    Escolha uma opção na barra lateral
                </h2>
            </MainDiv>
        </Container>
    );
}

export default Home;