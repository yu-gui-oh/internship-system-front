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
import Loading from '../../../components/Loading';

import {
    Form,
    MainDiv,
    Container,
    FormContainer,
    Title,
    ColumnDiv,
} from './styles';

interface ICreatePassenger {
    id: string;
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

const ShowPassenger = () => {
    const history = useHistory();

    const passenger_id = localStorage.getItem('passenger_id');

    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [rg, setRg] = useState("");
    const [issuingBody, setIssuingBody] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [number, setNumber] = useState("");
    const [complement, setComplement] = useState("");
    const [cellPhone, setCellPhone] = useState("");
    const [observation, setObservation] = useState("");
    const [address, setAddress] = useState("");
    const [neighbourhood, setNeighbourhood] = useState("");
    const [cep, setCep] = useState("");
    const [city, setCity] = useState("");
    const [uf, setUf] = useState("");
    const [phone, setPhone] = useState("");

    const [loaded, setLoaded] = useState(false);

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

    useEffect(() => {
        setLoaded(false);
        async function loadPassenger(): Promise<void> {
            await api.get(`/passengers/${passenger_id}`).then(response =>{
                    setName(response.data.name);
                    setAddress(response.data.address);
                    setRg(response.data.rg);
                    setIssuingBody(response.data.issuing_body);
                    setCpf(response.data.cpf);
                    setBirthDate(response.data.birth_date);
                    setNeighbourhood(response.data.neighbourhood);
                    setNumber(response.data.number);
                    setComplement(response.data.complement);
                    setCep(response.data.cep);
                    setCity(response.data.city);
                    setUf(response.data.uf);
                    setPhone(response.data.phone);
                    setCellPhone(response.data.cell_phone);
                    setObservation(response.data.observation);
                });
        }
        loadPassenger();
        setTimeout(
            () => 
            setLoaded(true),
            1500
        );
    }, [passenger_id]);

    const handleSubmit = useCallback(
        async (data: ICreatePassenger) => {
            try {
                formRef.current!.setErrors({});

                const schema = Yup.object().shape({
                    name: Yup.string().required('Informe o nome do passageiro'),
                    cpf: Yup.string().required('Informe o CPF do passageiro'),
                    rg: Yup.string().required('Informe o RG do passageiro'),
                    issuing_body: Yup.string().required('Informe o órgão emissor do documento'),
                    birth_date: Yup.date().required('Informe a data de nascimento do passageiro'),
                    cep: Yup.string().required('Informe o CEP do passageiro'),
                    address: Yup.string().required('Informe o endereço do passageiro'),
                    number: Yup.string().required('Informe o número'),
                    neighbourhood: Yup.string().required('Informe o bairro do passageiro'),
                    city: Yup.string().required('Informe a cidade'),
                    uf: Yup.string().required('Informe a UF'),
                    complement: Yup.string(),
                    phone: Yup.string(),
                    cell_phone: Yup.string().required('Informe o número de celular do passageiro'),
                    observation: Yup.string(),
                    status: Yup.boolean(),
                });

                data.status = true;

                await schema.validate(data, {
                    abortEarly: false,
                });

                await api.post(`/edit/passenger/${passenger_id}`, data);

                alert('Passageiro editado com sucesso!');
                history.push('/list/passengers');
            } catch (err) {
                alert('Houve um erro ao editar passageiro. Verifique se todos os campos foram preenchidos corretamente.');
            }
        }, 
        [
            history,
            passenger_id, 
        ]
    );

    return(
        <MainDiv>
            <Container>
                <Title>
                    Editar passageiro:
                </Title>
            </Container>
            <FormContainer>
            {
                loaded === false ?
                    <Loading />
                :
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
                            name="rg" 
                            label="RG" 
                            value={rg}
                            onChange={event => setRg(event.target.value)}
                        />
                        <Input 
                            name="issuing_body" 
                            label="Órgão emissor" 
                            value={issuingBody}
                            onChange={event => setIssuingBody(event.target.value)}
                        />
                        <Input 
                            name="birth_date" 
                            label="Data de nascimento" 
                            type="date"
                            value={String(birthDate) || ''}
                            onChange={event => setBirthDate(event.target.value)}
                        />
                        <Input 
                            name="cep" 
                            label="CEP" 
                            value={cep}
                            onChange={event => setCep(event.target.value)}
                        />
                        <ColumnDiv>
                            <div style={{width: '70%'}}>
                                <Input 
                                    name="address" 
                                    label="Endereço" 
                                    value={address}
                                    onChange={event => setAddress(event.target.value)}
                                />
                            </div>
                            <div style={{width: '25%'}}>
                                <Input 
                                    name="number" 
                                    label="Número" 
                                    value={number}
                                    onChange={event => setNumber(event.target.value)}
                                />
                            </div>
                        </ColumnDiv>
                        <Input 
                            name="neighbourhood" 
                            label="Bairro" 
                            value={neighbourhood}
                            onChange={event => setNeighbourhood(event.target.value)}
                        />
                        <ColumnDiv>
                            <div style={{width: '55%'}}>
                                <Input 
                                    name="city" 
                                    label="Cidade" 
                                    value={city}
                                    onChange={event => setCity(event.target.value)}
                                />
                            </div>
                            <div style={{width: '40%'}}>
                                <Select 
                                    name="uf"
                                    options={UFOptions}
                                    defaultOption={uf}
                                    label="UF"
                                />
                            </div>
                        </ColumnDiv>
                        
                        <Input 
                            name="complement" 
                            label="Complemento" 
                            value={complement}
                            onChange={event => setComplement(event.target.value)}
                        />
                        <Input 
                            name="phone" 
                            label="Número de telefone" 
                            value={phone}
                            onChange={event => setPhone(event.target.value)}
                        />
                        <Input 
                            name="cell_phone" 
                            label="Número de celular" 
                            value={cellPhone}
                            onChange={event => setCellPhone(event.target.value)}
                        />

                        <Input 
                            name="observation" 
                            label="Observação" 
                            value={observation}
                            onChange={event => setObservation(event.target.value)}
                        />
                        <Button type="submit">Salvar</Button>
                    </Form>
            }
            </FormContainer>
        </MainDiv>
    );
}

export default ShowPassenger;