import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { userAPI, transactionAPI, orderAPI } from '../../services/api';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import UserManagement from './UserManagement';
import TransactionMonitor from './TransactionMonitor';
import SystemSettings from './SystemSettings';

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Title = styled.h1`
  color: #2c3e50;
  margin: 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #9b59b6;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #7f8c8d;
  font-weight: 500;
`;

const Section = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid #e1e8ed;
`;

const Tab = styled.button`
  padding: 12px 24px;
  border: none;
  background: none;
  font-weight: 600;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  transition: all 0.3s ease;
  color: ${props => props.active ? '#9b59b6' : '#7f8c8d'};
  border-bottom-color: ${props => props.active ? '#9b59b6' : 'transparent'};
  
  &:hover {
    color: #9b59b6;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const AdminDashboard = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('users');
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTransactions: 0,
    totalOrders: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminData();
  }, []);

  // Sync tab with URL path so /admin/transactions shows the correct tab
  useEffect(() => {
    const path = location.pathname || '';
    if (path.includes('/admin/transactions')) {
      setActiveTab('transactions');
    } else if (path.includes('/admin/users')) {
      setActiveTab('users');
    } else if (path.includes('/admin/settings')) {
      setActiveTab('settings');
    } else if (path.endsWith('/admin')) {
      setActiveTab('users');
    }
  }, [location.pathname]);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const [usersResponse, transactionsResponse, ordersResponse] = await Promise.all([
        userAPI.getAll(),
        transactionAPI.getAll(),
        orderAPI.getAll()
      ]);
      
      const users = usersResponse.data || [];
      const transactions = transactionsResponse.data || [];
      const orders = ordersResponse.data || [];
      
      const totalRevenue = transactions.reduce((sum, t) => sum + (t.amount || 0), 0);
      
      setStats({
        totalUsers: users.length,
        totalTransactions: transactions.length,
        totalOrders: orders.length,
        totalRevenue
      });
    } catch (error) {
      console.error('Error fetching admin data:', error);
      toast.error('Failed to load admin dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (loading) {
    return (
      <LoadingSpinner>
        <div className="spinner"></div>
      </LoadingSpinner>
    );
  }

  return (
    <DashboardContainer>
      <Header>
        <Title>Admin Dashboard</Title>
      </Header>

      <StatsGrid>
        <StatCard>
          <StatNumber>{stats.totalUsers}</StatNumber>
          <StatLabel>Total Users</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{stats.totalTransactions}</StatNumber>
          <StatLabel>Total Transactions</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{stats.totalOrders}</StatNumber>
          <StatLabel>Total Orders</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{formatCurrency(stats.totalRevenue)}</StatNumber>
          <StatLabel>Total Revenue</StatLabel>
        </StatCard>
      </StatsGrid>

      <Section>
        <TabContainer>
          <Tab 
            active={activeTab === 'users'} 
            onClick={() => { setActiveTab('users'); navigate('/admin/users'); }}
          >
            User Management
          </Tab>
          <Tab 
            active={activeTab === 'transactions'} 
            onClick={() => { setActiveTab('transactions'); navigate('/admin/transactions'); }}
          >
            Transaction Monitor
          </Tab>
          <Tab 
            active={activeTab === 'settings'} 
            onClick={() => { setActiveTab('settings'); navigate('/admin/settings'); }}
          >
            System Settings
          </Tab>
        </TabContainer>

        {activeTab === 'users' && <UserManagement />}
        {activeTab === 'transactions' && <TransactionMonitor />}
        {activeTab === 'settings' && <SystemSettings />}
      </Section>
    </DashboardContainer>
  );
};

export default AdminDashboard;
