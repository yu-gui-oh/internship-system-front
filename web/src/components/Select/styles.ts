import styled, { css, keyframes } from 'styled-components';
// import Tooltip from '../Tooltip';

interface SelectProps {
  isChecked: boolean;
}

const appear = keyframes`
  from {
    transform: translateY(-18px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 100%;
  }
`;

export const SelectContainer = styled.div<SelectProps>`
  label.label {
    margin: 1rem 0;
    font-size: 1rem;
    color: #3a3a3a;
  }
  details {
    position: relative;
    width: 100%;
    margin-right: 1rem;
  }
  details[open] {
    z-index: 1000;
  }
  summary {
    padding: 1rem 1.5rem;
    cursor: pointer;
    border-radius: 2rem;
    background: #f0f0f5;
    border: 2px solid #f0f0f5;
    list-style: none;
    color: #3a3a3a;
    ${props =>
      props.isChecked &&
      css`
        color: #35567d;
      `};
  }
  summary::marker {
    display: none;
  }
  details[open] summary:before {
    content: '';
    display: block;
    background: transparent;
    position: fixed;
    top: 0;
    left: 0;
  }
  summary:after {
    content: '';
    display: inline;
    float: right;
    width: 0.5rem;
    height: 0.5rem;
    border-bottom: 1px solid currentColor;
    border-left: 1px solid currentColor;
    border-bottom-left-radius: 2px;
    transform: rotate(45deg) translate(50%, 0%);
    transform-origin: center center;
    transition: transform ease-in-out 100ms;
  }
  summary:focus {
    outline: none;
  }
  details[open] summary:after {
    transform: rotate(-45deg) translate(0%, 0%);
  }
  div.scroll {
    width: 100%;
    position: absolute;
    background: #f0f0f5;
    border-radius: 2rem;
    max-height: 300px;
    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    display: flex;
    align-items: center;
    top: calc(100% + 0.5rem);
    animation: ${appear} 0.2s;
  }
  ul {
    width: 96%;
    background: #f0f0f5;
    left: 0;
    padding: 1rem;
    margin: 0 auto;
    box-sizing: border-box;
    max-height: 300px;
    overflow-y: scroll;
    overflow-x: hidden;
    border-radius: 2rem;
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
      background: #fff;
    }
  }
  li {
    margin: 0;
    padding: 1rem 0;
    border-bottom: 1px solid #ccc;
    color: #3a3a3a;
    transition: all 0.2s;
  }
  li:hover {
    padding-left: 0.5rem;
    font-weight: 700;
    color: #35567d;
  }
  li:first-child {
    padding-top: 0;
  }
  li:last-child {
    padding-bottom: 0;
    border-bottom: none;
  }
  summary.radios {
    counter-reset: radios;
  }
  input[type='radio'] {
    counter-increment: radios;
    appearance: none;
    display: none;
    cursor: pointer;
    color: #3a3a3a;
  }
  input[type='radio']:checked {
    display: inline;
    font-weight: 700;
    color: #35567d;
  }
  input[type='radio']:after {
    content: attr(title);
    display: inline;
    font-size: 1rem;
  }
  ul.list {
    counter-reset: labels;
    list-style: none;
  }
  label {
    width: 100%;
    display: block;
    cursor: pointer;
  }
`;

export const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

// export const Error = styled(Tooltip)`
//   margin-top: 1rem;
//   margin-left: 0.25rem;
//   svg {
//     margin: 0;
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