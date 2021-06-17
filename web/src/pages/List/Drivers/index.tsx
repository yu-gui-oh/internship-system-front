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

interface IDrivers {
    id: string;
    name: string;
    cpf: string;
    cnh: string;
    cel_phone: string;
}

const ListActiveDrivers = () => {
    const history = useHistory();

    const [drivers, setDrivers] = useState<IDrivers[]>([]);

    const [reload, setReload] = useState(0)
    const [searchParams, setSearchParams] = useState("");

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
    }, [reload]);

    const searchTravel = React.useCallback(() => {
        if ( searchParams ) {
           api.get(`/drivers/search/${searchParams}`).then( response => {
            const drivers = response.data.map( ( driver: IDrivers ) => ({
                id: driver.id,
                name: driver.name,
                cpf: driver.cpf,
                cnh: driver.cnh,
                cel_phone: driver.cel_phone,
            }) );
            setDrivers(drivers);
            }); 
        }
    }, [
        searchParams
    ]);

    const goToEdit = React.useCallback(
        (id: string) => {
            localStorage.setItem('driver_id', id);
            history.push('/edit/driver');
        },
        [
            history
        ],
      );
   
    const clearSearch = React.useCallback(
        () => {
            setReload(reload + 1);
        },
        [
            reload
        ],
    );

    //   const clearSearch = React.useCallback(
    //     () => {
    //         api.get('/list/drivers')
    //         .then( response => {
    //             const drivers = response.data.map( ( driver: IDrivers ) => ({
    //                 id: driver.id,
    //                 name: driver.name,
    //                 cpf: driver.cpf,
    //                 cnh: driver.cnh,
    //                 cel_phone: driver.cel_phone,
    //             }) );
    //             setDrivers(drivers);
    //         });
    //     },
    //     [
    //     ],
    //   );

    return(
        <MainDiv>
            <Container>
                <Title>
                    Motoristas:
                </Title>

                
            </Container>

            <SearchContainer>
                <Form ref={formRef} onSubmit={searchTravel} >
                    <ColumnDiv>
                        <div style={{width: '50%'}}>
                            <Input 
                                name="search_param" 
                                label="Buscar por" 
                                onChange={event => setSearchParams(event.target.value)}
                            />
                        </div>
                        <div style={{width: '20%', marginTop: '3rem'}}>
                            <MyButton onClick={() => searchTravel()}>
                                <MyFiSearch />
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
                                    <MyButton type="submit" onClick={() => goToEdit(driver.id)}>
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

export default ListActiveDrivers;