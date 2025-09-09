import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { watchAPI, appraisalAPI } from '../../services/api';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import WatchCard from './WatchCard';
import CreateWatchForm from './CreateWatchForm';

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
  color: #3498db;
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
  background: linear-gradient(135deg, #27ae60 0%, #229954 100%);
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

const WatchesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
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

const SellerDashboard = () => {
  const { user } = useAuth();
  const [watches, setWatches] = useState([]);
  const [appraisals, setAppraisals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [usingCache, setUsingCache] = useState(false);

  useEffect(() => {
    fetchSellerData();
  }, []);

  const dedupeById = (items) => {
    const map = new Map();
    (items || []).forEach((w) => {
      if (!map.has(w.id)) map.set(w.id, w);
      else {
        // Prefer the latest truthy fields
        map.set(w.id, { ...map.get(w.id), ...w });
      }
    });
    return Array.from(map.values());
  };

  const fetchSellerData = async () => {
    try {
      setLoading(true);
      const watchesResponse = await watchAPI.getBySeller(user.id);
      const list = dedupeById(watchesResponse.data || []);
      setWatches(list);
      setUsingCache(false);
      try { localStorage.setItem('watches_cache', JSON.stringify({ data: list, cachedAt: Date.now() })); } catch(_){}

      try {
        const appraisalsResponse = await appraisalAPI.getAll();
        setAppraisals(appraisalsResponse.data || []);
      } catch (err) {
        console.warn('Appraisals endpoint unavailable:', err);
        setAppraisals([]);
      }
    } catch (error) {
      console.error('Error fetching seller data:', error);
      // Fallback to cached watches for this seller
      try {
        const raw = localStorage.getItem('watches_cache');
        const parsed = raw ? JSON.parse(raw) : null;
        const cached = dedupeById((parsed?.data || []).filter(w => w.seller_id === user.id));
        setWatches(cached);
        setUsingCache(true);
      } catch (_) {
        setWatches([]);
        setUsingCache(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleWatchCreated = (newWatch) => {
    setWatches((prev) => dedupeById([...(prev || []), newWatch]));
    setShowCreateForm(false);
    toast.success('Watch listing created successfully!');
  };

  const handleWatchUpdated = (updatedWatch) => {
    setWatches((prev) => dedupeById(prev.map(watch => 
      watch.id === updatedWatch.id ? updatedWatch : watch
    )));
    toast.success('Watch updated successfully!');
  };

  const handleWatchDeleted = (watchId) => {
    setWatches(watches.filter(watch => watch.id !== watchId));
    toast.success('Watch deleted successfully!');
  };

  const getWatchAppraisals = (watchId) => {
    return appraisals.filter(appraisal => appraisal.watch_id === watchId);
  };

  const stats = {
    totalListings: watches.length,
    activeListings: watches.filter(w => w.existing_status).length,
    totalAppraisals: appraisals.filter(a => 
      watches.some(w => w.id === a.watch_id)
    ).length,
    pendingAppraisals: appraisals.filter(a => 
      watches.some(w => w.id === a.watch_id) && a.status === 'pending'
    ).length
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
      {usingCache && (
        <div style={{
          background: '#fff3cd',
          color: '#856404',
          border: '1px solid #ffeeba',
          padding: '12px 16px',
          borderRadius: '8px',
          marginBottom: '16px'
        }}>
          Using cached listings because API is unavailable.
        </div>
      )}
      <Header>
        <Title>Seller Dashboard</Title>
        <Button onClick={() => setShowCreateForm(true)}>
          + Add New Watch
        </Button>
      </Header>

      <StatsGrid>
        <StatCard>
          <StatNumber>{stats.totalListings}</StatNumber>
          <StatLabel>Total Listings</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{stats.activeListings}</StatNumber>
          <StatLabel>Active Listings</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{stats.totalAppraisals}</StatNumber>
          <StatLabel>Total Appraisals</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{stats.pendingAppraisals}</StatNumber>
          <StatLabel>Pending Appraisals</StatLabel>
        </StatCard>
      </StatsGrid>

      {showCreateForm && (
        <Section>
          <SectionHeader>
            <SectionTitle>Create New Watch Listing</SectionTitle>
            <Button 
              onClick={() => setShowCreateForm(false)}
              style={{ background: '#e74c3c' }}
            >
              Cancel
            </Button>
          </SectionHeader>
          <CreateWatchForm 
            onWatchCreated={handleWatchCreated}
            sellerId={user.id}
          />
        </Section>
      )}

      <Section>
        <SectionHeader>
          <SectionTitle>My Watch Listings</SectionTitle>
        </SectionHeader>
        
        {watches.length === 0 ? (
          <EmptyState>
            <h3>No watch listings yet</h3>
            <p>Start by adding your first vintage watch to the marketplace.</p>
          </EmptyState>
        ) : (
          <WatchesGrid>
            {watches.map(watch => (
              <WatchCard
                key={watch.id}
                watch={watch}
                appraisals={getWatchAppraisals(watch.id)}
                onWatchUpdated={handleWatchUpdated}
                onWatchDeleted={handleWatchDeleted}
              />
            ))}
          </WatchesGrid>
        )}
      </Section>
    </DashboardContainer>
  );
};

export default SellerDashboard;
