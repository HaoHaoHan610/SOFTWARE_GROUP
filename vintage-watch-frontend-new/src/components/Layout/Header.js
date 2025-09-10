import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Logo = styled(Link)`
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const UserMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserInfo = styled.span`
  font-weight: 500;
`;

const LogoutBtn = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #c0392b;
  }
`;

const RoleBadge = styled.span`
  background-color: #3498db;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
`;

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getRoleColor = (role) => {
    const colors = {
      'seller': '#27ae60',
      'buyer': '#3498db',
      'appraiser': '#f39c12',
      'admin': '#9b59b6',
      'support': '#e67e22',
      'agent': '#e67e22'
    };
    return colors[role] || '#95a5a6';
  };

  return (
    <HeaderContainer>
      <Nav>
        <Logo to="/">
          🕰️ Vintage Watch Trading
        </Logo>
        
        <NavLinks>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/report">Report</NavLink>
          {user ? (
            <>
              <NavLink to="/dashboard">Dashboard</NavLink>
              
              {user.role === 'seller' && (
                <>
                  <NavLink to="/seller/listings">My Listings</NavLink>
                  <NavLink to="/seller/create">Add Watch</NavLink>
                </>
              )}
              
              {user.role === 'buyer' && (
                <>
                  <NavLink to="/buyer/browse">Browse Watches</NavLink>
                  <NavLink to="/orders">My Orders</NavLink>
                  <NavLink to="/cart">Cart</NavLink>
                </>
              )}
              
              {user.role === 'appraiser' && (
                <>
                  <NavLink to="/appraiser/evaluations">Evaluations</NavLink>
                  <NavLink to="/appraiser/reports">Reports</NavLink>
                </>
              )}
              
              {user.role === 'admin' && (
                <>
                  <NavLink to="/admin/users">Users</NavLink>
                  <NavLink to="/admin/transactions">Transactions</NavLink>
                </>
              )}
              
              {(user.role === 'support' || user.role === 'agent') && (
                <>
                  <NavLink to="/support/feedback">Feedback</NavLink>
                  <NavLink to="/support/dashboard">Dashboard</NavLink>
                </>
              )}
              
              <UserMenu>
                <UserInfo>
                  {user.username}
                  <RoleBadge style={{ backgroundColor: getRoleColor(user.role), marginLeft: '10px' }}>
                    {user.role}
                  </RoleBadge>
                </UserInfo>
                <LogoutBtn onClick={handleLogout}>
                  Logout
                </LogoutBtn>
              </UserMenu>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
 

