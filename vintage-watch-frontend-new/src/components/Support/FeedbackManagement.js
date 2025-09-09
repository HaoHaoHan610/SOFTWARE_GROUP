import React, { useState, useEffect } from 'react';
import { feedbackAPI } from '../../services/api';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const FeedbackManagementContainer = styled.div`
  max-width: 100%;
`;

const FeedbackCard = styled.div`
  background: white;
  border: 1px solid #e1e8ed;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  transition: box-shadow 0.2s ease;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const FeedbackHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const FeedbackInfo = styled.div`
  flex: 1;
`;

const FeedbackSubject = styled.h3`
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
`;

const FeedbackMeta = styled.div`
  display: flex;
  gap: 1rem;
  color: #7f8c8d;
  font-size: 0.9rem;
  flex-wrap: wrap;
`;

const StatusBadge = styled.div`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  background-color: ${props => {
    switch (props.status) {
      case 'open': return '#fff3cd';
      case 'in_progress': return '#cce5ff';
      case 'resolved': return '#d4edda';
      case 'closed': return '#e2e3e5';
      default: return '#f8d7da';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'open': return '#856404';
      case 'in_progress': return '#004085';
      case 'resolved': return '#155724';
      case 'closed': return '#383d41';
      default: return '#721c24';
    }
  }};
`;

const FeedbackContent = styled.div`
  margin-bottom: 1rem;
`;

const FeedbackMessage = styled.p`
  color: #2c3e50;
  margin: 0 0 1rem 0;
  line-height: 1.6;
`;

const FeedbackDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const DetailLabel = styled.span`
  font-size: 0.8rem;
  color: #7f8c8d;
  font-weight: 500;
  text-transform: uppercase;
`;

const DetailValue = styled.span`
  font-weight: 600;
  color: #2c3e50;
`;

const RatingDisplay = styled.div`
  display: flex;
  gap: 0.25rem;
  align-items: center;
`;

const Star = styled.span`
  color: ${props => props.filled ? '#f39c12' : '#e1e8ed'};
  font-size: 1.2rem;
`;

const FeedbackActions = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
  
  &:hover {
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ViewButton = styled(ActionButton)`
  background-color: #3498db;
  color: white;
  
  &:hover {
    background-color: #2980b9;
  }
`;

const RespondButton = styled(ActionButton)`
  background-color: #e67e22;
  color: white;
  
  &:hover {
    background-color: #d35400;
  }
`;

const ResolveButton = styled(ActionButton)`
  background-color: #27ae60;
  color: white;
  
  &:hover {
    background-color: #229954;
  }
`;

const CloseButton = styled(ActionButton)`
  background-color: #95a5a6;
  color: white;
  
  &:hover {
    background-color: #7f8c8d;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const FilterSelect = styled.select`
  padding: 8px 12px;
  border: 2px solid #e1e8ed;
  border-radius: 6px;
  font-size: 14px;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #e67e22;
  }
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

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const FeedbackManagement = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      setLoading(true);
      const response = await feedbackAPI.getAll();
      setFeedback(response.data || []);
    } catch (error) {
      console.error('Error fetching feedback:', error);
      toast.error('Failed to load feedback');
    } finally {
      setLoading(false);
    }
  };

  const filteredFeedback = feedback.filter(item => {
    const statusMatch = statusFilter === 'all' || item.status === statusFilter;
    const categoryMatch = categoryFilter === 'all' || item.category === categoryFilter;
    return statusMatch && categoryMatch;
  });

  const handleStatusUpdate = async (feedbackId, newStatus) => {
    try {
      const updatedFeedback = {
        ...feedback.find(f => f.id === feedbackId),
        status: newStatus
      };
      
      await feedbackAPI.update(feedbackId, updatedFeedback);
      setFeedback(feedback.map(f => 
        f.id === feedbackId ? updatedFeedback : f
      ));
      toast.success(`Feedback ${newStatus} successfully`);
    } catch (error) {
      console.error('Error updating feedback status:', error);
      toast.error('Failed to update feedback status');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderStars = (rating) => {
    return [1, 2, 3, 4, 5].map(star => (
      <Star key={star} filled={star <= rating}>
        ★
      </Star>
    ));
  };

  if (loading) {
    return (
      <LoadingSpinner>
        <div className="spinner"></div>
      </LoadingSpinner>
    );
  }

  return (
    <FeedbackManagementContainer>
      <FilterContainer>
        <FilterSelect
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </FilterSelect>
        
        <FilterSelect
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="general">General</option>
          <option value="order">Order Related</option>
          <option value="product">Product Question</option>
          <option value="shipping">Shipping & Delivery</option>
          <option value="payment">Payment Issue</option>
          <option value="appraisal">Appraisal Service</option>
          <option value="technical">Technical Support</option>
          <option value="complaint">Complaint</option>
          <option value="suggestion">Suggestion</option>
        </FilterSelect>
      </FilterContainer>

      {filteredFeedback.length === 0 ? (
        <EmptyState>
          <h3>No feedback found</h3>
          <p>No feedback matches the current filter criteria.</p>
        </EmptyState>
      ) : (
        filteredFeedback.map(item => (
          <FeedbackCard key={item.id}>
            <FeedbackHeader>
              <FeedbackInfo>
                <FeedbackSubject>{item.subject}</FeedbackSubject>
                <FeedbackMeta>
                  <span>From: User #{item.user_id}</span>
                  <span>Category: {item.category}</span>
                  <span>{formatDate(item.created_at)}</span>
                  {item.order_id && <span>Order: #{item.order_id}</span>}
                </FeedbackMeta>
              </FeedbackInfo>
              <StatusBadge status={item.status}>
                {item.status}
              </StatusBadge>
            </FeedbackHeader>

            <FeedbackContent>
              <FeedbackMessage>{item.message}</FeedbackMessage>
              
              <FeedbackDetails>
                <DetailItem>
                  <DetailLabel>Rating</DetailLabel>
                  <DetailValue>
                    {item.rating > 0 ? (
                      <RatingDisplay>
                        {renderStars(item.rating)}
                        <span style={{ marginLeft: '0.5rem' }}>
                          ({item.rating}/5)
                        </span>
                      </RatingDisplay>
                    ) : (
                      'No rating'
                    )}
                  </DetailValue>
                </DetailItem>
                
                <DetailItem>
                  <DetailLabel>Priority</DetailLabel>
                  <DetailValue>
                    {item.category === 'complaint' ? 'High' : 
                     item.category === 'payment' ? 'High' : 'Medium'}
                  </DetailValue>
                </DetailItem>
                
                <DetailItem>
                  <DetailLabel>Agent</DetailLabel>
                  <DetailValue>
                    {item.agent_id ? `Agent #${item.agent_id}` : 'Unassigned'}
                  </DetailValue>
                </DetailItem>
              </FeedbackDetails>
            </FeedbackContent>

            <FeedbackActions>
              <ViewButton onClick={() => toast.info('View full feedback details functionality would be implemented here')}>
                View Details
              </ViewButton>
              
              {item.status === 'open' && (
                <RespondButton onClick={() => handleStatusUpdate(item.id, 'in_progress')}>
                  Start Response
                </RespondButton>
              )}
              
              {item.status === 'in_progress' && (
                <ResolveButton onClick={() => handleStatusUpdate(item.id, 'resolved')}>
                  Mark Resolved
                </ResolveButton>
              )}
              
              {item.status === 'resolved' && (
                <CloseButton onClick={() => handleStatusUpdate(item.id, 'closed')}>
                  Close
                </CloseButton>
              )}
            </FeedbackActions>
          </FeedbackCard>
        ))
      )}
    </FeedbackManagementContainer>
  );
};

export default FeedbackManagement;
