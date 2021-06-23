import React, { 
    useRef, 
    useCallback,
    useEffect,
    useState,
    ChangeEvent, 
} from 'react';

import * as Yup from 'yup';
import { FormHandles } from '@unform/core';

import api from '../../../services/api';

import { useHistory } from 'react-router';

import Input from '../../../components/Input';
import Select from '../../../components/Select';
import Button from '../../../components/Button';
import Loading from '../../../components/Loading';

import {
    Form,
    MainDiv,
    Container,
    FormContainer,
    Title,
    ColumnDiv,
} from './styles';

interface IVehicle {
    id: string;
    vehicle: string;
}

interface IVehicleOpt {
    value: string;
    label: string;
}

interface IDestination {
    id: string;
    destination: string;
}

interface IDestinationOpt {
    value: string;
    label: string;
}

interface IDriver {
    id: string;
    name: string;
}

interface IDriverOpt {
    value: string;
    label: string;
}

interface IShowTravel {
    id: string;
    departure_date: string;
    departure_hour: string;
    destination: string;
    vehicle: string;
    driver: string;
    return_date: Date;
    return_hour: string;
    daily_payout: number;
    absent_hours: number;
    status: string;
    observation: string;
    total_seats: number;
    booked_seats: number;
    vacant_seats: number;
};

const ShowTravel = () => {
    const history = useHistory();

    const travel_id = localStorage.getItem('travel_id');

    const [readOnlyStatus, setReadOnlyStatus] = useState(false);
    
    const [departureDate, setDepartureDate] = useState("");
    const [departureHour, setDepartureHour] = useState("");
    const [destination, setDestination] = useState("");
    const [vehicle, setVehicle] = useState("");
    const [driver, setDriver] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [returnHour, setReturnHour] = useState("");
    const [dailyPayout, setDailyPayout] = useState(0);
    const [absentHours, setAbsentHours] = useState(0);
    const [status, setStatus] = useState("");
    const [observation, setObservation] = useState("");
    const [totalSeats, setTotalSeats] = useState(0);
    const [bookedSeats, setBookedSeats] = useState(0);
    const [vacantSeats, setVacantSeats] = useState(0);

    const [loaded, setLoaded] = useState(false);

    const formRef = useRef<FormHandles>(null);

    const [vehicleOpt, setVehicleOpt] = useState<IVehicleOpt[]>([]);
    const [destinationOpt, setDestinationOpt] = useState<IDestinationOpt[]>([]);
    const [driverOpt, setDriverOpt] = useState<IDriverOpt[]>([]);

    const StatusOptions =[
        { value: 'Andamento', label: 'Andamento' },
        { value: 'Finalizada', label: 'Finalizada' },
        { value: 'Cancelada', label: 'Cancelada' },
    ];

    useEffect(() => {
        setLoaded(false);
        async function loadVehicles(): Promise<void> {
            await api.get('/vehicles').then(response =>{
                const vehicles = response.data.map( (vehicle: IVehicle) => ({
                    value: "vehicle_" + String(vehicle.id),
                    label: String(vehicle.vehicle),
                }));
                setVehicleOpt(vehicles);
            });
        }
        async function loadDestinations(): Promise<void> {
            await api.get('/destinations').then(response =>{
                const destinations = response.data.map( (destination: IDestination) => ({
                    value: "destination_" + String(destination.id),
                    label: String(destination.destination),
                }));
                setDestinationOpt(destinations);
            });
        }
        async function loadDrivers(): Promise<void> {
            await api.get('/drivers').then(response =>{
                const drivers = response.data.map( (driver: IDriver) => ({
                    value: "driver_" + String(driver.id),
                    label: String(driver.name),
                }));
                setDriverOpt(drivers);
            });
        }

        async function loadTravel(): Promise<void> {
            await api.get(`/travels/${travel_id}`).then(response =>{
                    setDepartureDate(response.data.travels.departure_date);
                    setDepartureHour(response.data.travels.departure_hour);
                    setDestination(String( "destination_" + response.data.travels.destination));
                    setVehicle(String( "vehicle_" + response.data.travels.vehicle));
                    setDriver(String( "driver_" + response.data.travels.driver));
                    setReturnDate(response.data.travels.return_date);
                    setReturnHour(response.data.travels.return_hour);
                    setDailyPayout(response.data.travels.daily_payout);
                    setAbsentHours(response.data.travels.absent_hours);
                    setStatus(response.data.travels.status);
                    setObservation(response.data.travels.observation);
                    setTotalSeats(response.data.travels.total_seats);
                    setBookedSeats(response.data.travels.booked_seats);
                    setVacantSeats(response.data.travels.vacant_seats);

                    if (response.data.travels.status !== 'Andamento') {
                        setReadOnlyStatus(true);
                    }
                });
        }
        
        loadVehicles(); 
        loadDestinations();
        loadDrivers();
        loadTravel();
        setTimeout(
            () => 
            setLoaded(true),
            1500
        );


    }, [travel_id]);

    const handleSubmit = useCallback(
        async (data: IShowTravel) => {
            try {
                formRef.current!.setErrors({});

                const schema = Yup.object().shape({
                    departure_date: Yup.string().required('Informe a data de partida'),
                    departure_hour: Yup.string(),
                    destination: Yup.string().required('Informe o destino'),
                    vehicle: Yup.string().required('Informe o veículo'),
                    driver: Yup.date().required('Informe o motorista'),
                    return_date: Yup.date(),
                    return_hour: Yup.string(),
                    daily_payout: Yup.number().required('Informe o valor da diária'),
                    absent_hours: Yup.number().nullable(),
                    status: Yup.string().required('Informe o status da viagem'),
                    total_seats: Yup.number().required('Informe o total de assentos do carro'),
                    booked_seats: Yup.number().required('Informe o total de assentos reservados do carro'),
                    vacant_seats: Yup.number().required('Informe o total de assentos vagos do carro'),
                    observation: Yup.string(),
                });
                
                data.absent_hours = absentHours;
                let newVehicleId = String(data.vehicle.split("_").pop());
                data.vehicle = newVehicleId;
                let newDriverId = String(data.driver.split("_").pop());
                data.driver = newDriverId;
                let newDestinationID = String(data.destination.split("_").pop());
                data.destination = newDestinationID;

                let numberTotalSeats = Number(data.total_seats);
                data.total_seats = numberTotalSeats;
                let numberBookedSeats = Number(data.booked_seats);
                data.booked_seats = numberBookedSeats;
                let numberVacantSeats = Number(data.vacant_seats);
                data.vacant_seats = numberVacantSeats;

                await schema.validate(data, {
                    abortEarly: false,
                });

                await api.post(`/edit/travel/${travel_id}`, data);

                alert('Viagem editada com sucesso!');
                history.push('/list/travels');
            } catch (err) {
                alert('Houve um erro ao editar viagem. Verifique se todos os campos foram preenchidos corretamente.');
            }
        }, 
        [
            history,
            absentHours,
            travel_id
        ]
    );

    const handleAbsentHours = (event: ChangeEvent<HTMLInputElement>) => {
        if ( event.target.value === "" ){
            setAbsentHours(0);
        } else {
            setAbsentHours(parseInt(event.target.value));
        }
    }

    const goToLists = React.useCallback(() => {
            history.push('/list/travels');
        },
        [
            history
        ],
      );

    return(
        <MainDiv>
            <Container>
                <Title>
                    Cadastro de viagem:
                </Title>
            </Container>
            <FormContainer>
            {
                loaded === false ?
                    <Loading />
                :
                <Form ref={formRef} onSubmit={handleSubmit} >
                    <ColumnDiv>
                        <div style={{width: '45%'}}>
                            <Input 
                                name="departure_date" 
                                label="Data de partida" 
                                type="date"
                                value={String(departureDate) || ''}
                                onChange={event => setDepartureDate(event.target.value)}
                                readOnly={readOnlyStatus}
                            />
                        </div>
                        <div style={{width: '45%'}}>
                            <Input 
                                name="departure_hour" 
                                label="Hora de partida" 
                                type="time"
                                value={departureHour}
                                onChange={event => setDepartureHour(event.target.value)}
                                readOnly={readOnlyStatus}
                            />
                        </div>
                    </ColumnDiv>
                    <Select 
                        name="destination"
                        options={destinationOpt}
                        label="Destino"
                        defaultOption={destination}
                        disabled={readOnlyStatus}
                    />
                    <Select 
                        name="vehicle"
                        options={vehicleOpt}
                        label="Veículo"
                        defaultOption={vehicle}
                        disabled={readOnlyStatus}
                    />
                    <Select 
                        name="driver"
                        options={driverOpt}
                        label="Motorista"
                        defaultOption={driver}
                        disabled={readOnlyStatus}
                    />
                    <ColumnDiv>
                        <div style={{width: '45%'}}>
                            <Input 
                                name="return_date" 
                                label="Data de retorno" 
                                type="date"
                                value={String(returnDate) || ''}
                                onChange={event => setReturnDate(event.target.value)}
                                readOnly={readOnlyStatus}
                            />
                        </div>
                        <div style={{width: '45%'}}>
                            <Input 
                                name="return_hour" 
                                label="Hora de retorno" 
                                type="time"
                                value={returnHour}
                                onChange={event => setReturnHour(event.target.value)}
                                readOnly={readOnlyStatus}
                            />
                        </div>
                    </ColumnDiv>

                    <ColumnDiv>
                        <div style={{width: '45%'}}>
                            <Input 
                                name="daily_payout" 
                                label="Valor da diária (em R$)" 
                                type="number" 
                                step=".01"
                                value={dailyPayout}
                                onChange={event => setDailyPayout(parseInt(event.target.value))}
                                readOnly={readOnlyStatus}
                            />
                        </div>
                        <div style={{width: '45%'}}>
                            <Input 
                                name="absent_hours" 
                                label="Horas ausentes" 
                                type="number"
                                placeholder="0"
                                onChange={event => handleAbsentHours(event)}
                                readOnly={readOnlyStatus}
                            />
                        </div>
                    </ColumnDiv>
                    <Select 
                        name="status"
                        options={StatusOptions}
                        defaultOption={status}
                        label="Status da viagem"
                        disabled={readOnlyStatus}
                    />                    
                    <Input 
                        name="total_seats" 
                        label="Total de assentos do carro" 
                        type="number"
                        value={totalSeats}
                        onChange={event => setTotalSeats(parseInt(event.target.value))}
                        readOnly
                    />
                    <Input 
                        name="booked_seats" 
                        label="Total de assentos reservados" 
                        type="number"
                        value={bookedSeats}
                        onChange={event => setBookedSeats(parseInt(event.target.value))}
                        readOnly
                        
                    />
                    <Input 
                        name="vacant_seats" 
                        label="Total de assentos vagos" 
                        type="number"
                        value={vacantSeats}
                        onChange={event => setVacantSeats(parseInt(event.target.value))}
                        readOnly
                    />

                    <Input 
                        name="observation" 
                        label="Observação" 
                        placeholder="Observações sobre a viagem" 
                        value={observation}
                        onChange={event => setObservation(event.target.value)}
                        readOnly={readOnlyStatus}
                    />
                    {
                        readOnlyStatus === false ? 
                            <Button type="submit">Salvar</Button>
                        :
                            <Button 
                                onClick={() => goToLists()}
                                style={{background: '#f74848'}}
                            >
                                Voltar
                            </Button>
                    }
                    
                </Form>
            }
            </FormContainer>
        </MainDiv>
    );
}

export default ShowTravel;