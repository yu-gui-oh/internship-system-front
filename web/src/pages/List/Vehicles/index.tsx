import React, { 
    useRef,
    useEffect,
    useState,
} from 'react';

// import * as Yup from 'yup';
import { FormHandles } from '@unform/core';

import api from '../../../services/api';

import { useHistory } from 'react-router';

import Input from '../../../components/Input';
import Loading from '../../../components/Loading';

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

interface IVehicles {
    id: string;
    plate: string;
    vehicle: string;
    type: string;
    due_date: string;
}

const ListActivevehicles = () => {
    const history = useHistory();

    const [vehicles, setVehicles] = useState<IVehicles[]>([]);

    const [reload, setReload] = useState(0);
    const [searchParams, setSearchParams] = useState("");

    const [loaded, setLoaded] = useState(false);

    const formRef = useRef<FormHandles>(null);

    useEffect(() => {
        setLoaded(false);
        async function loadVehicles(): Promise<void> {
            await api.get('/list/vehicles')
            .then( response => {
                const vehicles = response.data.map( ( vehicle: IVehicles ) => ({
                    id: vehicle.id,
                    plate: vehicle.plate,
                    vehicle: vehicle.vehicle,
                    type: vehicle.type,
                    due_date: vehicle.due_date,
                }) );
                setVehicles(vehicles);
                setTimeout(
                    () => 
                    setLoaded(true),
                    1500
                );
            });
        };
        loadVehicles();
    }, [reload]);

    const goToEdit = React.useCallback(
        (id: string) => {
            localStorage.setItem('vehicle_id', id);
            history.push('/edit/vehicle');
        },
        [
            history
        ],
    );

    const searchVehicle = React.useCallback(() => {
        setLoaded(false);
        if ( searchParams ) {
            api.get(`/vehicles/search/${searchParams}`)
            .then( response => {
                const vehicles = response.data.map( ( vehicle: IVehicles ) => ({
                    id: vehicle.id,
                    plate: vehicle.plate,
                    vehicle: vehicle.vehicle,
                    type: vehicle.type,
                    due_date: vehicle.due_date,
                }) );
            setVehicles(vehicles);
            setTimeout(
                () => 
                setLoaded(true),
                1500
            );
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

    return(
        <MainDiv>
            <Container>
                <Title>
                    Veículos:
                </Title>
            </Container>

            <SearchContainer>
                <Form ref={formRef} onSubmit={searchVehicle} >
                    <ColumnDiv>
                        <div style={{width: '50%'}}>
                            <Input 
                                name="search_param" 
                                label="Buscar por" 
                                onChange={event => setSearchParams(event.target.value)}
                            />
                        </div>
                        <div style={{width: '20%', marginTop: '3rem'}}>
                            <MyButton onClick={() => searchVehicle()}>
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
            {
                loaded === false ?
                    <Loading />
                :
                    <TableContainer>
                        <MyTable>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" > Placa </TableCell>
                                    <TableCell align="center" > Modelo </TableCell>
                                    <TableCell align="center" > Tipo </TableCell>
                                    <TableCell align="center" > Validade da documentação </TableCell>
                                    <TableCell align="center" > Detalhes </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {vehicles.map( (vehicle: IVehicles) => (
                                <TableRow key={vehicle.id}>
                                    <TableCell align="center" >
                                        {vehicle.plate}
                                    </TableCell>
                                    <TableCell align="center" >
                                        {vehicle.vehicle}
                                    </TableCell>
                                    <TableCell align="center" >
                                        {vehicle.type}
                                    </TableCell>
                                    <TableCell align="center" >
                                    {new Date(vehicle.due_date).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}
                                    </TableCell>
                                    <TableCell align="center" >
                                        <MyButton type="submit" onClick={() => goToEdit(vehicle.id)}>
                                            <MyFiSearch />
                                        </MyButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </MyTable>
                    </TableContainer>
            }
               
            </FormContainer>
        </MainDiv>
    );
}

export default ListActivevehicles;