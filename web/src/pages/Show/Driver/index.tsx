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
import Button from '../../../components/Button';

import {
    Form,
    MainDiv,
    Container,
    FormContainer,
    Title,
    // Input,
} from './styles';


interface IShowDriver {
    name: string;
    cpf: string;
    cnh: string;
    cel_phone: string;
};

const ShowDriver = () => {
    const history = useHistory();

    const driver_id = localStorage.getItem('driver_id');

    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [cnh, setCnh] = useState("");
    const [celPhone, setCelPhone] = useState("");

    const formRef = useRef<FormHandles>(null);

    useEffect(() => {
        async function loadPassenger(): Promise<void> {
            await api.get(`/drivers/${driver_id}`).then(response =>{
                    setName(response.data.name);
                    setCpf(response.data.cpf);
                    setCnh(response.data.cnh);
                    setCelPhone(response.data.cel_phone);
                });
        }
        loadPassenger();
    }, [driver_id]);

    const handleSubmit = useCallback(
        async (data: IShowDriver) => {
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

                await api.post(`/edit/driver/${driver_id}`, data); 

                alert('Motorista editado com sucesso!');
                history.push('/list/drivers');
            } catch (err) {
                alert('Houve um erro ao editar motorista. Verifique se todos os campos foram preenchidos corretamente.');
            }
        }, 
        [
            history,
            driver_id
        ]
    );

    return(
        <MainDiv>
            <Container>
                <Title>
                    Editar motorista:
                </Title>

                
            </Container>
            <FormContainer>
                <Form ref={formRef} onSubmit={handleSubmit} >
                    <Input 
                        name="name" 
                        label="Nome" 
                        value={name}
                        onChange={event => setName(event.target.value)}
                    />
                    <Input 
                        name="cpf" 
                        label="CPF" 
                        value={cpf}
                        onChange={event => setCpf(event.target.value)}
                    />
                    <Input 
                        name="cnh" 
                        label="CNH" 
                        value={cnh}
                        onChange={event => setCnh(event.target.value)}
                    />
                    <Input 
                        name="cel_phone" 
                        label="Número de celular" 
                        value={celPhone}
                        onChange={event => setCelPhone(event.target.value)}
                    />

                    <Button type="submit">Salvar</Button>
                </Form>
            </FormContainer>
        </MainDiv>
    );
}

export default ShowDriver;