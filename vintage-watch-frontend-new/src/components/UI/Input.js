import React from 'react';
import styled from 'styled-components';

const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-weight: 600;
  color: #0f172a;
`;

const Base = styled.input`
  padding: 12px 14px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 16px;
  transition: border-color .2s;
  &:focus { outline: none; border-color: #6366f1; }
`;

const Help = styled.div`
  color: #64748b;
  font-size: 12px;
`;

export const Input = ({ label, help, ...rest }) => (
    <Group>
        {label && <Label>{label}</Label>}
        <Base {...rest} />
        {help && <Help>{help}</Help>}
    </Group>
);

const SelectBase = styled.select`
  padding: 12px 14px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 16px;
  transition: border-color .2s;
  background: white;
  &:focus { outline: none; border-color: #6366f1; }
`;

export const Select = ({ label, help, children, ...rest }) => (
    <Group>
        {label && <Label>{label}</Label>}
        <SelectBase {...rest}>{children}</SelectBase>
        {help && <Help>{help}</Help>}
    </Group>
);
