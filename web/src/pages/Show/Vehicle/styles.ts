import styled from  'styled-components';

import { Form as Unform } from '@unform/web';

export const Form = styled(Unform)`
    width: 60%;

    display: flex;
    flex-direction: column;
`;

export const ColumnDiv = styled.div`
    width: 100%;

    display: flex;
    flex-direction: row;

    justify-content: space-between;
    align-items: center;
`;

export const MainDiv = styled.div`
    justify-content: center;
    align-items: center;
`;

export const Container = styled.div`
    height: 100%;
    width: 100%;

    display: flex;

    justify-content: center;
    align-items: center;

    padding: 1rem;
`;

export const FormContainer = styled.div`
    height: 36rem;
    width: 50%;

    border-radius: 1rem;

    background-color: #fff;

    display: flex;

    justify-content: center;
    align-items: flex-start;

    padding: 2rem;
    padding-top: 2rem;
    margin: 0 auto;
    margin-bottom: 1rem;
`;

export const Title = styled.h1`
    justify-content: center;
    align-items: center;
`;

export const Input = styled.input`
    flex: 1;
    background: #f0f0f5;
    border-radius: 8px;
    border: 0;
    padding: 16px 24px;
    font-size: 16px;
    color: #6C6C80;
`;