import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import { orderAPI, transactionAPI } from '../../services/api';
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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.08);
`;

const Th = styled.th`
  text-align: left;
  padding: 12px;
  background: #f8f9fa;
  color: #2c3e50;
`;

const Td = styled.td`
  padding: 12px;
  border-top: 1px solid #eef2f5;
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
`;

const Button = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  color: white;
`;

const Primary = styled(Button)`
  background: #27ae60;
`;

const Danger = styled(Button)`
  background: #e74c3c;
`;

const Cart = () => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('cart_items');
      setItems(raw ? JSON.parse(raw) : []);
    } catch (_) {
      setItems([]);
    }
  }, []);

  const removeItem = (id) => {
    const next = items.filter(i => i.id !== id);
    setItems(next);
    localStorage.setItem('cart_items', JSON.stringify(next));
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('cart_items');
  };

  const total = items.reduce((sum, i) => sum + (i.price * (i.qty || 1)), 0);

  const checkoutAll = async () => {
    if (!items.length) return;
    try {
      // Create one order per seller to simplify settlement
      const groups = items.reduce((map, i) => {
        const key = i.seller_id || 'unknown';
        map[key] = map[key] || [];
        map[key].push(i);
        return map;
      }, {});

      for (const sellerId of Object.keys(groups)) {
        const group = groups[sellerId];
        const amount = group.reduce((s, i) => s + (i.price * (i.qty || 1)), 0);

        const order = await orderAPI.create({
          customer_id: user.id,
          address: 'Cart checkout',
          amount,
          status: 'pending'
        });

        const tx = await transactionAPI.create({ order_id: order.data.id });
        await transactionAPI.createEscrow({
          transaction_id: tx.data.id,
          amount,
          seller_id: Number(sellerId) || 0,
          buyer_id: user.id
        });
      }

      toast.success('Checkout created. Escrow secured.');
      clearCart();
    } catch (e) {
      console.error(e);
      toast.error('Checkout failed');
    }
  };

  return (
    <Container>
      <Title>Cart</Title>
      {items.length === 0 ? (
        <div style={{ color: '#7f8c8d' }}>Your cart is empty.</div>
      ) : (
        <>
          <Table>
            <thead>
              <tr>
                <Th>Item</Th>
                <Th>Brand</Th>
                <Th>Price</Th>
                <Th>Qty</Th>
                <Th></Th>
              </tr>
            </thead>
            <tbody>
              {items.map(i => (
                <tr key={i.id}>
                  <Td>{i.name}</Td>
                  <Td>{i.brand}</Td>
                  <Td>${i.price?.toLocaleString?.() || i.price}</Td>
                  <Td>{i.qty || 1}</Td>
                  <Td>
                    <Actions>
                      <Danger onClick={() => removeItem(i.id)}>Remove</Danger>
                    </Actions>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontWeight: 700, color: '#2c3e50' }}>Total: ${total.toLocaleString()}</div>
            <Actions>
              <Danger onClick={clearCart}>Clear</Danger>
              <Primary onClick={checkoutAll}>Checkout All</Primary>
            </Actions>
          </div>
        </>
      )}
    </Container>
  );
};

export default Cart;

