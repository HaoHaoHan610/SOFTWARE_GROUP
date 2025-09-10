import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Card from '../UI/Card';
import Button from '../UI/Button';
import { Select } from '../UI/Input';
import { paymentAPI } from '../../services/api';
import { toast } from 'react-toastify';

const Wrapper = styled.div`
  max-width: 800px; margin: 0 auto; padding: 24px;
`;

const Row = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
  @media (max-width: 768px){ grid-template-columns: 1fr; }
`;

const CheckoutPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const init = location.state || {};
    const [method, setMethod] = useState('VNPAY');
    const [loading, setLoading] = useState(false);

    const handlePay = async () => {
        if (!init.watch_id || !init.buyer_id) {
            toast.error('Missing order information');
            return;
        }
        setLoading(true);
        try {
            const res = await paymentAPI.createOrder({
                watch_id: init.watch_id,
                buyer_id: init.buyer_id,
                payment_method: method
            });
            const data = res.data || {};
            if (data.payment_url && data.order_id) {
                // Save local hint for return page
                sessionStorage.setItem('last_order_id', String(data.order_id));
                // Save to local tx history (pending)
                try {
                    const raw = localStorage.getItem('tx_history');
                    const arr = raw ? JSON.parse(raw) : [];
                    arr.push({ id: data.order_id, status: data.status || 'PENDING', amount: init.amount, buyer_id: init.buyer_id });
                    localStorage.setItem('tx_history', JSON.stringify(arr));
                } catch (_) { }
                window.location.href = data.payment_url;
            } else {
                toast.error('Invalid response from payment gateway');
            }
        } catch (e) {
            console.error(e);
            // Offline/local: store as pending to MyOrders
            try {
                const raw = localStorage.getItem('tx_history');
                const arr = raw ? JSON.parse(raw) : [];
                arr.push({ id: Date.now(), status: 'PENDING', amount: init.amount, buyer_id: init.buyer_id });
                localStorage.setItem('tx_history', JSON.stringify(arr));
            } catch (_) { }
            toast.error('Failed to create payment session');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Wrapper>
            <Card title="Checkout">
                <Row>
                    <div>
                        <div style={{ color: '#64748b', marginBottom: 8 }}>Watch ID</div>
                        <div style={{ fontWeight: 800 }}>{init.watch_id || '-'}</div>
                    </div>
                    <div>
                        <div style={{ color: '#64748b', marginBottom: 8 }}>Amount</div>
                        <div style={{ fontWeight: 800 }}>{init.amount ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(init.amount) : '-'}</div>
                    </div>
                </Row>
                <div style={{ height: 16 }} />
                <Select label="Payment Method" value={method} onChange={(e) => setMethod(e.target.value)}>
                    <option value="VNPAY">VNPay</option>
                    <option value="MOMO">MoMo</option>
                    <option value="PAYPAL">PayPal</option>
                    <option value="CARD">Credit/Debit Card</option>
                </Select>
                <div style={{ height: 16 }} />
                <Button onClick={handlePay} disabled={loading}>
                    {loading ? 'Processing...' : 'Pay Now'}
                </Button>
            </Card>
        </Wrapper>
    );
};

export default CheckoutPage;
