import styled from  'styled-components';

import Table from '@material-ui/core/Table';
import { FiSearch } from 'react-icons/fi';

import Button from '../../../components/Button';

import { Form as Unform } from '@unform/web';

export const MyTable = styled(Table)`
    width: 100%;
`;

export const Form = styled(Unform)`
    width: 100%;

    display: flex;
    flex-direction: column;
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
    min-height: 20rem;
    width: 50%;

    border-radius: 1rem;

    background-color: #fff;

    display: flex;

    justify-content: center;
    align-items: flex-start;

    padding: 2rem;
    padding-top: 5rem;
    padding-bottom: 5rem;
    margin: 0 auto;
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

export const MyButton = styled(Button)`
    margin-top: 0;
`;

export const MyFiSearch = styled(FiSearch)`
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
`;