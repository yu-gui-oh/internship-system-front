import styled from  'styled-components';

import ReactLoading from 'react-loading';

export const Container = styled.div`
    height: 100%;
    width: 100%;

    display: flex;  
    flex-direction: column;

    justify-content: initial;
    align-items: center;

    padding: 1rem;
`;

export const Loading = styled(ReactLoading)`
    margin-top: 2rem;
    margin-bottom: 1rem;
`;