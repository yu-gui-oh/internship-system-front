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

interface ICompany {
    id: string;
    name: string;
    address: string;
    neighbourhood: string;
    cep: string;
    city: string;
    uf: string;
    statual_inscription: string;
    cnpj: string;
    phone: string;
}

const ShowCompany = () => {
    const history = useHistory();

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [neighbourhood, setNeighbourhood] = useState("");
    const [cep, setCep] = useState("");
    const [city, setCity] = useState("");
    const [uf, setUf] = useState("");
    const [statualInscription, setStatualInscription] = useState("");
    const [cnpj, setCnpj] = useState("");
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
        async function loadCompany(): Promise<void> {
            await api.get('/company/details').then(response =>{
                const company = response.data.map( (company: ICompany) => ({
                    id: company.id,
                    name: company.name,
                    address: company.address,
                    neighbourhood: company.neighbourhood,
                    cep: company.cep,
                    city: company.city,
                    uf: company.uf,
                    statual_inscription: company.statual_inscription,
                    cnpj: company.cnpj,
                    phone: company.phone,
                }));

                company.forEach((company: ICompany) => {
                    setName(company.name);
                    setAddress(company.address);
                    setNeighbourhood(company.neighbourhood);
                    setCep(company.cep);
                    setCity(company.city);
                    setUf(company.uf);
                    setStatualInscription(company.statual_inscription);
                    setCnpj(company.cnpj);
                    setPhone(company.phone);
                });
                setTimeout(
                    () => 
                    setLoaded(true),
                    1500
                );
            });
        }
        loadCompany();
    }, []);

    const handleSubmit = useCallback(
        async (data: ICompany) => {
            try {
                formRef.current!.setErrors({});

                const schema = Yup.object().shape({
                    name: Yup.string().required('Informe o nome da empresa'),
                    address: Yup.string().required('Informe o endereço da empresa'),
                    neighbourhood: Yup.string().required('Informe o bairro da empresa'),
                    cep: Yup.string().required('Informe o CEP da empresa'),
                    city: Yup.string().required('Informe a cidade'),
                    uf: Yup.string().required('Informe a UF'),
                    statual_inscription: Yup.string().required('Informe a inscrição estadual da empresa'),
                    cnpj: Yup.string().required('Informe o CNPJ da empresa'),
                    phone: Yup.string().required('Informe o número de telefone'),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                await api.post('/edit/company', data);

                alert('Empresa editada com sucesso!');
                history.push('/');
            } catch (err) {
                alert('Houve um erro ao editar empresa. Verifique se todos os campos foram preenchidos corretamente.');
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
                    Detalhes da empresa:
                </Title>
            </Container>
            <FormContainer>
            {
                loaded === false ?
                    <Loading />
                :
                    <Form ref={formRef} onSubmit={handleSubmit} >
                            <div>
                                <Input 
                                    name="name" 
                                    label="Nome" 
                                    value={name}
                                    onChange={event => setName(event.target.value)}
                                />
                                <Input 
                                    name="address" 
                                    label="Endereço" 
                                    value={address}
                                    onChange={event => setAddress(event.target.value)}
                                />
                                <Input 
                                    name="neighbourhood" 
                                    label="Bairro" 
                                    value={neighbourhood}
                                    onChange={event => setNeighbourhood(event.target.value)}
                                />
                                <ColumnDiv>
                                    <div style={{width: '30%'}}>
                                        <Input 
                                            name="cep" 
                                            label="CEP" 
                                            value={cep}
                                            onChange={event => setCep(event.target.value)}
                                        />
                                    </div>
                                    <div style={{width: '30%'}}>
                                        <Input 
                                            name="city" 
                                            label="Cidade" 
                                            value={city}
                                            onChange={event => setCity(event.target.value)}
                                        />
                                    </div>
                                    <div style={{width: '30%'}}>
                                        <Select 
                                            name="uf"
                                            options={UFOptions}
                                            defaultOption={uf}
                                            label="UF"
                                        />
                                    </div>
                                </ColumnDiv>
                                <Input 
                                    name="statual_inscription" 
                                    label="Inscrição estadual" 
                                    value={statualInscription}
                                    onChange={event => setStatualInscription(event.target.value)}
                                />
                                <ColumnDiv>
                                    <div style={{width: '45%'}}>
                                        <Input 
                                            name="cnpj" 
                                            label="CNPJ" 
                                            value={cnpj}
                                            onChange={event => setCnpj(event.target.value)}
                                        />
                                    </div>
                                    <div style={{width: '45%'}}>
                                        <Input 
                                            name="phone" 
                                            label="Telefone" 
                                            value={phone}
                                            onChange={event => setPhone(event.target.value)}
                                        />
                                    </div>
                                </ColumnDiv>
                            </div>
                    <Button type="submit">Salvar</Button>
                </Form>
            }
            </FormContainer>
        </MainDiv>
    );
}

export default ShowCompany;