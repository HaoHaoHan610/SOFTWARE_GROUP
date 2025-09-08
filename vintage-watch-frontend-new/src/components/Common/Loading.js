import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
`;

const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid rgba(0,0,0,0.1);
  border-top-color: #3498db;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const Loading = () => {
  return (
    <Container>
      <Spinner />
    </Container>
  );
};

export default Loading;




