import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// import { useAuth } from '../../hooks/auth';

// import profileImage from '../../assets/logo-store.png';

import {
  Container,
  Content,
  Title,
  Text,
  StyledLink,
  StyledAccordion,
  Options,
  MinorLink,
  // Logo,
  MyFiHome,
  MyFiClock,
  MyFiLogout,
} from './styles';
// import Header from '../Header';

interface ToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  toggle: boolean;
}

const SimpleAccordion: React.FC<ToggleProps> = ({toggle}) => {
  // const { user } = useAuth();

  return (
    <Container>
      <Content toggle={toggle}>
        {/* <Logo>
          <Header />
          <img className="Logo" src={user.store.avatar || profileImage} alt={user.store.name} />
          <h1>
            <strong>{user.store.name}</strong>
          </h1>
        </Logo> */}
        <StyledLink to="/">
          <MyFiHome />
          Início
        </StyledLink>

        <StyledLink to="/create/travel">
          <MyFiClock />
          Agendar viagem
        </StyledLink>

        <StyledAccordion square>
          <Options
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Title>Cadastros</Title>
          </Options>
          <MinorLink to="/create/passenger">
            <Text>Cadastrar passageiro</Text>
          </MinorLink>
          <MinorLink to="/create/driver">
            <Text>Cadastrar motorista</Text>
          </MinorLink>
          <MinorLink to="/create/vehicle">
            <Text>Cadastrar veículo</Text>
          </MinorLink>
          <MinorLink to="/create/destination">
            <Text>Cadastrar destino</Text>
          </MinorLink>
        </StyledAccordion>

        <StyledAccordion square>
          <Options
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Title>Listar</Title>
          </Options>
          <MinorLink to="">
            <Text>Listar passageiros</Text>
          </MinorLink>
          <MinorLink to="">
            <Text>Listar motoristas</Text>
          </MinorLink>
          <MinorLink to="">
            <Text>Listar veículos</Text>
          </MinorLink>
          <MinorLink to="">
            <Text>Listar viagens</Text>
          </MinorLink>
          <MinorLink to="">
            <Text>Listar empresa</Text>
          </MinorLink>
        </StyledAccordion>

        <StyledLink to="/">
          <MyFiLogout />
          Sair
        </StyledLink>

      </Content>
    </Container>
  );
};

export default SimpleAccordion;
