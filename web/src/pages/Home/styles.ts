import styled from  'styled-components';

export const Container = styled.div`
    height: 100%;
    width: 100%;

    display: flex;

    justify-content: center;
    align-items: center;

    padding: 1rem;
`;

export const MainDiv = styled.div`
    height: 100%;
    width: 100%;

    display: grid;
    grid-template-rows: 1fr 1fr;
    row-gap: 1rem;

    justify-content: center;
    align-items: center; 
`;

export const Title = styled.h1`
    justify-content: center;
    align-items: center;
`;