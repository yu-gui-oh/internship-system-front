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

interface IDrivers {
    id: string;
    name: string;
    cpf: string;
    cnh: string;
    cel_phone: string;
}

const ListActiveDrivers = () => {
    // const history = useHistory();

    const [drivers, setDrivers] = useState<IDrivers[]>([]);

    const formRef = useRef<FormHandles>(null);

    useEffect(() => {
        async function loadDrivers(): Promise<void> {
            await api.get('/list/drivers')
            .then( response => {
                const drivers = response.data.map( ( driver: IDrivers ) => ({
                    id: driver.id,
                    name: driver.name,
                    cpf: driver.cpf,
                    cnh: driver.cnh,
                    cel_phone: driver.cel_phone,
                }) );
                setDrivers(drivers);
            });
        };
        loadDrivers();
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
                    Motoristas:
                </Title>

                
            </Container>
            <FormContainer>
                <Form ref={formRef} onSubmit={handleSubmit} >

                <TableContainer>
                    <MyTable>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" > Nome </TableCell>
                                <TableCell align="center" > CPF </TableCell>
                                <TableCell align="center" > CNH </TableCell>
                                <TableCell align="center" > Celular </TableCell>
                                <TableCell align="center" > Detalhes </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {drivers.map( (driver: IDrivers) => (
                            <TableRow key={driver.id}>
                                <TableCell align="center" >
                                    {driver.name}
                                </TableCell>
                                <TableCell align="center" >
                                    {driver.cpf}
                                </TableCell>
                                <TableCell align="center" >
                                    {driver.cnh}
                                </TableCell>
                                <TableCell align="center" >
                                    {driver.cel_phone}
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

export default ListActiveDrivers;