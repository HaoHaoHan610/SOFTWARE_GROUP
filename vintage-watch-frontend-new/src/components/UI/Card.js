import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(2,6,23,.08);
  overflow: hidden;
`;

const Header = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid #e2e8f0;
  font-weight: 700;
  color: #0f172a;
`;

const Body = styled.div`
  padding: 20px;
`;

const Footer = styled.div`
  padding: 14px 20px;
  border-top: 1px solid #e2e8f0;
  background: #f8fafc;
`;

const Card = ({ title, footer, children }) => (
    <Wrapper>
        {title && <Header>{title}</Header>}
        <Body>{children}</Body>
        {footer && <Footer>{footer}</Footer>}
    </Wrapper>
);

export default Card;
