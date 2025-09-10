import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from '../UI/Card';
import { orderAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const Wrapper = styled.div`
  max-width: 1100px; margin: 0 auto; padding: 24px;
`;

const Grid = styled.div`
  display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px;
`;

const MyOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const load = async () => {
      let list = [];
      try {
        const res = await orderAPI.getAll();
        list = res.data || [];
      } catch (_) { list = []; }
      // merge with local tx history
      try {
        const raw = localStorage.getItem('tx_history');
        const local = raw ? JSON.parse(raw) : [];
        setOrders([...(list || []), ...local.filter(o => o.buyer_id === user.id)]);
      } catch (_) {
        setOrders(list || []);
      }
    };
    load();
  }, [user?.id]);

  const format = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n || 0);

  return (
    <Wrapper>
      <Card title="My Orders">
        <Grid>
          {(orders || []).map(o => (
            <Card key={`${o.id || o.order_id}-card`} title={`Order #${o.id || o.order_id}`}>
              <div>Status: <strong>{o.status || '-'}</strong></div>
              <div>Amount: {format(o.amount)}</div>
            </Card>
          ))}
        </Grid>
      </Card>
    </Wrapper>
  );
};

export default MyOrders;

