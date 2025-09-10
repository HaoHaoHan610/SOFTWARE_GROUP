import React from 'react';
import styled from 'styled-components';

const Bar = styled.div`
  display: flex;
  gap: 10px;
  border-bottom: 2px solid #e2e8f0;
`;

const TabBtn = styled.button`
  background: none;
  border: none;
  padding: 12px 16px;
  font-weight: 700;
  color: ${(p) => (p.active ? '#1f2937' : '#64748b')};
  border-bottom: 3px solid ${(p) => (p.active ? '#6366f1' : 'transparent')};
  cursor: pointer;
`;

export const Tabs = ({ tabs, active, onChange }) => (
    <Bar>
        {tabs.map((t) => (
            <TabBtn key={t.value} active={t.value === active} onClick={() => onChange(t.value)}>
                {t.label}
            </TabBtn>
        ))}
    </Bar>
);
