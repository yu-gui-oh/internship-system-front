import React, { 
    useRef, 
    // useCallback,
    useEffect,
    useState,
} from 'react';

// import * as Yup from 'yup';
import { FormHandles } from '@unform/core';

import api from '../../../services/api';

// import { useHistory } from 'react-router';

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import {
    Form,
    MainDiv,
    Container,
    FormContainer,
    Title,
    MyTable,
    MyFiSearch,
    MyButton,
} from './styles';

interface IPassengers {
    id: string;
    name: string;
    birth_date: Date;
    cell_phone: string;
    rg: string;
};

const ListActivePassengers = () => {
    // const history = useHistory();

    const [passengers, setPassengers] = useState<IPassengers[]>([]);

    const formRef = useRef<FormHandles>(null);

    useEffect(() => {
        async function loadPassengers(): Promise<void> {
            await api.get('/list/passengers')
            .then( response => {
                const passengers = response.data.map( ( passenger: IPassengers ) => ({
                    id: passenger.id,
                    name: passenger.name,
                    birth_date: passenger.birth_date,
                    cell_phone: passenger.cell_phone,
                    rg: passenger.rg,
                }) );
                setPassengers(passengers);
            });
        };
        loadPassengers();
    }, []);

    const handleSubmit = React.useCallback(
        (id: string) => {
        //   history.push('/', id);
        },
        [
            // history
        ],
      );

    return(
        <MainDiv>
            <Container>
                <Title>
                    Passageiros:
                </Title>

                
            </Container>
            <FormContainer>
                <Form ref={formRef} onSubmit={handleSubmit} >

                <TableContainer>
                    <MyTable>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" > Nome </TableCell>
                                <TableCell align="center" > Data de nascimento </TableCell>
                                <TableCell align="center" > RG </TableCell>
                                <TableCell align="center" > Celular </TableCell>
                                <TableCell align="center" > Detalhes </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {passengers.map( (passenger: IPassengers) => (
                            <TableRow key={passenger.id}>
                                <TableCell align="center" >
                                    {passenger.name}
                                </TableCell>
                                <TableCell align="center" >
                                    {new Date(passenger.birth_date).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}
                                </TableCell>                                
                                <TableCell align="center" >
                                    {passenger.rg}
                                </TableCell>
                                <TableCell align="center" >
                                    {passenger.cell_phone}
                                </TableCell>
                                <TableCell align="center" >
                                    <MyButton type="submit">
                                        <MyFiSearch />
                                    </MyButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </MyTable>
                </TableContainer>
                </Form>
               
            </FormContainer>
        </MainDiv>
    );
}

export default ListActivePassengers;