import styled from 'styled-components';
// import { shade } from 'polished';

export const Container = styled.button`
  width: 100%;
  background: #35567d;
  min-height: 3.25rem;
  border-radius: 2rem;
  border: 0;
  padding: 0 1rem;
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
  margin-top: 1rem;
  color: #fff;
  font-weight: 500;
  transition: background-color 0.2s;
  &:hover {
    cursor: pointer;
    background: #555f8f;
  }
`;