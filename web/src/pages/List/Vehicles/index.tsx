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

    // const formRef = useRef<FormHandles>(null);

    useEffect(() => {
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
            });
        };
        loadVehicles();
    }, []);

    // const handleSubmit = React.useCallback(
    //     (id: string) => {
    //     //   history.push('/', id);
    //     },
    //     [
    //         // history
    //     ],
    //   );

      const goToEdit = React.useCallback(
        (id: string) => {
            localStorage.setItem('vehicle_id', id);
            history.push('/edit/vehicle');
        },
        [
            history
        ],
      );

    return(
        <MainDiv>
            <Container>
                <Title>
                    Veículos:
                </Title>

                
            </Container>
            <FormContainer>
                {/* <Form ref={formRef} onSubmit={handleSubmit} > */}

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
                {/* </Form> */}
               
            </FormContainer>
        </MainDiv>
    );
}

export default ListActivevehicles;