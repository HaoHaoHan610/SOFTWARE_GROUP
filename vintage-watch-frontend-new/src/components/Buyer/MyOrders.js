import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import { orderAPI, transactionAPI } from '../../services/api';
import Loading from '../Common/Loading';
import { toast } from 'react-toastify';

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.08);
  padding: 1.25rem;
  margin-bottom: 1rem;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;
`;

const Meta = styled.div`
  color: #7f8c8d;
  font-size: 0.95rem;
`;

const Amount = styled.div`
  color: #27ae60;
  font-weight: 700;
`;

const Row = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Button = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  color: white;
`;

const ReleaseBtn = styled(Button)`
  background: #27ae60;
`;

const DisputeBtn = styled(Button)`
  background: #e67e22;
`;

const RefreshBtn = styled(Button)`
  background: #3498db;
`;

const MyOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await orderAPI.getAll();
      const mine = (res.data || []).filter(o => o.customer_id === user.id);
      setOrders(mine);
    } catch (e) {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleRelease = async (orderId) => {
    try {
      // find transaction by creating one if missing
      const tx = await transactionAPI.create({ order_id: orderId });
      const escrow = await transactionAPI.createEscrow({
        transaction_id: tx.data.id,
        amount: tx.data.amount,
        seller_id: tx.data.seller_id,
        buyer_id: tx.data.buyer_id
      });
      // release by escrow id (if available via endpoint), else by transaction id
      if (escrow?.data?.id && transactionAPI.releaseEscrowById) {
        await transactionAPI.releaseEscrowById(escrow.data.id);
      } else if (transactionAPI.releaseEscrowByTransaction) {
        await transactionAPI.releaseEscrowByTransaction(tx.data.id);
      }
      toast.success('Escrow released');
      fetchOrders();
    } catch (e) {
      toast.error('Failed to release escrow');
    }
  };

  const handleDispute = async (orderId) => {
    try {
      // update escrow status by transaction id
      await transactionAPI.updateEscrowStatus({ transaction_id: orderId, status: 'disputed' });
      toast.success('Marked as disputed');
      fetchOrders();
    } catch (e) {
      toast.error('Failed to mark dispute');
    }
  };

  if (loading) return <Loading />;

  return (
    <Container>
      <Title>My Orders</Title>
      <Row style={{ marginBottom: '1rem' }}>
        <RefreshBtn onClick={fetchOrders}>Refresh</RefreshBtn>
      </Row>
      {orders.length === 0 ? (
        <Meta>No orders yet.</Meta>
      ) : orders.map(o => (
        <Card key={o.id}>
          <div>
            <div style={{ fontWeight: 700 }}>Order #{o.id}</div>
            <Meta>Status: {o.status}</Meta>
            <Meta>Address: {o.address}</Meta>
          </div>
          <div style={{ textAlign: 'right' }}>
            <Amount>${o.amount?.toLocaleString?.() || o.amount}</Amount>
            <Row style={{ marginTop: '0.5rem', justifyContent: 'flex-end' }}>
              <ReleaseBtn onClick={() => handleRelease(o.id)}>Release</ReleaseBtn>
              <DisputeBtn onClick={() => handleDispute(o.id)}>Dispute</DisputeBtn>
            </Row>
          </div>
        </Card>
      ))}
    </Container>
  );
};

export default MyOrders;
 
