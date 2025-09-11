import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Card from '../UI/Card';
import Button from '../UI/Button';
import { Select } from '../UI/Input';
import { orderAPI, orderDetailAPI, transactionAPI } from '../../services/api';
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
        if (!init.watch_id || !init.buyer_id || !init.amount) {
            toast.error('Missing order information');
            return;
        }
        setLoading(true);
        try {
            // 1) Create order
            const orderRes = await orderAPI.create({
                customer_id: init.buyer_id,
                address: init.shipping_address || 'Direct checkout',
                amount: init.amount,
                status: 'pending'
            });
            const orderId = orderRes.data?.id;
            if (!orderId) throw new Error('Order creation failed');

            // 2) Add order detail
            await orderDetailAPI.create({
                order_id: orderId,
                watch_id: init.watch_id,
                quantity: 1
            });

            // 3) Checkout (creates transaction and escrows)
            await transactionAPI.checkout(orderId);

            toast.success('Checkout created. Funds held in escrow.');
            navigate('/');
        } catch (e) {
            console.error(e);
            toast.error('Checkout failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Wrapper>
            <Card title="Checkout Disabled">
                <div style={{ color: '#334155' }}>
                    Vui lòng thanh toán qua giỏ hàng. Tính năng checkout đơn lẻ đã được tắt.
                </div>
                <div style={{ height: 16 }} />
                <Button onClick={() => navigate('/cart')}>Go to Cart</Button>
            </Card>
        </Wrapper>
    );
};

export default CheckoutPage;
