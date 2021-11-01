import React from 'react';
import styled from 'styled-components';

import SideBar from '../SideBar';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Container = styled.div<IToggleProps>`
  display: grid;
  grid-template-columns: ${props => props.toggle ? '1fr 5fr' : '1fr'};

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;

  }

  div#content {
    margin-top: 0.5rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const Content = styled.div<IToggleProps>`
  width: 90%;
  height: 100%;

  @media (max-width: 1024px) {
    width: 86%;
  }
`;

const Toggle = styled.button<IToggleProps>`
  position: fixed;
  top: 1rem;
  margin-left: -2rem;
  width: 4rem;
  height: 4rem;
  border-radius: 0 50% 50% 0;
  z-index: 100;
  left: ${props => props.toggle ? '18vw' : '0'};
  background: #5b9aa0;
  border: none;
  cursor: pointer;

  transition: all 0.2s;

  svg {
    margin-left: 1rem;
    color: #fff;
  }

  @media (max-width: 1024px) {
    left: ${props => props.toggle ? '70vw' : '0vw'};
  }

  @media print {
    display: none;
  }
`;

interface IToggleProps {
  toggle: boolean;
}

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

const StandardContainer: React.FC = ({ ...components }) => {
  const [toggle, setToggle] = React.useState(true);
  const [windowDimensions, setWindowDimensions] = React.useState(getWindowDimensions());

  React.useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);

    windowDimensions.width <= 1024
    ? setToggle(false)
    : setToggle(true);

    return () => window.removeEventListener('resize', handleResize);
  }, [windowDimensions]);

  return (
    <Container toggle={toggle}>
      <SideBar toggle={toggle} />
      <Toggle onClick={() => setToggle(!toggle)} toggle={toggle}>
        { toggle
          ?
          ( <FiChevronLeft size={26} /> )
          :
          ( <FiChevronRight size={26} /> )
        }
      </Toggle>
      <div id="content">
        <Content toggle={toggle}>{components.children}</Content>
      </div>
    </Container>
  );
};

export default StandardContainer;
