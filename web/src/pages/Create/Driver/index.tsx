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


interface ICreateDriver {
    name: string;
    cpf: string;
    cnh: string;
    cel_phone: string;
};

const CreateDriver = () => {
    const history = useHistory();

    const formRef = useRef<FormHandles>(null);

    const handleSubmit = useCallback(
        async (data: ICreateDriver) => {
            try {
                formRef.current!.setErrors({});

                const schema = Yup.object().shape({
                    name: Yup.string().required('Informe o nome do motorista'),
                    cpf: Yup.string().required('Informe o CPF do motorista'),
                    cnh: Yup.string().required('Informe a CNH do motorista'),
                    cel_phone: Yup.string().required('Informe o número de celular do motorista'),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                await api.post('/create/drivers', data);

                alert('Motorista salvo com sucesso');
                history.push('/');
            } catch (err) {
                alert('Houve um erro ao salvar novo motorista. Favor tentar novamente');
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
                    Cadastro de motorista:
                </Title>

                
            </Container>
            <FormContainer>
                <Form ref={formRef} onSubmit={handleSubmit} >
                    <Input 
                        name="name" 
                        label="Nome" 
                        placeholder="Informe o nome do motorista a ser cadastrado" 
                    />
                    <Input 
                        name="cpf" 
                        label="CPF" 
                        placeholder="Informe o CPF do motorista a ser cadastrado" 
                    />
                    <Input 
                        name="cnh" 
                        label="CNH" 
                        placeholder="Informe a CNH do motorista a ser cadastrado" 
                    />
                    <Input 
                        name="cel_phone" 
                        label="Número de celular" 
                        placeholder="Informe o número de celular do motorista a ser cadastrado" 
                    />

                    <Button type="submit">Salvar</Button>
                </Form>
            </FormContainer>
        </MainDiv>
    );
}

export default CreateDriver;