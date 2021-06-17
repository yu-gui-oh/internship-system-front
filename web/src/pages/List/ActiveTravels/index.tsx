import React, { 
    useRef, 
    useCallback,
    useEffect,
    useState,
} from 'react';

import * as Yup from 'yup';
import { FormHandles } from '@unform/core';

import api from '../../../services/api';

import { useHistory } from 'react-router';

import Input from '../../../components/Input'

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import {
    Form,
    MainDiv,
    ColumnDiv,
    Container,
    FormContainer,
    SearchContainer,
    Title,
    MyTable,
    MyFiSearch,
    MyFiUsers,
    MyButton,
} from './styles';

interface ISearchParam {
    search_param: string;
};
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

    const [searchParams, setSearchParams] = useState("");

    const formRef = useRef<FormHandles>(null);

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

    const handleSearch = useCallback(
        async (data: ISearchParam): Promise<void> => {
            try {
                formRef.current!.setErrors({});
                const schema = Yup.object().shape({
                    search_param: Yup.string(),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                await api.get(`/travels/search/${data.search_param}`).then( response => {
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
                })
            } catch(err){
                alert('Nenhum resultado.');
            }
        }, [

    ]);
    // const searchTravel = useCallback(
    //     async (): Promise<void> => {
    //         try {
    //             await api.get(`/travels/search/${searchParams}`).then( response => {
    //                 const travels = response.data.map( ( travel: ITravels ) => ({
    //                     id: travel.id,
    //                     departure_date: travel.departure_date,
    //                     destination: travel.destination,
    //                     driver: travel.driver,
    //                     vehicle: travel.vehicle,
    //                     vacant_seats: travel.vacant_seats,
    //                     status: travel.status,
    //                 }) );
    //                 setTravels(travels);
    //             })
    //         } catch(err){
    //             alert('Nenhum resultado.');
    //         }
    //     }, [
    //         searchParams
    // ]);

    return(
        <MainDiv>
            <Container>
                <Title>
                    Viagens em andamento:
                </Title>
            </Container>

            <SearchContainer>
                <Form ref={formRef} onSubmit={handleSearch} >
                    <ColumnDiv>
                        <div style={{width: '75%'}}>
                            <Input 
                                name="search_param" 
                                label="Buscar no dia" 
                                type="date"
                                onChange={event => setSearchParams(event.target.value)}
                            />
                        </div>
                        <div style={{width: '20%', marginTop: '3rem'}}>
                            {/* <MyButton onClick={() => searchTravel()}>
                                <MyFiSearch />
                            </MyButton> */}
                        </div>
                    </ColumnDiv>
                </Form>
            </SearchContainer>

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