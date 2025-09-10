import React from 'react';
import styled from 'styled-components';

const Pill = styled.span`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 999px;
  font-weight: 700;
  font-size: 12px;
  color: white;
  background: ${(p) => p.color || '#6366f1'};
`;

const Badge = ({ children, color }) => <Pill color={color}>{children}</Pill>;

export default Badge;
