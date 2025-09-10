import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styled from 'styled-components';
import Loading from './Common/Loading';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  text-align: center;
`;

const ErrorTitle = styled.h1`
  color: #e74c3c;
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.p`
  color: #7f8c8d;
  margin-bottom: 2rem;
  max-width: 500px;
`;

const LoginButton = styled.button`
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const ProtectedRoute = ({ children, requiredRoles = [] }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <ErrorContainer>
        <ErrorTitle>🔒 Từ chối truy cập</ErrorTitle>
        <ErrorMessage>
          Bạn cần đăng nhập để truy cập trang này. Vui lòng đăng nhập bằng tài khoản của bạn.
        </ErrorMessage>
        <LoginButton onClick={() => window.location.href = '/login'}>
          Đi tới trang Đăng nhập
        </LoginButton>
      </ErrorContainer>
    );
  }

  if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
    return (
      <ErrorContainer>
        <ErrorTitle>🚫 Không đủ quyền</ErrorTitle>
        <ErrorMessage>
          Bạn không có quyền truy cập trang này.
          Vai trò yêu cầu: {requiredRoles.join(' hoặc ')}.
          Vai trò của bạn: {user.role}
        </ErrorMessage>
        <LoginButton onClick={() => window.location.href = '/dashboard'}>
          Về trang Dashboard
        </LoginButton>
      </ErrorContainer>
    );
  }

  return children;
};

export default ProtectedRoute;
