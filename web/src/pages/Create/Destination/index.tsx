import React from 'react';

// import Input from '../../../components/Input';

import {
    MainDiv,
    Container,
    FormContainer,
    Title,
    Input,
} from './styles';

const CreateDestination = () => {
    return(
        <MainDiv>
            <Container>
                <Title>
                    Cadastro de destino:
                </Title>

                
            </Container>
            <FormContainer>
                <Input 
                    name="destination" 
                    // label="Informe o destino a ser cadastrado" 
                    placeholder="Informe o destino" 
                />
            </FormContainer>
        </MainDiv>
    );
}

export default CreateDestination;