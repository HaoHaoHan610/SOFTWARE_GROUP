import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { watchAPI, orderAPI, feedbackAPI } from '../../services/api';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import WatchCard from './WatchCard';
import OrderHistory from './OrderHistory';
import FeedbackForm from './FeedbackForm';

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
  color: ${props => props.active ? '#3498db' : '#7f8c8d'};
  border-bottom-color: ${props => props.active ? '#3498db' : 'transparent'};
  
  &:hover {
    color: #3498db;
  }
`;

const SearchFilters = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-radius: 8px;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FilterLabel = styled.label`
  font-weight: 500;
  color: #2c3e50;
  font-size: 0.9rem;
`;

const FilterInput = styled.input`
  padding: 8px 12px;
  border: 2px solid #e1e8ed;
  border-radius: 6px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const FilterSelect = styled.select`
  padding: 8px 12px;
  border: 2px solid #e1e8ed;
  border-radius: 6px;
  font-size: 14px;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #3498db;
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

const BuyerDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('browse');
  const [watches, setWatches] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    brand: '',
    minPrice: '',
    maxPrice: '',
    search: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [watchesResponse, ordersResponse] = await Promise.all([
        watchAPI.getAll(),
        orderAPI.getAll()
      ]);
      
      setWatches(watchesResponse.data || []);
      setOrders(ordersResponse.data || []);
    } catch (error) {
      console.error('Error fetching buyer data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredWatches = watches.filter(watch => {
    const matchesBrand = !filters.brand || 
      watch.brand.toLowerCase().includes(filters.brand.toLowerCase());
    const matchesMinPrice = !filters.minPrice || 
      watch.price >= parseFloat(filters.minPrice);
    const matchesMaxPrice = !filters.maxPrice || 
      watch.price <= parseFloat(filters.maxPrice);
    const matchesSearch = !filters.search || 
      watch.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      watch.brand.toLowerCase().includes(filters.search.toLowerCase());
    
    return matchesBrand && matchesMinPrice && matchesMaxPrice && matchesSearch;
  });

  const userOrders = orders.filter(order => order.buyer_id === user.id);

  const stats = {
    totalWatches: filteredWatches.length,
    totalOrders: userOrders.length,
    completedOrders: userOrders.filter(o => o.status === 'completed').length,
    pendingOrders: userOrders.filter(o => o.status === 'pending').length
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
        <Title>Buyer Dashboard</Title>
      </Header>

      <StatsGrid>
        <StatCard>
          <StatNumber>{stats.totalWatches}</StatNumber>
          <StatLabel>Available Watches</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{stats.totalOrders}</StatNumber>
          <StatLabel>Total Orders</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{stats.completedOrders}</StatNumber>
          <StatLabel>Completed Orders</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{stats.pendingOrders}</StatNumber>
          <StatLabel>Pending Orders</StatLabel>
        </StatCard>
      </StatsGrid>

      <Section>
        <TabContainer>
          <Tab 
            active={activeTab === 'browse'} 
            onClick={() => setActiveTab('browse')}
          >
            Browse Watches
          </Tab>
          <Tab 
            active={activeTab === 'orders'} 
            onClick={() => setActiveTab('orders')}
          >
            My Orders
          </Tab>
          <Tab 
            active={activeTab === 'feedback'} 
            onClick={() => setActiveTab('feedback')}
          >
            Leave Feedback
          </Tab>
        </TabContainer>

        {activeTab === 'browse' && (
          <>
            <SearchFilters>
              <FilterGroup>
                <FilterLabel>Search</FilterLabel>
                <FilterInput
                  type="text"
                  name="search"
                  value={filters.search}
                  onChange={handleFilterChange}
                  placeholder="Search watches..."
                />
              </FilterGroup>
              
              <FilterGroup>
                <FilterLabel>Brand</FilterLabel>
                <FilterInput
                  type="text"
                  name="brand"
                  value={filters.brand}
                  onChange={handleFilterChange}
                  placeholder="Filter by brand..."
                />
              </FilterGroup>
              
              <FilterGroup>
                <FilterLabel>Min Price</FilterLabel>
                <FilterInput
                  type="number"
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                  placeholder="Min price"
                  min="0"
                />
              </FilterGroup>
              
              <FilterGroup>
                <FilterLabel>Max Price</FilterLabel>
                <FilterInput
                  type="number"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  placeholder="Max price"
                  min="0"
                />
              </FilterGroup>
            </SearchFilters>

            {filteredWatches.length === 0 ? (
              <EmptyState>
                <h3>No watches found</h3>
                <p>Try adjusting your search filters or check back later for new listings.</p>
              </EmptyState>
            ) : (
              <WatchesGrid>
                {filteredWatches.map(watch => (
                  <WatchCard
                    key={watch.id}
                    watch={watch}
                    onPurchase={() => fetchData()}
                  />
                ))}
              </WatchesGrid>
            )}
          </>
        )}

        {activeTab === 'orders' && (
          <OrderHistory orders={userOrders} />
        )}

        {activeTab === 'feedback' && (
          <FeedbackForm onFeedbackSubmitted={() => toast.success('Feedback submitted successfully!')} />
        )}
      </Section>
    </DashboardContainer>
  );
};

export default BuyerDashboard;
