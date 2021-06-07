import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import { FiHome, FiClock, FiLogOut } from 'react-icons/fi';

interface IContentProps {
  toggle: boolean;
}

export const Content = styled.div<IContentProps>`
  position: fixed;
  background-color: #5b9aa0;
  height: 100vh;
  width: 18vw;
  left: ${props => props.toggle ? '0vw' : '-18vw'};
  overflow-y: scroll;
  overflow-x: hidden;

  transition: all 0.2s;

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    -webkit-border-radius: 10px;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    -webkit-border-radius: 10px;
    border-radius: 10px;
    background: #35567d;
  }

  @media (max-width: 1024px) {
    z-index: 99;
    width: 70vw;
    left: ${props => props.toggle ? '0vw' : '-70vw'};
  }
`;

export const Container = styled.div`
  @media print {
    display: none;
  }
`;

export const Logo = styled.div`
  text-align: center;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img.Logo {
    width: 7rem;
    height: 7rem;
    border-radius: 3.5rem;
    margin-bottom: 1rem;
  }

  h1 {
    color: #ffd;
    font-weight: 200;
    font-size: 1.75rem;

    strong {
      word-break: break-all;
      color: #ffd;
      font-weight: 700;
    }
  }
`;

export const Title = styled.h1`
  font-size: 1rem;
  color: #ffd;
`;

export const Text = styled.h3`
  font-size: 16px;
  transition: all 0.2s;

  &:hover {
    color: #fff;
    margin-left: 0.3rem;
  }
`;

export const ProfileContainer = styled.div`
  height: 200px;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Options = styled(AccordionSummary)`
  border: none;
`;

export const StyledAccordion = styled(Accordion)`
  box-shadow: none;

  > div {
    background: #5b9aa0;
  }
`;

export const StyledLink = styled(Link)`
  font-size: 1.25rem;
  text-decoration: none;

  width: 100%;
  height: 50px;

  display: flex;
  justify-content: left;
  align-items: center;

  padding-left: 15px;

  color: #ffd;

  svg {
    margin-right: 0.5rem;
  }
`;

export const MinorLink = styled(Link)`
  font-size: 24px;
  text-decoration: none;

  background-color: #35567d;
  width: 100%;
  height: 40px;

  display: flex;
  justify-content: left;
  align-items: center;

  padding-left: 15px;

  color: #ffd;
`;

export const MyFiHome = styled(FiHome)`
  color: #fff;
`;

export const MyFiClock = styled(FiClock)`
  color: #fff;
`;

export const MyFiLogout = styled(FiLogOut)`
  color: #fff;
`;
