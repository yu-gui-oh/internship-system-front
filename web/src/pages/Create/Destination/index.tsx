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


interface ICreateDestination {
    destination: string;
};

const CreateDestination = () => {
    const history = useHistory();

    const formRef = useRef<FormHandles>(null);

    const handleSubmit = useCallback(
        async (data: ICreateDestination) => {
            try {
                formRef.current!.setErrors({});

                const schema = Yup.object().shape({
                    destination: Yup.string().required('Informe um novo destino'),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                await api.post('/create/destinations', data);

                alert('Destino salvo com sucesso');
                history.push('/');
            } catch (err) {
                alert('Houve um erro ao salvar novo destino. Favor tentar novamente');
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
                    Cadastro de destino:
                </Title>

                
            </Container>
            <FormContainer>
                <Form ref={formRef} onSubmit={handleSubmit} >
                    <Input 
                        name="destination" 
                        label="Destino" 
                        placeholder="Informe o destino a ser cadastrado" 
                    />
                    <Button type="submit">Salvar</Button>
                </Form>
            </FormContainer>
        </MainDiv>
    );
}

export default CreateDestination;