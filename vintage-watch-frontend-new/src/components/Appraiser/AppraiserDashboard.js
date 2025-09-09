import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { appraisalAPI, watchAPI } from '../../services/api';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import AppraisalForm from './AppraisalForm';
import AppraisalCard from './AppraisalCard';

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
  color: #f39c12;
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

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const SectionTitle = styled.h2`
  color: #2c3e50;
  margin: 0;
`;

const Button = styled.button`
  background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);
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
  color: ${props => props.active ? '#f39c12' : '#7f8c8d'};
  border-bottom-color: ${props => props.active ? '#f39c12' : 'transparent'};
  
  &:hover {
    color: #f39c12;
  }
`;

const AppraisalsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #7f8c8d;
  
  h3 {
    margin-bottom: 1rem;
    color: #2c3e50;
  }
`;

const AppraiserDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('pending');
  const [appraisals, setAppraisals] = useState([]);
  const [watches, setWatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAppraisalForm, setShowAppraisalForm] = useState(false);
  const [selectedWatch, setSelectedWatch] = useState(null);

  useEffect(() => {
    fetchAppraiserData();
  }, []);

  const fetchAppraiserData = async () => {
    try {
      setLoading(true);
      // Load appraisals (if this fails, keep going for watches)
      try {
        const appraisalsResponse = await appraisalAPI.getByAppraiser(user.id);
        setAppraisals(appraisalsResponse.data || []);
      } catch (e) {
        console.warn('Appraisals fetch failed:', e);
        setAppraisals([]);
      }

      // Load watches with cache fallback
      try {
        const watchesResponse = await watchAPI.getAll();
        const list = (watchesResponse.data || []).filter(w => w.existing_status !== false);
        setWatches(list);
        try {
          localStorage.setItem('watches_cache', JSON.stringify({ data: list, cachedAt: Date.now() }));
        } catch (_) {}
      } catch (e1) {
        console.warn('Watches fetch failed:', e1);
        try {
          const raw = localStorage.getItem('watches_cache');
          const parsed = raw ? JSON.parse(raw) : null;
          setWatches(parsed?.data || []);
          if (!parsed?.data?.length) {
            toast.error('No watches available to appraise');
          } else {
            toast.info('Using cached watches because API is unavailable');
          }
        } catch (_) {
          setWatches([]);
          toast.error('Failed to load watch list');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAppraisalCreated = (newAppraisal) => {
    setAppraisals([...appraisals, newAppraisal]);
    setShowAppraisalForm(false);
    setSelectedWatch(null);
    toast.success('Appraisal created successfully!');
  };

  const handleAppraisalUpdated = (updatedAppraisal) => {
    setAppraisals(appraisals.map(appraisal => 
      appraisal.id === updatedAppraisal.id ? updatedAppraisal : appraisal
    ));
    toast.success('Appraisal updated successfully!');
  };

  const handleAppraisalDeleted = (appraisalId) => {
    setAppraisals(appraisals.filter(appraisal => appraisal.id !== appraisalId));
    toast.success('Appraisal deleted successfully!');
  };

  const getWatchById = (watchId) => {
    return watches.find(watch => watch.id === watchId);
  };

  const filteredAppraisals = appraisals.filter(appraisal => {
    switch (activeTab) {
      case 'pending':
        return appraisal.status === 'pending';
      case 'completed':
        return appraisal.status === 'completed';
      case 'all':
        return true;
      default:
        return true;
    }
  });

  const stats = {
    totalAppraisals: appraisals.length,
    pendingAppraisals: appraisals.filter(a => a.status === 'pending').length,
    completedAppraisals: appraisals.filter(a => a.status === 'completed').length,
    averageValue: appraisals.length > 0 
      ? appraisals.reduce((sum, a) => sum + (a.estimated_value || 0), 0) / appraisals.length 
      : 0
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
        <Title>Appraiser Dashboard</Title>
        <Button onClick={() => setShowAppraisalForm(true)}>
          + New Appraisal
        </Button>
      </Header>

      <StatsGrid>
        <StatCard>
          <StatNumber>{stats.totalAppraisals}</StatNumber>
          <StatLabel>Total Appraisals</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{stats.pendingAppraisals}</StatNumber>
          <StatLabel>Pending Reviews</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{stats.completedAppraisals}</StatNumber>
          <StatLabel>Completed</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>
            ${stats.averageValue > 0 ? Math.round(stats.averageValue).toLocaleString() : '0'}
          </StatNumber>
          <StatLabel>Avg. Value</StatLabel>
        </StatCard>
      </StatsGrid>

      {showAppraisalForm && (
        <Section>
          <SectionHeader>
            <SectionTitle>Create New Appraisal</SectionTitle>
            <Button 
              onClick={() => {
                setShowAppraisalForm(false);
                setSelectedWatch(null);
              }}
              style={{ background: '#e74c3c' }}
            >
              Cancel
            </Button>
          </SectionHeader>
          <AppraisalForm 
            onAppraisalCreated={handleAppraisalCreated}
            appraiserId={user.id}
            watches={watches}
            selectedWatch={selectedWatch}
          />
        </Section>
      )}

      <Section>
        <SectionHeader>
          <SectionTitle>Appraisal Management</SectionTitle>
        </SectionHeader>
        
        <TabContainer>
          <Tab 
            active={activeTab === 'pending'} 
            onClick={() => setActiveTab('pending')}
          >
            Pending ({stats.pendingAppraisals})
          </Tab>
          <Tab 
            active={activeTab === 'completed'} 
            onClick={() => setActiveTab('completed')}
          >
            Completed ({stats.completedAppraisals})
          </Tab>
          <Tab 
            active={activeTab === 'all'} 
            onClick={() => setActiveTab('all')}
          >
            All Appraisals
          </Tab>
        </TabContainer>
        
        {filteredAppraisals.length === 0 ? (
          <EmptyState>
            <h3>No appraisals found</h3>
            <p>
              {activeTab === 'pending' 
                ? 'No pending appraisals at the moment.' 
                : 'No completed appraisals yet.'}
            </p>
          </EmptyState>
        ) : (
          <AppraisalsGrid>
            {filteredAppraisals.map(appraisal => (
              <AppraisalCard
                key={appraisal.id}
                appraisal={appraisal}
                watch={getWatchById(appraisal.watch_id)}
                onAppraisalUpdated={handleAppraisalUpdated}
                onAppraisalDeleted={handleAppraisalDeleted}
              />
            ))}
          </AppraisalsGrid>
        )}
      </Section>
    </DashboardContainer>
  );
};

export default AppraiserDashboard;
 

