import React, { 
    useRef, 
    // useEffect,
    useState,
} from 'react';

import Modal from 'react-modal';

import * as Yup from 'yup';
import { FormHandles } from '@unform/core';

import api from '../../services/api';

// import { useHistory } from 'react-router';

import Input from '../../components/Input';
import Select from '../../components/Select';
import Loading from '../../components/Loading';
import PassengerButton from '../../components/PassengerButton';

import {
    Form,
    MainDiv,
    ColumnDiv,
    Container,
    FormContainer,
    SearchContainer,
    PassengersContainer,
    AddPassengerContainer,
    PassengersColumn,
    Title,
    SeatsHeader,
    MyFiSearch,
    // MyFiUsers,
    MyButton,
    // MyModal,
    MyFiCheck,
    MyFiX,
    // MyFiUsersX,
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

interface ITravelPassenger {
    travel_id: string;
    passenger_id: string;
    destination: string;
    observation: string;
    companion: string;
};

interface IAddedPassenger {
    id: string;
    name: string;
    cpf: string;
    destination: string;
    companion: string;
    observation: string;
};

interface IAddedId {
    id: string;
};

const ListActiveTravels = () => {
    // const history = useHistory();

    // const [travels, setTravels] = useState<ITravels[]>([]);

    const [travelOpt, setTravelOpt] = useState<ITravelOpt[]>([]);
    const [passengers, setPassengers] = useState<IPassengers[]>([]);
    const [passengersInTravel, setPassengersInTravel] = useState<IAddedPassenger[]>([]);
    const [passengerIdsArray, setPassengersIdsArray] = useState<IAddedId[]>([]);

    // const [reload, setReload] = useState(0);
    const [searchParams, setSearchParams] = useState("");
    const [passengerSearchParams, setPassengerSearchParams] = useState("");

    const [loaded, setLoaded] = useState(true);
    const [loadedPassenger, setLoadedPassenger] = useState(true);
    const [displaySelect, setDisplaySelect] = useState(false);

    const [travelId, setTravelId] = useState("");
    
    const [passengerToAdd, setPassengerToAdd] = useState<IPassengers>();
    const [passengersUpdate, setPassengersUpdate] = useState(true);
    // const [alreadyAdded, setAlreadyAdded] = useState(false);

    const [totalSeats, setTotalSeats] = useState(0);
    const [bookedSeats, setBookedSeats] = useState(0);
    const [vacantSeats, setVacantSeats] = useState(0);

    // const [showModal, setShowModal] = useState(false);
    const [modalVisible, setModalVisible] = useState<string | undefined>()

    const CompanionOpt =[
        { value: 'false', label: 'NÃO' },
        { value: 'true', label: 'SIM' },
    ];

    const formRef = useRef<FormHandles>(null);

    React.useEffect(() => {
        if ( passengerToAdd?.id ) {
            setModalVisible("on");
        }
    },[passengerToAdd])

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
        async function loadTravelPassengers(): Promise<void> {
            if ( travelId !== ""){
                if ( passengersUpdate === true ) {
                    await api.get(`/list/travel/passengers/${travelId}`).then( response => {
                        setPassengersInTravel(response.data.passengersArray);
                        setPassengersIdsArray(response.data.idsArray);
                        setPassengersUpdate(false);
                    });
                }
            }
            
        };
        loadTravel();
        loadTravelPassengers();
    }, [travelId, passengersUpdate]);

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
        // setAlreadyAdded(false);
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

    const addPassengerToTravel = React.useCallback(
        async (data: ITravelPassenger) => {
            try {
                formRef.current!.setErrors({});

                const schema = Yup.object().shape({
                    travel_id: Yup.string().required(),
                    passenger_id: Yup.string().required(),
                    companion: Yup.string().required(),
                    destination: Yup.string().required(),
                    observation: Yup.string(),
                });
                
                if ( passengerToAdd ) {
                    data.travel_id = travelId;
                    data.passenger_id = passengerToAdd.id;
                }

                await schema.validate(data, {
                    abortEarly: false,
                });

                await api.post('/new/travel/passengers', data);
                
                setModalVisible(undefined);
                setPassengersUpdate(true);
            } catch (err) {
                alert('Houve um erro ao adicionar passageiro. Favor tentar novamente');
            }
        }, 
        [
            passengerToAdd,
            travelId,
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
                                    <div key={passenger.id}>
                                        { passengerIdsArray.map((passengerId: IAddedId) => {
                                            // if ( passenger.id !== passengerId.id ) {
                                                <div key={passenger.id}>    
                                                    {
                                                        passenger.id === passengerId.id ?
                                                            null
                                                        :
                                                        <PassengerButton key={passenger.id} 
                                                            onClick={() => {
                                                                setPassengerToAdd({
                                                                    id: passenger.id,
                                                                    name: passenger.name,
                                                                    cpf: passenger.cpf
                                                                })
                                                            }}
                                                        >
                                                            <h4 style={{color: '#FFF'}} >
                                                                Nome: 
                                                                {
                                                                    ' ' + passenger.name
                                                                }
                                                            </h4>
                                                            <h4 style={{color: '#FFF'}} >
                                                                CPF: 
                                                                {
                                                                    ' ' + passenger.cpf
                                                                }
                                                            </h4>
                                                        </PassengerButton>
                                                    }
                                                    
                                                </div>
                                            // }
                                        })}
                                            
                                    </div>
                                ))}
                                </div>
                            </div>
                        }
                            <Modal 
                                isOpen={modalVisible !== undefined} 
                                onRequestClose={() => setModalVisible(undefined)}
                                ariaHideApp={false}
                                style={{content: { 
                                    borderRadius: '1rem', 
                                    height: '30rem', 
                                    width: '40rem', 
                                    marginLeft: 'auto', 
                                    marginRight: 'auto',
                                }}}
                            >
                                <AddPassengerContainer>
                                    <Form 
                                        ref={formRef} 
                                        onSubmit={addPassengerToTravel}
                                    >
                                        <h1>
                                            {passengerToAdd?.name}
                                        </h1>
                                        <h4>
                                            CPF: {' ' + passengerToAdd?.cpf}
                                        </h4>
                                        <ColumnDiv style={{marginBottom: '1rem'}}>
                                            <div style={{width: '48%'}}>
                                                <Input
                                                    name="destination" 
                                                    label="Destino"
                                                />
                                            </div>
                                            <div style={{width: '48%'}}>
                                                <Input
                                                    name="observation" 
                                                    label="Observação (opcional)"
                                                />
                                            </div>
                                        </ColumnDiv>
                                        <ColumnDiv style={{marginBottom: '4rem'}}>
                                            <div style={{width: '75%'}}>
                                                {/*Espaçamento*/}
                                            </div>
                                            <div style={{width: '30%'}}>
                                                <Select 
                                                    name="companion"
                                                    options={CompanionOpt}
                                                    label="Acompanhante"
                                                />
                                            </div>
                                        </ColumnDiv>
                                        <ColumnDiv>
                                            <div style={{width: '48%'}}>
                                                <MyButton 
                                                    type="submit"
                                                >
                                                    Adicionar
                                                </MyButton>
                                            </div>
                                            <div style={{width: '48%'}}>
                                                <MyButton 
                                                    style={{background: '#f74848'}}
                                                    onClick={() => setModalVisible(undefined)}
                                                >
                                                    Cancelar
                                                </MyButton>
                                            </div>
                                        </ColumnDiv>
                                    </Form>
                                </AddPassengerContainer>
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

                            {passengersInTravel.map( (passenger: IAddedPassenger) => (
                                <div 
                                    key={passenger.id} 
                                    style={{width: '100%', paddingLeft: '0.5rem', paddingRight: '0.5rem'}}
                                >    
                                    <PassengerButton key={passenger.id} 
                                        
                                    >
                                        <h4 style={{color: '#FFF'}} >
                                            Nome: 
                                            {
                                                ' ' + passenger.name
                                            } | Destino:
                                            {
                                                ' ' + passenger.destination
                                            }
                                        </h4>
                                        {
                                            passenger.companion === "true" ?
                                                <h4 style={{color: '#FFF'}} >
                                                    CPF: 
                                                    {
                                                        ' ' + passenger.cpf
                                                    } | Acompanhante: { ' ' }
                                                    <MyFiCheck />
                                                </h4>
                                                
                                            :
                                                <h4 style={{color: '#FFF'}} >
                                                    CPF: 
                                                    {
                                                        ' ' + passenger.cpf
                                                    } | Acompanhante: { ' ' }
                                                    <MyFiX />
                                                </h4>
                                        }
                                    </PassengerButton>
                                </div>
                            ))}

                        </PassengersColumn>
                    </PassengersContainer>
                } 
            </FormContainer>
        </MainDiv>
    );
}

export default ListActiveTravels;