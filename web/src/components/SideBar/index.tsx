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
  MyFiAirplay,
  MyFiPlus,
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
          <MyFiPlus />
          Nova viagem
        </StyledLink>

        <StyledLink to="/">
          <MyFiClock />
          Agendamento
        </StyledLink>

        <StyledLink to="/list/travels/active">
          <MyFiAirplay />
          Viagens em andamento
        </StyledLink>

        <StyledAccordion square defaultExpanded>
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

        <StyledAccordion square defaultExpanded>
          <Options
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Title>Listar</Title>
          </Options>
          <MinorLink to="/list/passengers">
            <Text>Listar passageiros</Text>
          </MinorLink>
          <MinorLink to="/list/drivers">
            <Text>Listar motoristas</Text>
          </MinorLink>
          <MinorLink to="/list/vehicles">
            <Text>Listar veículos</Text>
          </MinorLink>
          <MinorLink to="/list/travels">
            <Text>Listar viagens</Text>
          </MinorLink>
          <MinorLink to="/company/details">
            <Text>Detalhes da empresa</Text>
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
