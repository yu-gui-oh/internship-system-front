import React, { 
    // useRef, 
    // useCallback,
    useEffect,
    useState,
} from 'react';

// import * as Yup from 'yup';
// import { FormHandles } from '@unform/core';

import api from '../../../services/api';

import { useHistory } from 'react-router';

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import {
    // Form,
    MainDiv,
    Container,
    FormContainer,
    Title,
    MyTable,
    MyFiSearch,
    MyFiUsers,
    MyButton,
} from './styles';

interface ITravels {
    id: string;
    departure_date: Date;
    destination: string;
    driver: string;
    vehicle: string;
    vacant_seats: number;
    status: string;
};

const ListActiveTravels = () => {
    const history = useHistory();

    const [travels, setTravels] = useState<ITravels[]>([]);

    // const formRef = useRef<FormHandles>(null);

    useEffect(() => {
        async function loadTravels(): Promise<void> {
            await api.get('/travels/active')
            .then( response => {
                const travels = response.data.map( ( travel: ITravels ) => ({
                    id: travel.id,
                    departure_date: travel.departure_date,
                    destination: travel.destination,
                    driver: travel.driver,
                    vehicle: travel.vehicle,
                    vacant_seats: travel.vacant_seats,
                    status: travel.status,
                }) );
                setTravels(travels);
            });
        };
        loadTravels();
    }, []);

    const goToEdit = React.useCallback(
        (id: string) => {
            localStorage.setItem('travel_id', id);
            history.push('/edit/travel');
        },
        [
            history
        ],
      );

    return(
        <MainDiv>
            <Container>
                <Title>
                    Viagens em andamento:
                </Title>

                
            </Container>
            <FormContainer>
                {/* <Form ref={formRef} onSubmit={handleSubmit} > */}

                <TableContainer>
                    <MyTable>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" > Data da viagem </TableCell>
                                <TableCell align="center" > Destino </TableCell>
                                <TableCell align="center" > Motorista </TableCell>
                                <TableCell align="center" > Veículo </TableCell>
                                <TableCell align="center" > Assentos vagos </TableCell>
                                <TableCell align="center" > Detalhes </TableCell>
                                <TableCell align="center" > Passageiros na viagem </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {travels.map( (travel: ITravels) => (
                            <TableRow key={travel.id}>
                                <TableCell align="center" >
                                    {new Date(travel.departure_date).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}
                                </TableCell>
                                <TableCell align="center" >
                                    {travel.destination}
                                </TableCell>
                                <TableCell align="center" >
                                    {travel.driver}
                                </TableCell>
                                <TableCell align="center" >
                                    {travel.vehicle}
                                </TableCell>
                                <TableCell align="center" >
                                    {travel.vacant_seats}
                                </TableCell>
                                <TableCell align="center" >
                                    <MyButton type="submit" onClick={() => goToEdit(travel.id)}>
                                        <MyFiSearch />
                                    </MyButton>
                                </TableCell>
                                <TableCell align="center" >
                                    <MyButton type="submit">
                                        <MyFiUsers />
                                    </MyButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </MyTable>
                </TableContainer>
                {/* </Form> */}
               
            </FormContainer>
        </MainDiv>
    );
}

export default ListActiveTravels;