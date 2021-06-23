import styled from  'styled-components';

import Table from '@material-ui/core/Table';
import { FiSearch, FiUsers } from 'react-icons/fi';

import Button from '../../components/Button';

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

export const ColumnDiv = styled.div`
    width: 100%;

    display: flex;
    flex-direction: row;

    justify-content: space-between;
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

export const SearchContainer = styled.div`
    height: 12.5rem;
    width: 80%;

    border-radius: 1rem;

    background-color: #fff;

    display: flex;

    justify-content: center;
    align-items: flex-start;

    padding: 3rem;
    padding-top: 0rem;
    padding-bottom: 0rem;
    margin: 0 auto;
    margin-bottom: 3rem;
`;

export const FormContainer = styled.div`
    min-height: 20rem;
    width: 60%;

    border-radius: 1rem;

    background-color: #fff;

    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: flex-start;

    padding: 2rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    margin: 0 auto;
    margin-bottom: 1rem;
`;

export const PassengersContainer = styled.div`
    min-height: 20rem;
    width: 100%;

    border-radius: 1rem;

    background-color: #f0f0f5;

    display: flex;
    flex-direction: row;

    justify-content: space-between;
    align-items: flex-start;

    padding: 1rem;
    margin: 0 auto;
    margin-bottom: 1rem;
`;

export const PassengersColumn = styled.div`
    min-height: 20rem;
    width: 49.4%;

    border-radius: 1rem;

    background-color: #fff;

    display: flex;
    flex-direction: column;

    justify-content: flex-start;
    align-items: center;

    padding: 1rem;
    padding-top: 0;
    padding-bottom: 2rem;
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
    &:hover {
        cursor: pointer;
  }
`;

export const PassengerButton = styled(Button)`
    margin-top: 0.5rem;
    background-color: #35567d;

    &:hover {
        cursor: pointer;
        background-color: #555f8f;
  }
`;

export const MyFiSearch = styled(FiSearch)`
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
`;

export const MyFiUsers = styled(FiUsers)`
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
`;