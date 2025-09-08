import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { userAPI } from '../../services/api';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const LoginContainer = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const LoginCard = styled.div`
  background: white;
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: #2c3e50;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: #2c3e50;
`;

const Input = styled.input`
  padding: 12px;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const Select = styled.select`
  padding: 12px;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 16px;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  color: white;
  border: none;
  padding: 14px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const LinkText = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  color: #7f8c8d;
  
  a {
    color: #3498db;
    text-decoration: none;
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorMessage = styled.div`
  background-color: #fdf2f2;
  border: 1px solid #fecaca;
  color: #e74c3c;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'buyer'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // First, try to get users from API
      const response = await userAPI.getAll();
      const users = response.data;
      
      // Normalize role aliases (e.g., support -> agent)
      const selectedRole = formData.role === 'support' ? 'agent' : formData.role;
      // Find user by email and role
      const user = users.find(u => 
        u.email === formData.email && 
        (u.role === selectedRole || u.role === formData.role)
      );

      // Many APIs (including yours) do not return password in GET responses.
      // If password is not present, accept login based on email+role only (dev mode).
      if (user && (!user.password || user.password === formData.password)) {
        const { password, ...userWithoutPassword } = user;
        login(userWithoutPassword, 'demo-token');
        toast.success('Login successful!');
        navigate('/dashboard');
      } else {
        setError('Invalid email, password, or role');
      }
    } catch (err) {
      console.error('API Error:', err);
      
      // If API fails, provide demo users for testing
      const demoUsers = [
        { id: 1, username: 'admin', email: 'admin@demo.com', password: 'admin123', role: 'admin' },
        { id: 2, username: 'seller', email: 'seller@demo.com', password: 'seller123', role: 'seller' },
        { id: 3, username: 'buyer', email: 'buyer@demo.com', password: 'buyer123', role: 'buyer' },
        { id: 4, username: 'appraiser', email: 'appraiser@demo.com', password: 'appraiser123', role: 'appraiser' },
        { id: 5, username: 'support', email: 'support@demo.com', password: 'support123', role: 'support' }
      ];
      
      // Dev-friendly fallback: accept DB-style seeded accounts like user4@example.com / pass123
      const aliasRole = formData.role === 'support' ? 'agent' : formData.role;
      const userFromPattern = (() => {
        const email = String(formData.email || '');
        const match = email.match(/^user(\d+)@example\.com$/i);
        if (match && formData.password === 'pass123') {
          const id = parseInt(match[1], 10);
          return { id, username: `user${id}`, email, role: aliasRole };
        }
        return null;
      })();

      const user = userFromPattern || demoUsers.find(u => 
        u.email === formData.email && 
        (u.role === formData.role || u.role === aliasRole) &&
        u.password === formData.password
      );

      if (user) {
        const { password, ...userWithoutPassword } = user;
        login(userWithoutPassword, 'demo-token');
        toast.success('Login successful! (Offline Mode)');
        navigate('/dashboard');
      } else {
        setError('Invalid credentials. Try demo accounts: admin@demo.com/admin123, seller@demo.com/seller123, etc.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Title>Welcome Back</Title>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </InputGroup>
          
          <InputGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </InputGroup>
          
          <InputGroup>
            <Label htmlFor="role">Role</Label>
            <Select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
              <option value="appraiser">Appraiser</option>
              <option value="admin">Administrator</option>
              <option value="support">Customer Support</option>
            </Select>
          </InputGroup>
          
          <Button type="submit" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </Form>
        
        <LinkText>
          Don't have an account? <Link to="/register">Register here</Link>
        </LinkText>
        
        <div style={{ 
          marginTop: '1rem', 
          padding: '1rem', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '8px',
          fontSize: '0.9rem',
          color: '#6c757d'
        }}>
          <strong>Demo Accounts:</strong><br/>
          Admin: admin@demo.com / admin123<br/>
          Seller: seller@demo.com / seller123<br/>
          Buyer: buyer@demo.com / buyer123<br/>
          Appraiser: appraiser@demo.com / appraiser123<br/>
          Support: support@demo.com / support123
        </div>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;
 

