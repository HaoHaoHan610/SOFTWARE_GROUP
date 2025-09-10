import React from 'react';
import styled from 'styled-components';

const TestContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
`;

const TestTitle = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 3rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const TestInfo = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 16px;
  max-width: 600px;
  text-align: center;
`;

const TestButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0.5rem;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
`;

const TestPage = () => {
  const handleTestLogin = () => {
    window.location.href = '/login';
  };

  const handleTestAPI = () => {
    fetch('http://localhost:5000/users/all')
      .then(response => response.json())
      .then(data => {
        alert(`API Response: ${JSON.stringify(data, null, 2)}`);
      })
      .catch(error => {
        alert(`API Error: ${error.message}`);
      });
  };

  return (
    <TestContainer>
      <TestTitle>🕰️ Vintage Watch Platform</TestTitle>
      
      <TestInfo>
        <h2>Application Status Check</h2>
        <p>If you can see this page, the React app is working correctly!</p>
        
        <div style={{ marginTop: '2rem' }}>
          <TestButton onClick={handleTestLogin}>
            Go to Login Page
          </TestButton>
          
          <TestButton onClick={handleTestAPI}>
            Test API Connection
          </TestButton>
        </div>
        
        <div style={{ marginTop: '2rem', fontSize: '0.9rem', opacity: 0.8 }}>
          <p><strong>Current URL:</strong> {window.location.href}</p>
          <p><strong>User Agent:</strong> {navigator.userAgent}</p>
          <p><strong>Timestamp:</strong> {new Date().toLocaleString()}</p>
        </div>
      </TestInfo>
    </TestContainer>
  );
};

export default TestPage;
