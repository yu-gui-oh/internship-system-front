import React from 'react';

import {
    Container,
    Loading,
} from './styles';

const LoadingScreen = () => {
    return (
        <Container>
            <Loading color="#322153" />
            <h2>Carregando...</h2>
        </Container>
    );
}

export default LoadingScreen;