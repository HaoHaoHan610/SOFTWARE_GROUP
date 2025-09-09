import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { feedbackAPI } from '../../services/api';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import FeedbackManagement from './FeedbackManagement';
import SupportTickets from './SupportTickets';
import LiveChat from './LiveChat';

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
  color: #e67e22;
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
  color: ${props => props.active ? '#e67e22' : '#7f8c8d'};
  border-bottom-color: ${props => props.active ? '#e67e22' : 'transparent'};
  
  &:hover {
    color: #e67e22;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const SupportDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('feedback');
  const [stats, setStats] = useState({
    totalFeedback: 0,
    openTickets: 0,
    resolvedTickets: 0,
    averageResponseTime: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSupportData();
  }, []);

  const fetchSupportData = async () => {
    try {
      setLoading(true);
      const [feedbackResponse] = await Promise.all([
        feedbackAPI.getAll()
      ]);
      
      const feedback = feedbackResponse.data || [];
      
      setStats({
        totalFeedback: feedback.length,
        openTickets: feedback.filter(f => f.status === 'open').length,
        resolvedTickets: feedback.filter(f => f.status === 'resolved').length,
        averageResponseTime: 2.5 // Mock data - would calculate from actual response times
      });
    } catch (error) {
      console.error('Error fetching support data:', error);
      toast.error('Failed to load support dashboard data');
    } finally {
      setLoading(false);
    }
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
        <Title>Customer Support Dashboard</Title>
      </Header>

      <StatsGrid>
        <StatCard>
          <StatNumber>{stats.totalFeedback}</StatNumber>
          <StatLabel>Total Feedback</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{stats.openTickets}</StatNumber>
          <StatLabel>Open Tickets</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{stats.resolvedTickets}</StatNumber>
          <StatLabel>Resolved Tickets</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{stats.averageResponseTime}h</StatNumber>
          <StatLabel>Avg. Response Time</StatLabel>
        </StatCard>
      </StatsGrid>

      <Section>
        <TabContainer>
          <Tab 
            active={activeTab === 'feedback'} 
            onClick={() => setActiveTab('feedback')}
          >
            Feedback Management
          </Tab>
          <Tab 
            active={activeTab === 'tickets'} 
            onClick={() => setActiveTab('tickets')}
          >
            Support Tickets
          </Tab>
          <Tab 
            active={activeTab === 'chat'} 
            onClick={() => setActiveTab('chat')}
          >
            Live Chat
          </Tab>
        </TabContainer>

        {activeTab === 'feedback' && <FeedbackManagement />}
        {activeTab === 'tickets' && <SupportTickets />}
        {activeTab === 'chat' && <LiveChat />}
      </Section>
    </DashboardContainer>
  );
};

export default SupportDashboard;
