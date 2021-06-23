import React, { 
    useRef, 
    // useEffect,
    useState,
} from 'react';

// import * as Yup from 'yup';
import { FormHandles } from '@unform/core';

import api from '../../services/api';

import { useHistory } from 'react-router';

import Input from '../../components/Input';
import Select from '../../components/Select';
import Loading from '../../components/Loading';

import {
    Form,
    MainDiv,
    ColumnDiv,
    Container,
    FormContainer,
    SearchContainer,
    PassengersContainer,
    PassengersColumn,
    Title,
    MyFiSearch,
    // MyFiUsers,
    MyButton,
    PassengerButton,
} from './styles';

interface ITravels {
    id: string;
    departure_date: string;
    destination: string;
    driver: string;
    vehicle: string;
    vacant_seats: number;
    status: string;
};

interface ITravelOpt {
    value: string;
    label: string;
}

interface IPassengers {
    id: string;
    name: string;
    cpf: string;
};

const ListActiveTravels = () => {
    const history = useHistory();

    // const [travels, setTravels] = useState<ITravels[]>([]);

    const [travelOpt, setTravelOpt] = useState<ITravelOpt[]>([]);
    const [passengers, setPassengers] = useState<IPassengers[]>([]);

    // const [reload, setReload] = useState(0);
    const [searchParams, setSearchParams] = useState("");
    const [passengerSearchParams, setPassengerSearchParams] = useState("");

    const [loaded, setLoaded] = useState(true);
    const [loadedPassenger, setLoadedPassenger] = useState(true);

    const formRef = useRef<FormHandles>(null);

    // useEffect(() => {
    //     setLoaded(false);
    //     async function loadTravels(): Promise<void> {
    //         await api.get('/travels/active')
    //         .then( response => {
    //             const travels = response.data.map( ( travel: ITravels ) => ({
    //                 id: travel.id,
    //                 departure_date: travel.departure_date,
    //                 destination: travel.destination,
    //                 driver: travel.driver,
    //                 vehicle: travel.vehicle,
    //                 vacant_seats: travel.vacant_seats,
    //                 status: travel.status,
    //             }) );
    //             setTravels(travels);
    //             setTimeout(
    //                 () => 
    //                 setLoaded(true),
    //                 1500
    //             );
    //         });
    //     };
    //     loadTravels();
    // }, [reload]);

    // const goToEdit = React.useCallback(
    //     (id: string) => {
    //         localStorage.setItem('travel_id', id);
    //         history.push('/edit/travel');
    //     },
    //     [
    //         history
    //     ],
    //   );

      const searchTravel = React.useCallback(() => {
        setLoaded(false);
        if ( searchParams ) {
            api.get(`/travels/search/${searchParams}`).then(response =>{
                const travels = response.data.map( ( travel: ITravels ) => ({
                    value: String(travel.id),
                    label: new Date(travel.departure_date).toLocaleDateString('pt-BR', {timeZone: 'UTC'}) + "  |  " + 
                           String(travel.destination) + "  |  Assentos vagos: " + 
                           String(travel.vacant_seats),
            }));
            setTravelOpt(travels);
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

    const searchPassenger = React.useCallback(() => {
        setLoadedPassenger(false);
        if ( passengerSearchParams ) {
           api.get(`/passengers/${passengerSearchParams}`).then( response => {
            const passengers = response.data.map( ( passenger: IPassengers ) => ({
                id: passenger.id,
                name: passenger.name,
                cpf: passenger.cpf,
            }) );
            setPassengers(passengers);
            setTimeout(
                () => 
                setLoadedPassenger(true),
                750
            );
            }); 
        }
    }, [
        passengerSearchParams
    ]);

    // const clearSearch = React.useCallback(
    //         () => {
    //             setReload(reload + 1);
    //         },
    //         [
    //             reload
    //         ],
    //     );

    return(
        <MainDiv>
            <Container>
                <Title>
                    Agendamento:
                </Title>
            </Container>

            <FormContainer>
                <SearchContainer>
                    <Form ref={formRef} onSubmit={searchTravel} >
                        <ColumnDiv style={{paddingLeft: '5rem', paddingRight: '5rem'}}>
                            <div style={{width: '60%'}}>
                                <Input 
                                    name="search_param" 
                                    label="Buscar por" 
                                    type="date"
                                    onChange={event => setSearchParams(event.target.value)}
                                />
                            </div>
                            <div style={{width: '35%', marginTop: '3rem'}}>
                                <MyButton onClick={() => searchTravel()}>
                                    <h4 style={{color: '#FFF'}}>Pesquisar</h4>
                                </MyButton>
                            </div>
                            {/* <div style={{width: '20%', marginTop: '3rem'}}>
                                <MyButton onClick={() => clearSearch()} style={{background: '#f74848'}}>
                                    <h4 style={{color: '#FFF'}}>Limpar busca</h4>
                                </MyButton>
                            </div> */}
                        </ColumnDiv>
                        <Select 
                            name="travel"
                            options={travelOpt}
                            label="Escolha uma viagem"
                            onChange={() => history.push('/')}
                    />
                    </Form>
                </SearchContainer>
                {
                loaded === false ?
                    <Loading />
                :
                    <PassengersContainer>
                        <PassengersColumn>
                        {
                            loadedPassenger === false ?
                                <Loading />
                            :
                            <div>
                                <Form ref={formRef} onSubmit={searchPassenger} >
                                    <ColumnDiv>
                                        <div style={{width: '70%'}}>
                                            <Input
                                                name="passenger_search_param" 
                                                label="Buscar por"
                                                onChange={event => setPassengerSearchParams(event.target.value)}
                                            />
                                        </div>
                                        <div style={{width: '25%', marginTop: '3rem'}}>
                                            <MyButton onClick={() => searchPassenger()}>
                                                <MyFiSearch />
                                            </MyButton>
                                        </div>
                                    </ColumnDiv>
                                </Form>

                                <div>
                                {passengers.map( (passenger: IPassengers) => (
                                    <PassengerButton key={passenger.id}>
                                        <h4 style={{color: '#FFF'}}>
                                            Nome: 
                                            {
                                                passenger.name
                                            } | CPF: 
                                            {
                                                passenger.cpf
                                            }
                                        </h4>
                                    </PassengerButton>
                                ))}
                                </div>
                            </div>
                        }
                            
                        </PassengersColumn>

                        <PassengersColumn>
                            
                        </PassengersColumn>
                    </PassengersContainer>
                } 
            </FormContainer>
        </MainDiv>
    );
}

export default ListActiveTravels;