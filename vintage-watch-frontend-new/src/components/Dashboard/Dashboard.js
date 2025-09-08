import React from 'react';
import { useAuth } from '../../context/AuthContext';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const WelcomeSection = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 3rem;
  border-radius: 16px;
  text-align: center;
  margin-bottom: 3rem;
`;

const WelcomeTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-family: 'Playfair Display', serif;
`;

const WelcomeSubtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
  margin-bottom: 2rem;
`;

const RoleBadge = styled.div`
  display: inline-block;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const ActionCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const ActionIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const ActionTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const ActionDescription = styled.p`
  color: #7f8c8d;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const ActionButton = styled.button`
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease;
  width: 100%;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const StatsSection = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StatsTitle = styled.h2`
  color: #2c3e50;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const StatCard = styled.div`
  text-align: center;
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-radius: 8px;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #3498db;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #7f8c8d;
  font-weight: 500;
`;

const Dashboard = () => {
  const { user } = useAuth();

  const getRoleSpecificContent = () => {
    switch (user.role) {
      case 'seller':
        return {
          title: 'Welcome to Your Seller Dashboard',
          subtitle: 'Manage your watch listings and grow your business',
          actions: [
            {
              icon: '📝',
              title: 'Create New Listing',
              description: 'Add a new vintage watch to your inventory',
              action: () => window.location.href = '/seller/create'
            },
            {
              icon: '📊',
              title: 'Manage Listings',
              description: 'View and edit your current watch listings',
              action: () => window.location.href = '/seller/listings'
            },
            {
              icon: '📈',
              title: 'View Analytics',
              description: 'Track your sales and performance metrics',
              action: () => window.location.href = '/seller/analytics'
            }
          ]
        };
      
      case 'buyer':
        return {
          title: 'Welcome to Your Buyer Dashboard',
          subtitle: 'Discover and purchase authentic vintage timepieces',
          actions: [
            {
              icon: '🔍',
              title: 'Browse Watches',
              description: 'Explore our collection of vintage watches',
              action: () => window.location.href = '/buyer/browse'
            },
            {
              icon: '📦',
              title: 'My Orders',
              description: 'Track your purchases and order history',
              action: () => window.location.href = '/buyer/orders'
            },
            {
              icon: '💬',
              title: 'Leave Feedback',
              description: 'Share your experience with our platform',
              action: () => window.location.href = '/buyer/feedback'
            }
          ]
        };
      
      case 'appraiser':
        return {
          title: 'Welcome to Your Appraiser Dashboard',
          subtitle: 'Conduct professional watch evaluations and assessments',
          actions: [
            {
              icon: '🔬',
              title: 'New Evaluations',
              description: 'Review pending watch appraisal requests',
              action: () => window.location.href = '/appraiser/evaluations'
            },
            {
              icon: '📋',
              title: 'Generate Reports',
              description: 'Create detailed appraisal reports',
              action: () => window.location.href = '/appraiser/reports'
            },
            {
              icon: '📊',
              title: 'View History',
              description: 'Access your previous appraisals',
              action: () => window.location.href = '/appraiser/history'
            }
          ]
        };
      
      case 'admin':
        return {
          title: 'Welcome to Your Admin Dashboard',
          subtitle: 'Manage users, transactions, and platform operations',
          actions: [
            {
              icon: '👥',
              title: 'User Management',
              description: 'Manage user accounts and permissions',
              action: () => window.location.href = '/admin/users'
            },
            {
              icon: '💰',
              title: 'Transaction Monitor',
              description: 'Monitor all platform transactions',
              action: () => window.location.href = '/admin/transactions'
            },
            {
              icon: '⚙️',
              title: 'System Settings',
              description: 'Configure platform settings and security',
              action: () => window.location.href = '/admin/settings'
            }
          ]
        };
      
      case 'support':
        return {
          title: 'Welcome to Your Support Dashboard',
          subtitle: 'Help customers and resolve platform issues',
          actions: [
            {
              icon: '💬',
              title: 'Customer Feedback',
              description: 'Review and respond to customer feedback',
              action: () => window.location.href = '/support/feedback'
            },
            {
              icon: '🎫',
              title: 'Support Tickets',
              description: 'Manage customer support requests',
              action: () => window.location.href = '/support/tickets'
            },
            {
              icon: '📞',
              title: 'Live Chat',
              description: 'Provide real-time customer support',
              action: () => window.location.href = '/support/chat'
            }
          ]
        };
      
      default:
        return {
          title: 'Welcome to Vintage Watch Trading',
          subtitle: 'Your trusted marketplace for authentic vintage timepieces',
          actions: []
        };
    }
  };

  const content = getRoleSpecificContent();

  return (
    <DashboardContainer>
      <WelcomeSection>
        <WelcomeTitle>{content.title}</WelcomeTitle>
        <WelcomeSubtitle>{content.subtitle}</WelcomeSubtitle>
        <RoleBadge>{user.role}</RoleBadge>
      </WelcomeSection>

      {content.actions.length > 0 && (
        <QuickActions>
          {content.actions.map((action, index) => (
            <ActionCard key={index}>
              <ActionIcon>{action.icon}</ActionIcon>
              <ActionTitle>{action.title}</ActionTitle>
              <ActionDescription>{action.description}</ActionDescription>
              <ActionButton onClick={action.action}>
                Get Started
              </ActionButton>
            </ActionCard>
          ))}
        </QuickActions>
      )}

      <StatsSection>
        <StatsTitle>Platform Overview</StatsTitle>
        <StatsGrid>
          <StatCard>
            <StatNumber>1,250+</StatNumber>
            <StatLabel>Vintage Watches</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>500+</StatNumber>
            <StatLabel>Active Sellers</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>2,000+</StatNumber>
            <StatLabel>Happy Customers</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>98%</StatNumber>
            <StatLabel>Satisfaction Rate</StatLabel>
          </StatCard>
        </StatsGrid>
      </StatsSection>
    </DashboardContainer>
  );
};

export default Dashboard;
