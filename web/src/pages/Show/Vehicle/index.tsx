import React, { 
    useRef, 
    useCallback,
    useEffect,
    useState, 
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
} from './styles';

interface IShowVehicle {
    plate: string;
    vehicle: string;
    type: string;
    due_date: Date;
};

const ShowVehicle = () => {
    const history = useHistory();

    const vehicle_id = localStorage.getItem('vehicle_id');

    const [plate, setPlate] = useState("");
    const [vehicle, setVehicle] = useState("");
    const [type, setType] = useState("");
    const [dueDate, setDueDate] = useState("");

    const formRef = useRef<FormHandles>(null);

    const VehicleTypeOptions =[
        { value: 'Próprio', label: 'Próprio' },
        { value: 'Alugado', label: 'Alugado' },
    ];

    useEffect(() => {
        async function loadVehicle(): Promise<void> {
            await api.get(`/vehicles/${vehicle_id}`).then(response =>{
                    setPlate(response.data.plate);
                    setVehicle(response.data.vehicle);
                    setType(response.data.type);
                    setDueDate(response.data.due_date);
                });
        }
        loadVehicle();
    }, [vehicle_id]);

    const handleSubmit = useCallback(
        async (data: IShowVehicle) => {
            try {
                formRef.current!.setErrors({});

                const schema = Yup.object().shape({
                    plate: Yup.string().required('Informe a placa do veículo'),
                    vehicle: Yup.string().required('Informe o modelo do veículo'),
                    type: Yup.string().required('Informe o tipo do veículo'),
                    due_date: Yup.date().required('Informe a data de vencimento da documentação do veículo'),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                await api.post(`/edit/vehicle/${vehicle_id}`, data);

                alert('Veículo editado com sucesso!');
                history.push('/list/vehicles');
            } catch (err) {
                alert('Houve um erro ao editar veículo. Verifique se todos os campos foram preenchidos corretamente.');
            }
        }, 
        [
            history,
            vehicle_id
        ]
    );

    return(
        <MainDiv>
            <Container>
                <Title>
                    Cadastro de veículo:
                </Title>

                
            </Container>
            <FormContainer>
                <Form ref={formRef} onSubmit={handleSubmit} >
                    <Input 
                        name="plate" 
                        label="Placa" 
                        value={plate}
                        onChange={event => setPlate(event.target.value)}
                    />
                    <Input 
                        name="vehicle" 
                        label="Modelo" 
                        value={vehicle}
                        onChange={event => setVehicle(event.target.value)}
                    />
                    <Select 
                        name="type"
                        options={VehicleTypeOptions}
                        defaultOption={type}
                        label="Informe o tipo do veículo"
                    />
                    <Input 
                        name="due_date" 
                        label="Vencimento da documentação" 
                        type="date"
                        value={String(dueDate) || ''}
                        onChange={event => setDueDate(event.target.value)}
                    />
                    <Button type="submit">Salvar</Button>
                </Form>
            </FormContainer>
        </MainDiv>
    );
}

export default ShowVehicle;