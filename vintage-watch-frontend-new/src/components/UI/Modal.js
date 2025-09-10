import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed; inset: 0; background: rgba(2,6,23,.5);
  display: flex; align-items: center; justify-content: center; padding: 24px; z-index: 1000;
`;

const Panel = styled.div`
  background: white; border-radius: 16px; width: 100%; max-width: 640px; overflow: hidden;
  box-shadow: 0 20px 50px rgba(0,0,0,.2);
`;

const Header = styled.div`
  padding: 16px 20px; border-bottom: 1px solid #e2e8f0; font-weight: 700; color: #0f172a;
`;

const Body = styled.div`
  padding: 20px;
`;

const Modal = ({ open, title, onClose, children }) => {
    if (!open) return null;
    return (
        <Overlay onClick={onClose}>
            <Panel onClick={(e) => e.stopPropagation()}>
                {title && <Header>{title}</Header>}
                <Body>{children}</Body>
            </Panel>
        </Overlay>
    );
};

export default Modal;
