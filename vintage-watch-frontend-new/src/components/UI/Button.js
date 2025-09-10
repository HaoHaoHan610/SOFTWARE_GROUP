import React from 'react';
import styled, { css } from 'styled-components';

const SIZES = {
    sm: '10px 14px',
    md: '12px 18px',
    lg: '14px 22px'
};

const VARIANTS = {
    primary: css`
    background: linear-gradient(135deg, #4f46e5 0%, #2563eb 100%);
    color: white;
  `,
    secondary: css`
    background: #0f172a;
    color: #e2e8f0;
  `,
    outline: css`
    background: transparent;
    color: #1e293b;
    border: 2px solid #1e293b;
  `,
    danger: css`
    background: #ef4444;
    color: white;
  `,
    success: css`
    background: #22c55e;
    color: white;
  `
};

const BaseButton = styled.button`
  border: none;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  transition: transform .15s ease, box-shadow .15s ease, opacity .2s;
  box-shadow: 0 8px 20px rgba(0,0,0,.08);
  ${(p) => VARIANTS[p.variant || 'primary']};
  padding: ${(p) => SIZES[p.size || 'md']};
  width: ${(p) => (p.block ? '100%' : 'auto')};

  &:hover { transform: translateY(-1px); }
  &:active { transform: translateY(0); }
  &:disabled { opacity: .6; cursor: not-allowed; }
`;

const Button = ({ children, variant = 'primary', size = 'md', block = false, ...rest }) => {
    return (
        <BaseButton variant={variant} size={size} block={block} {...rest}>
            {children}
        </BaseButton>
    );
};

export default Button;
