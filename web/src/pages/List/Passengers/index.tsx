import React, { 
    useRef, 
    // useCallback,
    useEffect,
    useState,
} from 'react';

// import * as Yup from 'yup';
import { FormHandles } from '@unform/core';

import api from '../../../services/api';

import { useHistory } from 'react-router';

import Input from '../../../components/Input';

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
    const history = useHistory();

    const [passengers, setPassengers] = useState<IPassengers[]>([]);

    const [reload, setReload] = useState(0);
    const [searchParams, setSearchParams] = useState("");

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
    }, [reload]);

    const searchDriver = React.useCallback(() => {
        if ( searchParams ) {
           api.get(`/passengers/search/${searchParams}`).then( response => {
            const passengers = response.data.map( ( passenger: IPassengers ) => ({
                id: passenger.id,
                name: passenger.name,
                birth_date: passenger.birth_date,
                cell_phone: passenger.cell_phone,
                rg: passenger.rg,
            }) );
            setPassengers(passengers);
            }); 
        }
    }, [
        searchParams
    ]);

    const clearSearch = React.useCallback(
            () => {
                setReload(reload + 1);
            },
            [
                reload
            ],
        );

      const goToEdit = React.useCallback(
        (id: string) => {
            localStorage.setItem('passenger_id', id);
            history.push('/edit/passenger');
        },
        [
            history
        ],
      );

    return(
        <MainDiv>
            <Container>
                <Title>
                    Passageiros:
                </Title>
            </Container>

            <SearchContainer>
                <Form ref={formRef} onSubmit={searchDriver} >
                    <ColumnDiv>
                        <div style={{width: '50%'}}>
                            <Input 
                                name="search_param" 
                                label="Buscar por" 
                                onChange={event => setSearchParams(event.target.value)}
                            />
                        </div>
                        <div style={{width: '20%', marginTop: '3rem'}}>
                            <MyButton onClick={() => searchDriver()}>
                                <h4 style={{color: '#FFF'}}>Pesquisar</h4>
                            </MyButton>
                        </div>
                        <div style={{width: '20%', marginTop: '3rem'}}>
                            <MyButton onClick={() => clearSearch()} style={{background: '#f74848'}}>
                                <h4 style={{color: '#FFF'}}>Limpar busca</h4>
                            </MyButton>
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
                                    <MyButton type="submit" onClick={() => goToEdit(passenger.id)}>
                                        <MyFiSearch />
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

export default ListActivePassengers;