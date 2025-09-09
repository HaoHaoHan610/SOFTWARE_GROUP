import React, { useState } from 'react';
import { watchAPI, appraisalAPI } from '../../services/api';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import EditWatchForm from './EditWatchForm';

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

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7f8c8d;
  font-size: 3rem;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 1.5rem;
`;

const Title = styled.h3`
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
`;

const Brand = styled.p`
  color: #7f8c8d;
  margin: 0 0 1rem 0;
  font-weight: 500;
`;

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #27ae60;
  margin-bottom: 1rem;
`;

const Status = styled.div`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 1rem;
  background-color: ${props => props.active ? '#d4edda' : '#f8d7da'};
  color: ${props => props.active ? '#155724' : '#721c24'};
`;

const AppraisalSection = styled.div`
  margin: 1rem 0;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 8px;
`;

const AppraisalTitle = styled.h4`
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
`;

const AppraisalItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const AppraisalValue = styled.span`
  font-weight: 600;
  color: ${props => {
    if (props.value >= 80) return '#27ae60';
    if (props.value >= 60) return '#f39c12';
    return '#e74c3c';
  }};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
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

const RequestAppraisalButton = styled(Button)`
  background-color: #f39c12;
  color: white;
  
  &:hover {
    background-color: #e67e22;
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
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
`;

const WatchCard = ({ watch, appraisals, onWatchUpdated, onWatchDeleted }) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this watch listing?')) {
      return;
    }

    try {
      setLoading(true);
      await watchAPI.delete(watch.id);
      onWatchDeleted(watch.id);
    } catch (error) {
      console.error('Error deleting watch:', error);
      toast.error('Failed to delete watch');
    } finally {
      setLoading(false);
    }
  };

  const handleRequestAppraisal = async () => {
    try {
      setLoading(true);
      const appraisalData = {
        watch_id: watch.id,
        details: `Appraisal requested for ${watch.name} by ${watch.brand}`,
        status: 'pending'
      };
      
      await appraisalAPI.create(appraisalData);
      toast.success('Appraisal request submitted successfully!');
    } catch (error) {
      console.error('Error requesting appraisal:', error);
      toast.error('Failed to request appraisal');
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

  const getAppraisalValue = (appraisal) => {
    if (!appraisal) return null;
    // Assuming appraisal has a value field, adjust based on your API
    return appraisal.value || appraisal.estimated_value || null;
  };

  const latestAppraisal = appraisals.length > 0 ? appraisals[appraisals.length - 1] : null;

  return (
    <>
      <Card>
        <ImageContainer>
          {watch.img && watch.img !== 'Unknow' ? (
            <Image src={watch.img} alt={watch.name} />
          ) : (
            <span>🕰️</span>
          )}
        </ImageContainer>
        
        <Content>
          <Title>{watch.name}</Title>
          <Brand>{watch.brand}</Brand>
          <Price>{formatPrice(watch.price)}</Price>
          
          <Status active={watch.existing_status}>
            {watch.existing_status ? 'Active' : 'Sold'}
          </Status>

          {latestAppraisal && (
            <AppraisalSection>
              <AppraisalTitle>Latest Appraisal</AppraisalTitle>
              <AppraisalItem>
                <span>Status:</span>
                <span style={{ 
                  color: latestAppraisal.status === 'completed' ? '#27ae60' : '#f39c12',
                  fontWeight: '600'
                }}>
                  {latestAppraisal.status}
                </span>
              </AppraisalItem>
              {getAppraisalValue(latestAppraisal) && (
                <AppraisalItem>
                  <span>Estimated Value:</span>
                  <AppraisalValue value={getAppraisalValue(latestAppraisal)}>
                    {formatPrice(getAppraisalValue(latestAppraisal))}
                  </AppraisalValue>
                </AppraisalItem>
              )}
            </AppraisalSection>
          )}

          <ButtonGroup>
            <EditButton onClick={() => setShowEditForm(true)}>
              Edit
            </EditButton>
            <DeleteButton onClick={handleDelete} disabled={loading}>
              {loading ? '...' : 'Delete'}
            </DeleteButton>
          </ButtonGroup>
          
          {!latestAppraisal && (
            <RequestAppraisalButton 
              onClick={handleRequestAppraisal} 
              disabled={loading}
              style={{ marginTop: '0.5rem', width: '100%' }}
            >
              {loading ? 'Requesting...' : 'Request Appraisal'}
            </RequestAppraisalButton>
          )}
        </Content>
      </Card>

      {showEditForm && (
        <Modal>
          <ModalContent>
            <EditWatchForm
              watch={watch}
              onWatchUpdated={onWatchUpdated}
              onClose={() => setShowEditForm(false)}
            />
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default WatchCard;
