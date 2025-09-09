import React from 'react';
import styled from 'styled-components';

const OrderHistoryContainer = styled.div`
  max-width: 100%;
`;

const OrderCard = styled.div`
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

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const OrderInfo = styled.div`
  flex: 1;
`;

const OrderId = styled.h3`
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
`;

const OrderDate = styled.p`
  color: #7f8c8d;
  margin: 0;
  font-size: 0.9rem;
`;

const OrderStatus = styled.div`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  background-color: ${props => {
    switch (props.status) {
      case 'completed': return '#d4edda';
      case 'pending': return '#fff3cd';
      case 'cancelled': return '#f8d7da';
      case 'shipped': return '#cce5ff';
      default: return '#e2e3e5';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'completed': return '#155724';
      case 'pending': return '#856404';
      case 'cancelled': return '#721c24';
      case 'shipped': return '#004085';
      default: return '#383d41';
    }
  }};
`;

const OrderDetails = styled.div`
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

const OrderActions = styled.div`
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

const TrackButton = styled(ActionButton)`
  background-color: #f39c12;
  color: white;
  
  &:hover {
    background-color: #e67e22;
  }
`;

const CancelButton = styled(ActionButton)`
  background-color: #e74c3c;
  color: white;
  
  &:hover {
    background-color: #c0392b;
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

const OrderHistory = ({ orders }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const handleViewOrder = (orderId) => {
    // Navigate to order details page
    console.log('View order:', orderId);
  };

  const handleTrackOrder = (orderId) => {
    // Navigate to tracking page
    console.log('Track order:', orderId);
  };

  const handleCancelOrder = (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      // Cancel order logic
      console.log('Cancel order:', orderId);
    }
  };

  if (orders.length === 0) {
    return (
      <EmptyState>
        <h3>No orders yet</h3>
        <p>Your order history will appear here once you make your first purchase.</p>
      </EmptyState>
    );
  }

  return (
    <OrderHistoryContainer>
      {orders.map(order => (
        <OrderCard key={order.id}>
          <OrderHeader>
            <OrderInfo>
              <OrderId>Order #{order.id}</OrderId>
              <OrderDate>
                Placed on {formatDate(order.created_at || order.order_date)}
              </OrderDate>
            </OrderInfo>
            <OrderStatus status={order.status}>
              {order.status}
            </OrderStatus>
          </OrderHeader>

          <OrderDetails>
            <DetailItem>
              <DetailLabel>Total Amount</DetailLabel>
              <DetailValue>{formatPrice(order.total_amount)}</DetailValue>
            </DetailItem>
            
            <DetailItem>
              <DetailLabel>Seller ID</DetailLabel>
              <DetailValue>#{order.seller_id}</DetailValue>
            </DetailItem>
            
            <DetailItem>
              <DetailLabel>Shipping Address</DetailLabel>
              <DetailValue>
                {order.shipping_address || 'Not provided'}
              </DetailValue>
            </DetailItem>
            
            <DetailItem>
              <DetailLabel>Payment Status</DetailLabel>
              <DetailValue>
                {order.payment_status || 'Pending'}
              </DetailValue>
            </DetailItem>
          </OrderDetails>

          {order.notes && (
            <div style={{ 
              backgroundColor: '#f8f9fa', 
              padding: '1rem', 
              borderRadius: '6px',
              marginBottom: '1rem'
            }}>
              <DetailLabel>Order Notes</DetailLabel>
              <p style={{ margin: '0.5rem 0 0 0', color: '#2c3e50' }}>
                {order.notes}
              </p>
            </div>
          )}

          <OrderActions>
            <ViewButton onClick={() => handleViewOrder(order.id)}>
              View Details
            </ViewButton>
            
            {order.status === 'shipped' && (
              <TrackButton onClick={() => handleTrackOrder(order.id)}>
                Track Package
              </TrackButton>
            )}
            
            {(order.status === 'pending' || order.status === 'processing') && (
              <CancelButton onClick={() => handleCancelOrder(order.id)}>
                Cancel Order
              </CancelButton>
            )}
          </OrderActions>
        </OrderCard>
      ))}
    </OrderHistoryContainer>
  );
};

export default OrderHistory;
