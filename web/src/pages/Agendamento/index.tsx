import React, { 
    useRef, 
    // useEffect,
    useState,
} from 'react';

import Modal from 'react-modal';

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
    SeatsHeader,
    MyModal,
} from './styles';

interface ITravels {
    id: string;
    departure_date: string;
    destination: string;
    driver: string;
    vehicle: string;
    vacant_seats: number;
    total_seats: number;
    booked_seats: number;
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

    const [travels, setTravels] = useState<ITravels[]>([]);

    const [travelOpt, setTravelOpt] = useState<ITravelOpt[]>([]);
    const [passengers, setPassengers] = useState<IPassengers[]>([]);

    // const [reload, setReload] = useState(0);
    const [searchParams, setSearchParams] = useState("");
    const [passengerSearchParams, setPassengerSearchParams] = useState("");

    const [loaded, setLoaded] = useState(true);
    const [loadedPassenger, setLoadedPassenger] = useState(true);
    const [displaySelect, setDisplaySelect] = useState(false);

    const [travelId, setTravelId] = useState("");

    const [totalSeats, setTotalSeats] = useState(0);
    const [bookedSeats, setBookedSeats] = useState(0);
    const [vacantSeats, setVacantSeats] = useState(0);

    // const [showModal, setShowModal] = useState(false);
    const [questionModalVisible, setQuestionModalVisible] = useState<string | undefined>()

    const formRef = useRef<FormHandles>(null);

    React.useEffect(() => {
        setLoaded(false);
            async function loadTravel(): Promise<void> {
                if ( travelId !== ""){
                    await api.get(`/travels/${travelId}`).then( response => {
                        setTotalSeats(response.data.travels.total_seats);
                        setBookedSeats(response.data.travels.booked_seats);
                        setVacantSeats(response.data.travels.vacant_seats);
                        setLoaded(true);
                        setTimeout(
                            () => 
                            setLoaded(true),
                            700
                        );
                    });
                        
                };
            };
            loadTravel();
    }, [travelId]);

    const handleTravelId = React.useCallback((data: NamedNodeMap) => {
        const usableTravelId = data[2].nodeValue!;
        setTravelId(usableTravelId);
    },[]);

      const searchTravel = React.useCallback(() => {
        setDisplaySelect(false);
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
            setDisplaySelect(true);
        });
        }
    }, [
        searchParams
    ]);

    const searchPassenger = React.useCallback(() => {
        if ( passengerSearchParams !== "" ) {
            setLoadedPassenger(false);
            api.get(`/passengers/agendamento/${passengerSearchParams}`).then( response => {
            const passengers = response.data.map( ( passenger: IPassengers ) => ({
                id: passenger.id,
                name: passenger.name,
                cpf: passenger.cpf,
            }) );
            setPassengers(passengers);
            setTimeout(
                () => 
                setLoadedPassenger(true),
                700
            );
            }); 
        }
    }, [
        passengerSearchParams
    ]);

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
                        </ColumnDiv>
                        {
                            displaySelect === true ?
                            <Select 
                                name="travel"
                                options={travelOpt}
                                label="Escolha uma viagem"
                                onChange={e => handleTravelId(e.target.attributes)}  
                            />
                            :
                                null
                        }
                    </Form>
                </SearchContainer>
                {
                loaded === false ?
                    // <Loading />
                    null
                :
                    <PassengersContainer>
                        <PassengersColumn style={{paddingLeft: '1rem', paddingRight: '1rem'}}>
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
                                                label="Buscar por passageiro"
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
                                    <div>    
                                        <PassengerButton key={passenger.id} 
                                            onClick={() => setQuestionModalVisible("on")}
                                        >
                                            <h4 style={{color: '#FFF'}} >
                                                Nome: 
                                                {
                                                    ' ' + passenger.name
                                                } | CPF: 
                                                {
                                                    ' ' + passenger.cpf
                                                }
                                            </h4>
                                        </PassengerButton>
                                        
                                        {/* { 
                                            showModal === true ? 
                                                null
                                            :
                                                null
                                        } */}

                                    </div>
                                ))}
                                </div>
                            </div>
                        }
                            <Modal 
                                isOpen={questionModalVisible !== undefined} 
                                onRequestClose={() => setQuestionModalVisible(undefined)}
                                style={{content: { borderRadius: '1rem', height: '20rem', width: '40rem', marginLeft: 'auto', marginRight: 'auto' }}}
                            >
                                <button onClick={() => setQuestionModalVisible(undefined)}>Fechar</button>
                            </Modal>
                        </PassengersColumn>

                        <PassengersColumn>
                            <SeatsHeader>
                                <div>
                                    <h5 style={{color: '#FFF'}}>
                                        Assentos vagos:
                                        {
                                            ' ' + vacantSeats
                                        } | Assentos reservados:
                                        {
                                            ' ' + bookedSeats
                                        }
                                    </h5>
                                </div>
                                <div>
                                    <h5 style={{color: '#FFF'}}>
                                        Total de assentos:
                                        {
                                            ' ' + totalSeats
                                        }
                                    </h5>
                                </div>
                            </SeatsHeader>


                        </PassengersColumn>
                    </PassengersContainer>
                } 
            </FormContainer>
        </MainDiv>
    );
}

export default ListActiveTravels;