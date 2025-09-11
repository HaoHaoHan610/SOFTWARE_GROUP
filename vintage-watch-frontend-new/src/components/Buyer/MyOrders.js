import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import { orderAPI, orderDetailAPI, transactionAPI } from '../../services/api';
import { toast } from 'react-toastify';

const Container = styled.div`
  max-width: 1100px; margin: 0 auto; padding: 2rem;
`;

const Card = styled.div`
  background: white; border-radius: 12px; padding: 1rem; box-shadow: 0 4px 6px rgba(0,0,0,0.08);
  margin-bottom: 1rem;
`;

const Header = styled.div`
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;
`;

const Btn = styled.button`
  padding: 8px 12px; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; color: white; background: #0ea5e9;
`;

const MyOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!user) return;
    setLoading(true);
    try {
      // backend has /orders/customer/:id
      const res = await orderAPI.getAll();
      const all = Array.isArray(res.data) ? res.data : (res.data?.data || []);
      const mine = (all || []).filter(o => Number(o.customer_id) === Number(user.id));
      setOrders(mine);
    } catch (e) {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [user?.id]);

  const confirmReceived = async (order) => {
    try {
      // Find transaction by order: FE only has release by transaction id, so fetch all transactions and match
      // Better: backend could expose /transactions/by-order/:orderId. For now, try fetching /transactions/all
      const txAll = await transactionAPI.getAll();
      const txList = Array.isArray(txAll.data) ? txAll.data : (txAll.data?.data || []);
      const tx = (txList || []).find(t => Number(t.order_id) === Number(order.id));
      if (!tx) { toast.error('Transaction not found for this order'); return; }
      await transactionAPI.releaseEscrowByTransaction(tx.id);
      toast.success('Escrow released. Thank you for confirming!');
      await load();
    } catch (e) {
      toast.error('Failed to confirm delivery');
    }
  };

  if (loading) return <div style={{ padding: '2rem' }}>Loading...</div>;

  return (
    <Container>
      <h1 style={{ color: '#1f2937' }}>My Orders</h1>
      {orders.length === 0 ? (
        <div style={{ color: '#64748b' }}>No orders yet.</div>
      ) : (
        orders.map(order => (
          <Card key={order.id}>
            <Header>
              <div>
                <strong>Order #{order.id}</strong>
                <div style={{ color: '#64748b', fontSize: 13 }}>Status: {order.status}</div>
                <div style={{ color: '#0f172a', fontWeight: 700 }}>Amount: ${Number(order.amount || 0).toLocaleString()}</div>
              </div>
              <div>
                <Btn onClick={() => confirmReceived(order)}>Confirm Received</Btn>
              </div>
            </Header>
            <div style={{ color: '#334155' }}>Address: {order.address}</div>
          </Card>
        ))
      )}
    </Container>
  );
};

export default MyOrders;
 

