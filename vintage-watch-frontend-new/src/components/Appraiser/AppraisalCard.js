import React, { useState } from 'react';
import { appraisalAPI } from '../../services/api';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import EditAppraisalForm from './EditAppraisalForm';

const Card = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const CardHeader = styled.div`
  background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);
  color: white;
  padding: 1rem 1.5rem;
`;

const WatchInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
`;

const WatchTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
`;

const WatchBrand = styled.p`
  margin: 0;
  opacity: 0.9;
  font-size: 0.9rem;
`;

const StatusBadge = styled.div`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  background-color: ${props => {
    switch (props.status) {
      case 'completed': return 'rgba(39, 174, 96, 0.2)';
      case 'pending': return 'rgba(243, 156, 18, 0.2)';
      case 'requires_inspection': return 'rgba(231, 76, 60, 0.2)';
      default: return 'rgba(255, 255, 255, 0.2)';
    }
  }};
  color: white;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const ValueSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 8px;
`;

const EstimatedValue = styled.div`
  text-align: center;
`;

const ValueLabel = styled.div`
  font-size: 0.8rem;
  color: #7f8c8d;
  margin-bottom: 0.25rem;
`;

const ValueAmount = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #27ae60;
`;

const ConditionRating = styled.div`
  text-align: center;
`;

const RatingLabel = styled.div`
  font-size: 0.8rem;
  color: #7f8c8d;
  margin-bottom: 0.25rem;
`;

const RatingValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => {
    if (props.rating >= 8) return '#27ae60';
    if (props.rating >= 6) return '#f39c12';
    return '#e74c3c';
  }};
`;

const DetailsSection = styled.div`
  margin-bottom: 1rem;
`;

const DetailsTitle = styled.h4`
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
`;

const DetailsText = styled.p`
  color: #7f8c8d;
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const AuthenticityBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 1rem;
  background-color: ${props => props.verified ? '#d4edda' : '#f8d7da'};
  color: ${props => props.verified ? '#155724' : '#721c24'};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Button = styled.button`
  flex: 1;
  padding: 8px 12px;
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

const EditButton = styled(Button)`
  background-color: #3498db;
  color: white;
  
  &:hover {
    background-color: #2980b9;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #e74c3c;
  color: white;
  
  &:hover {
    background-color: #c0392b;
  }
`;

const CompleteButton = styled(Button)`
  background-color: #27ae60;
  color: white;
  
  &:hover {
    background-color: #229954;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
`;

const AppraisalCard = ({ appraisal, watch, onAppraisalUpdated, onAppraisalDeleted }) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this appraisal?')) {
      return;
    }

    try {
      setLoading(true);
      await appraisalAPI.delete(appraisal.id);
      onAppraisalDeleted(appraisal.id);
    } catch (error) {
      console.error('Error deleting appraisal:', error);
      toast.error('Failed to delete appraisal');
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async () => {
    try {
      setLoading(true);
      const response = await appraisalAPI.update(appraisal.id, { status: 'completed' });
      onAppraisalUpdated(response.data);
      toast.success('Appraisal marked as completed!');
    } catch (error) {
      console.error('Error completing appraisal:', error);
      toast.error('Failed to complete appraisal');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const getConditionText = (rating) => {
    if (rating >= 9) return 'Excellent';
    if (rating >= 7) return 'Very Good';
    if (rating >= 5) return 'Good';
    if (rating >= 3) return 'Fair';
    return 'Poor';
  };

  // Normalize fields from backend (es_value, auth, con_note) or frontend legacy names
  const normalized = {
    value: appraisal.es_value ?? appraisal.estimated_value ?? 0,
    verified: appraisal.auth ?? appraisal.authenticity_verified ?? false,
    details: appraisal.con_note ?? appraisal.details ?? '',
    recommendations: appraisal.recommendations ?? '',
    rating: appraisal.condition_rating ?? null,
  };

  return (
    <>
      <Card>
        <CardHeader>
          <WatchInfo>
            <div>
              <WatchTitle>
                {watch ? `${watch.brand} ${watch.name}` : 'Unknown Watch'}
              </WatchTitle>
              <WatchBrand>
                {watch ? `Watch ID: ${watch.id}` : 'Watch not found'}
              </WatchBrand>
            </div>
            <StatusBadge status={appraisal.status}>
              {appraisal.status}
            </StatusBadge>
          </WatchInfo>
        </CardHeader>
        
        <CardContent>
          <ValueSection>
            <EstimatedValue>
              <ValueLabel>Estimated Value</ValueLabel>
              <ValueAmount>
                {formatPrice(normalized.value || 0)}
              </ValueAmount>
            </EstimatedValue>
            
            <ConditionRating>
              <RatingLabel>Condition</RatingLabel>
              <RatingValue rating={normalized.rating || 0}>
                {normalized.rating !== null ? `${normalized.rating}/10` : '—'}
              </RatingValue>
            </ConditionRating>
          </ValueSection>

          <AuthenticityBadge verified={normalized.verified}>
            {normalized.verified ? '✅' : '❌'}
            {normalized.verified ? 'Authenticity Verified' : 'Not Verified'}
          </AuthenticityBadge>

          <DetailsSection>
            <DetailsTitle>Assessment Details</DetailsTitle>
            <DetailsText>
              {normalized.details || 'No detailed assessment provided.'}
            </DetailsText>
          </DetailsSection>

          {normalized.recommendations && (
            <DetailsSection>
              <DetailsTitle>Recommendations</DetailsTitle>
              <DetailsText>{normalized.recommendations}</DetailsText>
            </DetailsSection>
          )}

          <ButtonGroup>
            <EditButton onClick={() => setShowEditForm(true)}>
              Edit
            </EditButton>
            
            {appraisal.status === 'pending' && (
              <CompleteButton onClick={handleComplete} disabled={loading}>
                {loading ? '...' : 'Complete'}
              </CompleteButton>
            )}
            
            <DeleteButton onClick={handleDelete} disabled={loading}>
              {loading ? '...' : 'Delete'}
            </DeleteButton>
          </ButtonGroup>
        </CardContent>
      </Card>

      {showEditForm && (
        <Modal>
          <ModalContent>
            <EditAppraisalForm
              appraisal={appraisal}
              watch={watch}
              onAppraisalUpdated={onAppraisalUpdated}
              onClose={() => setShowEditForm(false)}
            />
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default AppraisalCard;
