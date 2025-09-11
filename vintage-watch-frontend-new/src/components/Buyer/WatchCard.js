import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { watchAPI, orderAPI, transactionAPI, appraisalAPI } from '../../services/api';
import { toast } from 'react-toastify';
import styled from 'styled-components';

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
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StatusBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 600;
  background-color: ${props => props.available ? '#d4edda' : '#f8d7da'};
  color: ${props => props.available ? '#155724' : '#721c24'};
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

const AppraisalSection = styled.div`
  margin: 1rem 0;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #3498db;
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
  padding: 10px 16px;
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

const ViewButton = styled(Button)`
  background-color: #3498db;
  color: white;
  
  &:hover {
    background-color: #2980b9;
  }
`;

const PurchaseButton = styled(Button)`
  background-color: #27ae60;
  color: white;
  
  &:hover {
    background-color: #229954;
  }
`;

const AddBtn = styled(Button)`
  flex: 0 0 auto;
  width: 40px;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #8e44ad;
  color: white;
  font-size: 1.2rem;
  &:hover { background-color: #7d3c98; }
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
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ModalTitle = styled.h2`
  color: #2c3e50;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #7f8c8d;
  
  &:hover {
    color: #2c3e50;
  }
`;

const PurchaseForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: #2c3e50;
`;

const Input = styled.input`
  padding: 10px;
  border: 2px solid #e1e8ed;
  border-radius: 6px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 2px solid #e1e8ed;
  border-radius: 6px;
  font-size: 14px;
  resize: vertical;
  min-height: 80px;
  
  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const SubmitButton = styled.button`
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
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const WatchCard = ({ watch, onPurchase }) => {
  const { user } = useAuth();
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [appraisal, setAppraisal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [purchaseLoading, setPurchaseLoading] = useState(false);
  const [purchaseData, setPurchaseData] = useState({
    shipping_address: '',
    notes: ''
  });

  React.useEffect(() => {
    fetchAppraisal();
  }, [watch.id]);

  const fetchAppraisal = async () => {
    try {
      const response = await appraisalAPI.getByWatch(watch.id);
      if (response.data && response.data.length > 0) {
        setAppraisal(response.data[0]); // Get the latest appraisal
      }
    } catch (error) {
      console.error('Error fetching appraisal:', error);
    }
  };

  const handlePurchase = async (e) => {
    e.preventDefault();
    setPurchaseLoading(true);

    try {
      // Create order: map to backend schema
      const orderData = {
        customer_id: user.id,
        address: purchaseData.shipping_address,
        amount: watch.price,
        status: 'pending'
      };

      const orderResponse = await orderAPI.create(orderData);

      // Checkout: backend will create transaction and escrows per seller
      await transactionAPI.checkout(orderResponse.data.id);

      toast.success('Purchase initiated! Funds held in escrow until delivery.');
      setShowPurchaseModal(false);
      onPurchase();
      
    } catch (error) {
      console.error('Error processing purchase:', error);
      toast.error('Failed to process purchase. Please try again.');
    } finally {
      setPurchaseLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!watch.existing_status) {
      toast.error('This watch is sold and cannot be added to cart');
      return;
    }
    try {
      const raw = localStorage.getItem('cart_items');
      const items = raw ? JSON.parse(raw) : [];
      const existing = items.find(i => i.id === watch.id);
      if (existing) {
        existing.qty = (existing.qty || 1) + 1;
      } else {
        items.push({
          id: watch.id,
          name: watch.name,
          brand: watch.brand,
          price: watch.price,
          img: watch.img,
          seller_id: watch.seller_id,
          qty: 1
        });
      }
      localStorage.setItem('cart_items', JSON.stringify(items));
      toast.success('Added to cart');
    } catch (e) {
      toast.error('Failed to add to cart');
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
    return appraisal.value || appraisal.estimated_value || null;
  };

  return (
    <>
      <Card>
        <ImageContainer>
          {watch.img && watch.img !== 'Unknow' ? (
            <Image src={watch.img} alt={watch.name} />
          ) : (
            <span>🕰️</span>
          )}
          <StatusBadge available={watch.existing_status}>
            {watch.existing_status ? 'Available' : 'Sold'}
          </StatusBadge>
        </ImageContainer>
        
        <Content>
          <Title>{watch.name}</Title>
          <Brand>{watch.brand}</Brand>
          <Price>{formatPrice(watch.price)}</Price>

          {appraisal && (
            <AppraisalSection>
              <AppraisalTitle>Professional Appraisal</AppraisalTitle>
              <AppraisalItem>
                <span>Status:</span>
                <span style={{ 
                  color: appraisal.status === 'completed' ? '#27ae60' : '#f39c12',
                  fontWeight: '600'
                }}>
                  {appraisal.status}
                </span>
              </AppraisalItem>
              {getAppraisalValue(appraisal) && (
                <AppraisalItem>
                  <span>Estimated Value:</span>
                  <AppraisalValue value={getAppraisalValue(appraisal)}>
                    {formatPrice(getAppraisalValue(appraisal))}
                  </AppraisalValue>
                </AppraisalItem>
              )}
            </AppraisalSection>
          )}

          <ButtonGroup>
            <ViewButton onClick={() => window.location.href = `/watch/${watch.id}`}>
              View Details
            </ViewButton>
            <AddBtn title="Add to cart" onClick={handleAddToCart} disabled={!watch.existing_status}>+</AddBtn>
            <PurchaseButton 
              onClick={() => setShowPurchaseModal(true)}
              disabled={!watch.existing_status || !user}
            >
              {!user ? 'Login to Buy' : (watch.existing_status ? 'Purchase' : 'Sold')}
            </PurchaseButton>
          </ButtonGroup>
        </Content>
      </Card>

      {showPurchaseModal && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Purchase {watch.name}</ModalTitle>
              <CloseButton onClick={() => setShowPurchaseModal(false)}>
                ×
              </CloseButton>
            </ModalHeader>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ color: '#2c3e50', marginBottom: '0.5rem' }}>
                {watch.brand} {watch.name}
              </h3>
              <p style={{ fontSize: '1.2rem', fontWeight: '600', color: '#27ae60' }}>
                {formatPrice(watch.price)}
              </p>
            </div>

            {appraisal && (
              <div style={{ 
                backgroundColor: '#f8f9fa', 
                padding: '1rem', 
                borderRadius: '8px',
                marginBottom: '1.5rem',
                borderLeft: '4px solid #3498db'
              }}>
                <h4 style={{ color: '#2c3e50', margin: '0 0 0.5rem 0' }}>
                  Professional Appraisal
                </h4>
                <p style={{ margin: '0', fontSize: '0.9rem', color: '#7f8c8d' }}>
                  This watch has been professionally appraised and authenticated.
                </p>
              </div>
            )}

            <PurchaseForm onSubmit={handlePurchase}>
              <FormGroup>
                <Label htmlFor="shipping_address">Shipping Address *</Label>
                <TextArea
                  id="shipping_address"
                  name="shipping_address"
                  value={purchaseData.shipping_address}
                  onChange={(e) => setPurchaseData({
                    ...purchaseData,
                    shipping_address: e.target.value
                  })}
                  required
                  placeholder="Enter your complete shipping address..."
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="notes">Additional Notes</Label>
                <TextArea
                  id="notes"
                  name="notes"
                  value={purchaseData.notes}
                  onChange={(e) => setPurchaseData({
                    ...purchaseData,
                    notes: e.target.value
                  })}
                  placeholder="Any special instructions or notes..."
                />
              </FormGroup>

              <SubmitButton type="submit" disabled={purchaseLoading}>
                {purchaseLoading ? 'Processing...' : 'Complete Purchase'}
              </SubmitButton>
            </PurchaseForm>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default WatchCard;
 

