import styled, { css } from 'styled-components';

// import Tooltip from '../Tooltip';

interface IContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<IContainerProps>`
  position: relative;
  background: #f0f0f5;
  border-radius: 2rem;
  padding: 1rem 1.5rem;
  width: 100%;
  border: 2px solid #f0f0f5;
  color: #3a3a3a;
  display: flex;
  align-items: center;
  transition: border-color 0.2s, color 0.2s;
  & + div {
    margin-top: 1rem;
  }
  ${props =>
    props.isErrored &&
    css`
      border-color: #ff3a3a;
    `};
  ${props =>
    props.isFocused &&
    css`
      color: #000;
      border-color: #000;
    `};
  ${props =>
    props.isFilled &&
    css`
      color: #000;
    `};
  input {
    flex: 1;
    border: 0;
    background: transparent;
    color: #3a3a3a;
    outline: none;
  }
  svg {
    margin-right: 1rem;
  }
`;

// export const Error = styled(Tooltip)`
//   position: absolute;
//   height: 1.25rem;
//   margin-left: 1rem;
//   right: 1rem;
//   svg {
//     margin: 0;
//     color: ${props => props.theme.palette.primary.toneDanger1};
//   }
//   span {
//     background: ${props => props.theme.palette.primary.toneDanger2};
//     color: ${props => props.theme.palette.primary.toneText1};
//     &::before {
//       border-color: ${props => props.theme.palette.primary.toneDanger2}
//         transparent;
//     }
//   }
// `;

export const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin: 1rem 0;
  font-size: 1rem;
  color: #3a3a3a;
`;