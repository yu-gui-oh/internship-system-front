import React, { 
    useRef, 
    useCallback,
    // useEffect,
    // useState, 
} from 'react';

import * as Yup from 'yup';
import { FormHandles } from '@unform/core';

import api from '../../../services/api';

import { useHistory } from 'react-router';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

import {
    Form,
    MainDiv,
    Container,
    FormContainer,
    Title,
    // Input,
} from './styles';


interface ICreatePassenger {
    name: string;
    cpf: string;
    rg: string;
    cel_phone: string;
};

const CreatePassenger = () => {
    const history = useHistory();

    const formRef = useRef<FormHandles>(null);

    const handleSubmit = useCallback(
        async (data: ICreatePassenger) => {
            try {
                formRef.current!.setErrors({});

                const schema = Yup.object().shape({
                    name: Yup.string().required('Informe o nome do passageiro'),
                    cpf: Yup.string().required('Informe o CPF do passageiro'),
                    rg: Yup.string().required('Informe a RG do passageiro'),
                    cel_phone: Yup.string().required('Informe o número de celular do passageiro'),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                await api.post('/create/passengers', data);

                alert('Passageiro salvo com sucesso');
                history.push('/');
            } catch (err) {
                alert('Houve um erro ao salvar novo passageiro. Favor tentar novamente');
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
                    Cadastro de passageiro:
                </Title>

                
            </Container>
            <FormContainer>
                <Form ref={formRef} onSubmit={handleSubmit} >
                    <Input 
                        name="name" 
                        label="Nome" 
                        placeholder="Informe o nome do passageiro" 
                    />
                    <Input 
                        name="cpf" 
                        label="CPF" 
                        placeholder="Informe o CPF do passageiro" 
                    />
                    <Input 
                        name="rg" 
                        label="RG" 
                        placeholder="Informe a RG do passageiro" 
                    />
                    <Input 
                        name="cel_phone" 
                        label="Número de celular" 
                        placeholder="Informe o número de celular do passageiro" 
                    />

                    <Button type="submit">Salvar</Button>
                </Form>
            </FormContainer>
        </MainDiv>
    );
}

export default CreatePassenger;