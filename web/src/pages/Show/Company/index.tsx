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
    // Input,
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

const CreatePassenger = () => {
    const history = useHistory();

    const [company, setCompany] = useState<ICompany[]>([]);

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
                setCompany(company);
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

    // const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     this.setState({value: e.target.value});
    // }

    return(
        <MainDiv>
            <Container>
                <Title>
                    Detalhes da empresa:
                </Title>
            </Container>
            <FormContainer>
                <Form ref={formRef} onSubmit={handleSubmit} >
                    {
                        company?.map( company => (
                            <div>
                                <Input 
                                    name="name" 
                                    label="Nome" 
                                    value={company?.name}
                                    // onChange={event => handleValueChange(event)}
                                />
                                <Input 
                                    name="address" 
                                    label="Endereço" 
                                    value={company?.address} 
                                />
                                <Input 
                                    name="neighbourhood" 
                                    label="Bairro" 
                                    value={company?.neighbourhood}
                                />
                                <ColumnDiv>
                                    <div style={{width: '30%'}}>
                                        <Input 
                                            name="cep" 
                                            label="CEP" 
                                            value={company?.cep}
                                        />
                                    </div>
                                    <div style={{width: '30%'}}>
                                        <Input 
                                            name="city" 
                                            label="Cidade" 
                                            value={company?.city}
                                        />
                                    </div>
                                    <div style={{width: '30%'}}>
                                        <Select 
                                            name="uf"
                                            options={UFOptions}
                                            defaultOption={company?.uf}
                                            label="UF"
                                        />
                                    </div>
                                </ColumnDiv>
                                <Input 
                                    name="statual_inscription" 
                                    label="Inscrição estadual" 
                                    value={company?.statual_inscription}
                                />
                                <ColumnDiv>
                                    <div style={{width: '45%'}}>
                                        <Input 
                                            name="cnpj" 
                                            label="CNPJ" 
                                            value={company?.cnpj}
                                        />
                                    </div>
                                    <div style={{width: '45%'}}>
                                        <Input 
                                            name="phone" 
                                            label="Telefone" 
                                            value={company?.phone}
                                        />
                                    </div>
                                </ColumnDiv>
                            </div>
                        ))
                    }
                    <Button type="submit">Salvar</Button>
                </Form>
            </FormContainer>
        </MainDiv>
    );
}

export default CreatePassenger;