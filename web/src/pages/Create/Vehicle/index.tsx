import React, { 
    useRef, 
    useCallback,
    // useEffect,
    useState, 
} from 'react';

import * as Yup from 'yup';
import { FormHandles } from '@unform/core';

import api from '../../../services/api';

import { useHistory } from 'react-router';

import Input from '../../../components/Input';
import Select from '../../../components/Select';
import Button from '../../../components/Button';

import Datepicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import {
    Form,
    MainDiv,
    Container,
    FormContainer,
    Title,
    // Input,
} from './styles';

interface ICreateVehicle {
    plate: string;
    vehicle: string;
    type: string;
    due_date: string;
};

const CreateVehicle = () => {
    const history = useHistory();

    const formRef = useRef<FormHandles>(null);

    const VehicleTypeOptions =[
        { value: 'Próprio', label: 'Próprio' },
        { value: 'Alugado', label: 'Alugado' },
    ];

    const [startDate, setStartDate] = useState(new Date());

    const handleSubmit = useCallback(
        async (data: ICreateVehicle) => {
            try {
                formRef.current!.setErrors({});

                const schema = Yup.object().shape({
                    plate: Yup.string().required('Informe a placa do veículo'),
                    vehicle: Yup.string().required('Informe o modelo do veículo'),
                    type: Yup.string().required('Informe o tipo do veículo'),
                    due_date: Yup.string().required('Informe a data de vencimento da documentação do veículo'),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                await api.post('/create/vehicles', data);

                alert('Veículo salvo com sucesso');
                history.push('/');
            } catch (err) {
                alert('Houve um erro ao salvar novo veículo. Favor tentar novamente');
            }
        }, 
        [
            history,
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
                        placeholder="Informe a placa do veículo a ser cadastrado" 
                    />
                    <Input 
                        name="vehicle" 
                        label="Modelo" 
                        placeholder="Informe o modelo do veículo a ser cadastrado" 
                    />
                    <Select 
                        name="type"
                        options={VehicleTypeOptions}
                        defaultOption="Próprio"
                        label="Informe o tipo do veículo"
                    />
                    <Input 
                        name="due_date" 
                        label="Vencimento da documentação" 
                        placeholder="Informe a data de vencimento da documentação do veículo a ser cadastrado" 
                    />

                    <Datepicker selected={startDate} onChange={() => (console.log("Data selecionada"))} />

                    <Button type="submit">Salvar</Button>
                </Form>
            </FormContainer>
        </MainDiv>
    );
}

export default CreateVehicle;