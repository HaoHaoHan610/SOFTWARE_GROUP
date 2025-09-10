import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from '../UI/Card';
import Button from '../UI/Button';
import { paymentAPI } from '../../services/api';

const Wrapper = styled.div`
  max-width: 720px; margin: 0 auto; padding: 24px;
`;

const StatusText = styled.div`
  font-weight: 800; font-size: 18px;
`;

const PaymentReturn = () => {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const id = sessionStorage.getItem('last_order_id');
        if (!id) { setError('Missing order id'); setLoading(false); return; }

        let alive = true;
        const poll = async (attempt = 0) => {
            try {
                const res = await paymentAPI.getOrder(id);
                const data = res.data || {};
                if (!alive) return;
                setOrder(data);
                if (['PAID', 'FAILED', 'CANCELLED'].includes(data.status)) {
                    setLoading(false);
                } else if (attempt < 12) {
                    setTimeout(() => poll(attempt + 1), 2500);
                } else {
                    setLoading(false);
                }
            } catch (e) {
                if (!alive) return;
                setError('Unable to fetch order status');
                setLoading(false);
            }
        };

        poll();
        return () => { alive = false; };
    }, []);

    if (loading) return (
        <Wrapper>
            <Card title="Processing Payment">
                <div>Waiting for confirmation...</div>
            </Card>
        </Wrapper>
    );

    if (error) return (
        <Wrapper>
            <Card title="Payment Error">
                <div style={{ color: '#ef4444' }}>{error}</div>
            </Card>
        </Wrapper>
    );

    const format = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n || 0);

    return (
        <Wrapper>
            <Card title={order?.status === 'PAID' ? 'Receipt' : 'Payment Result'}>
                <StatusText>
                    Status: {order?.status || '-'}
                </StatusText>
                <div style={{ marginTop: 8 }}>Order ID: {order?.id}</div>
                <div>Amount: {format(order?.amount)}</div>
                <div style={{ marginTop: 16 }}>
                    <Button onClick={() => window.location.href = '/buyer'}>Back to Dashboard</Button>
                </div>
            </Card>
        </Wrapper>
    );
};

export default PaymentReturn;
