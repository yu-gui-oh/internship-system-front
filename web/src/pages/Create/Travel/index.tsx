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

interface ICreateTravel {
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

const CreateTravel = () => {
    const history = useHistory();

    const formRef = useRef<FormHandles>(null);

    const [vehicleOpt, setVehicleOpt] = useState<IVehicleOpt[]>([]);
    const [destinationOpt, setDestinationOpt] = useState<IDestinationOpt[]>([]);
    const [driverOpt, setDriverOpt] = useState<IDriverOpt[]>([]);
    const [absentHours, setAbsentHours] = useState(0);

    const StatusOptions =[
        { value: 'Andamento', label: 'Andamento' },
        { value: 'Finalizada', label: 'Finalizada' },
    ];

    useEffect(() => {
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

        loadVehicles(); 
        loadDestinations();
        loadDrivers();

    }, []);

    const handleSubmit = useCallback(
        async (data: ICreateTravel) => {
            try {
                formRef.current!.setErrors({});

                const schema = Yup.object().shape({
                    // departure_date: Yup.date().required('Informe a data de partida'),
                    departure_date: Yup.string().required('Informe a data de partida'),
                    departure_hour: Yup.string().required('Informe a hora de partida'),
                    destination: Yup.string().required('Informe o destino'),
                    vehicle: Yup.string().required('Informe o veículo'),
                    driver: Yup.date().required('Informe o motorista'),
                    return_date: Yup.date().required('Informe a data de retorno'),
                    return_hour: Yup.string().required('Informe a hora de retorno'),
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

                await schema.validate(data, {
                    abortEarly: false,
                });

                await api.post('/create/travels', data);

                alert('Viagem salva com sucesso');
                history.push('/');
            } catch (err) {
                alert('Houve um erro ao salvar nova viagem. Favor tentar novamente');
            }
        }, 
        [
            history,
            absentHours,
        ]
    );

    const handleAbsentHours = (event: ChangeEvent<HTMLInputElement>) => {
        if ( event.target.value === "" ){
            setAbsentHours(0);
        } else {
            setAbsentHours(parseInt(event.target.value));
        }
    }

    return(
        <MainDiv>
            <Container>
                <Title>
                    Cadastro de viagem:
                </Title>
            </Container>
            <FormContainer>
                <Form ref={formRef} onSubmit={handleSubmit} >
                    <ColumnDiv>
                        <div style={{width: '45%'}}>
                            <Input 
                                name="departure_date" 
                                label="Data de partida" 
                                type="date"
                            />
                        </div>
                        <div style={{width: '45%'}}>
                            <Input 
                                name="departure_hour" 
                                label="Hora de partida" 
                                type="time"
                            />
                        </div>
                    </ColumnDiv>
                    <Select 
                        name="destination"
                        options={destinationOpt}
                        label="Destino"
                    />
                    <Select 
                        name="vehicle"
                        options={vehicleOpt}
                        label="Veículo"
                    />
                    <Select 
                        name="driver"
                        options={driverOpt}
                        label="Motorista"
                    />
                    <ColumnDiv>
                        <div style={{width: '45%'}}>
                            <Input 
                                name="return_date" 
                                label="Data de retorno" 
                                type="date"
                            />
                        </div>
                        <div style={{width: '45%'}}>
                            <Input 
                                name="return_hour" 
                                label="Hora de retorno" 
                                type="time"
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
                            />
                        </div>
                        <div style={{width: '45%'}}>
                            <Input 
                                name="absent_hours" 
                                label="Horas ausentes (se houver)" 
                                type="number"
                                placeholder="0"
                                onChange={event => handleAbsentHours(event)}
                            />
                        </div>
                    </ColumnDiv>
                    <Select 
                        name="status"
                        options={StatusOptions}
                        defaultOption="Andamento"
                        label="Status da viagem"
                    />                    
                    <Input 
                        name="total_seats" 
                        label="Total de assentos do carro" 
                        type="number"
                    />
                    <Input 
                        name="booked_seats" 
                        label="Total de assentos reservados" 
                        type="number"
                        
                    />
                    <Input 
                        name="vacant_seats" 
                        label="Total de assentos vagos" 
                        type="number"
                    />

                    <Input 
                        name="observation" 
                        label="Observação" 
                        placeholder="Observações sobre a viagem" 
                    />
                    

                    <Button type="submit">Salvar</Button>
                </Form>
            </FormContainer>
        </MainDiv>
    );
}

export default CreateTravel;