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
import Select from '../../../components/Select';
import Button from '../../../components/Button';

import {
    Form,
    MainDiv,
    Container,
    FormContainer,
    Title,
    ColumnDiv,
    // Input,
} from './styles';


interface ICreatePassenger {
    name: string;
    cpf: string;
    rg: string;
    issuing_body: string;
    birth_date: Date;
    cep: string;
    address: string;
    number: string;
    neighbourhood: string;
    city: string;
    uf: string;
    complement: string;
    phone: string;
    cell_phone: string;
    observation: string;
    status: boolean;
};

const CreatePassenger = () => {
    const history = useHistory();

    const formRef = useRef<FormHandles>(null);

    const UFOptions =[
        { value: 'AC', label: 'AC' },
        { value: 'AL', label: 'AL' },
        { value: 'AP', label: 'AP' },
        { value: 'AM', label: 'AM' },
        { value: 'BA', label: 'BA' },
        { value: 'CE', label: 'CE' },
        { value: 'DF', label: 'DF' },
        { value: 'ES', label: 'ES' },
        { value: 'GO', label: 'GO' },
        { value: 'MA', label: 'MA' },
        { value: 'MT', label: 'MT' },
        { value: 'MS', label: 'MS' },
        { value: 'MG', label: 'MG' },
        { value: 'PA', label: 'PA' },
        { value: 'PB', label: 'PB' },
        { value: 'PR', label: 'PR' },
        { value: 'PE', label: 'PE' },
        { value: 'PI', label: 'PI' },
        { value: 'RJ', label: 'RJ' },
        { value: 'RN', label: 'RN' },
        { value: 'RS', label: 'RS' },
        { value: 'RO', label: 'RO' },
        { value: 'RR', label: 'RR' },
        { value: 'SC', label: 'SC' },
        { value: 'SP', label: 'SP' },
        { value: 'SE', label: 'SE' },
        { value: 'TO', label: 'TO' },
    ];

    const handleSubmit = useCallback(
        async (data: ICreatePassenger) => {
            try {
                formRef.current!.setErrors({});

                const schema = Yup.object().shape({
                    name: Yup.string().required('Informe o nome do passageiro'),
                    cpf: Yup.string().required('Informe o CPF do passageiro'),
                    rg: Yup.string().required('Informe o RG do passageiro'),
                    issuing_body: Yup.string().required('Informe o ??rg??o emissor do documento'),
                    birth_date: Yup.date().required('Informe a data de nascimento do passageiro'),
                    cep: Yup.string().required('Informe o CEP do passageiro'),
                    address: Yup.string().required('Informe o endere??o do passageiro'),
                    number: Yup.string().required('Informe o n??mero'),
                    neighbourhood: Yup.string().required('Informe o bairro do passageiro'),
                    city: Yup.string().required('Informe a cidade'),
                    uf: Yup.string().required('Informe a UF'),
                    complement: Yup.string(),
                    phone: Yup.string(),
                    cell_phone: Yup.string().required('Informe o n??mero de celular do passageiro'),
                    observation: Yup.string(),
                    status: Yup.boolean(),
                });
                
                data.status = true;

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
                        placeholder="Informe o RG do passageiro" 
                    />
                    <Input 
                        name="issuing_body" 
                        label="??rg??o emissor" 
                        placeholder="Informe o ??rg??o emissor" 
                    />
                    <Input 
                        name="birth_date" 
                        label="Data de nascimento" 
                        type="date"
                    />
                    <Input 
                        name="cep" 
                        label="CEP" 
                        placeholder="Informe o CEP do passageiro" 
                    />
                    <ColumnDiv>
                        <div style={{width: '70%'}}>
                            <Input 
                                name="address" 
                                label="Endere??o" 
                                placeholder="Endere??o do passageiro" 
                            />
                        </div>
                        <div style={{width: '25%'}}>
                            <Input 
                                name="number" 
                                label="N??mero" 
                                placeholder="N??mero" 
                            />
                        </div>
                    </ColumnDiv>
                    <Input 
                        name="neighbourhood" 
                        label="Bairro" 
                         placeholder="Bairro do passageiro" 
                    />
                    <ColumnDiv>
                        <div style={{width: '55%'}}>
                            <Input 
                                name="city" 
                                label="Cidade" 
                                placeholder="Informe a cidade" 
                            />
                        </div>
                        <div style={{width: '40%'}}>
                            <Select 
                                name="uf"
                                options={UFOptions}
                                defaultOption="SP"
                                label="UF"
                            />
                        </div>
                    </ColumnDiv>
                    
                    <Input 
                        name="complement" 
                        label="Complemento" 
                        placeholder="Informe o complemento" 
                    />
                    <Input 
                        name="phone" 
                        label="N??mero de telefone" 
                        placeholder="Informe o n??mero de telefone do passageiro" 
                    />
                    <Input 
                        name="cell_phone" 
                        label="N??mero de celular" 
                        placeholder="Informe o n??mero de celular do passageiro" 
                    />

                    <Input 
                        name="observation" 
                        label="Observa????o" 
                        placeholder="Observa????es sobre o passageiro" 
                    />
                    

                    <Button type="submit">Salvar</Button>
                </Form>
            </FormContainer>
        </MainDiv>
    );
}

export default CreatePassenger;