import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { watchAPI, appraisalAPI, feedbackAPI, orderAPI, orderDetailAPI, transactionAPI } from '../services/api';
import Loading from './Common/Loading';
import Button from './UI/Button';
import { useAuth } from '../context/AuthContext';
import Modal from './UI/Modal';
import { Input, Select } from './UI/Input';
import { toast } from 'react-toastify';

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: start;
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Image = styled.img`
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.1);
`;

const Title = styled.h1`
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
`;

const Brand = styled.div`
  color: #7f8c8d;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const Price = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: #27ae60;
  margin-bottom: 1rem;
`;

const Section = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.08);
  padding: 1.5rem;
  margin-top: 1rem;
`;

const SectionTitle = styled.h3`
  margin: 0 0 1rem 0;
  color: #2c3e50;
`;

const WatchDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [watch, setWatch] = useState(null);
  const [appraisals, setAppraisals] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // purchase modal state
  const [openPurchase, setOpenPurchase] = useState(false);
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [method, setMethod] = useState('VNPAY');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const load = async () => {
      // Try local cache first (from Home/Appraiser pages)
      try {
        const raw = localStorage.getItem('watches_cache');
        if (raw) {
          const parsed = JSON.parse(raw);
          const cached = (parsed?.data || []).find(w => Number(w.id) === Number(id));
          if (cached) {
            setWatch(cached);
          }
        }
      } catch (_) { }

      try {
        const watchId = Number(id);
        // Helper: retry fetch N times for flaky endpoints
        const withRetry = async (fn, attempts = 2) => {
          let lastErr;
          for (let i = 0; i < attempts; i++) {
            try { return await fn(); } catch (e) { lastErr = e; }
          }
          throw lastErr;
        };

        const [wRes, aRes, fRes] = await Promise.all([
          withRetry(() => watchAPI.getById(watchId)),
          // appraisals: retry + fallback to cache by watch id
          withRetry(() => appraisalAPI.getByWatch(watchId)),
          feedbackAPI.getAll().catch(() => ({ data: [] }))
        ]);
        const watchData = Array.isArray(wRes.data) ? (wRes.data[0] || null) : (wRes.data?.data || wRes.data || null);
        setWatch(watchData);
        const appData = Array.isArray(aRes.data) ? aRes.data : (aRes.data?.data || aRes.data?.appraisals || []);
        setAppraisals(appData || []);
        try { localStorage.setItem(`appraisals_by_watch_${watchId}`, JSON.stringify({ data: appData, cachedAt: Date.now() })); } catch (_) {}
        const allFeedbacks = Array.isArray(fRes.data) ? fRes.data : (fRes.data?.data || []);
        const sellerId = watchData && (watchData.seller_id || watchData.sellerId);
        setFeedbacks((allFeedbacks || []).filter(f => Number(f.receiver_id) === Number(sellerId)));
      } catch (e) {
        // Fallback: try load all watches and find by id
        try {
          const watchId = Number(id);
          const all = await watchAPI.getAll();
          const allList = Array.isArray(all.data) ? all.data : (all.data?.data || []);
          const found = (allList || []).find(w => Number(w.id) === watchId);
          if (found) {
            setWatch(found);
            try { localStorage.setItem('watches_cache', JSON.stringify({ data: allList || [], cachedAt: Date.now() })); } catch (_) { }
          } else {
            setError('Watch not found');
          }
        } catch (e2) {
          setError('Unable to load watch details');
        }
        // Appraisals offline fallback by dedicated key
        try {
          const rawA = localStorage.getItem(`appraisals_by_watch_${id}`);
          const parsedA = rawA ? JSON.parse(rawA) : { data: [] };
          setAppraisals(parsedA.data || []);
        } catch (_) { setAppraisals([]); }
        // Feedbacks offline fallback (by seller_id)
        try {
          const rawF = localStorage.getItem('feedbacks_cache');
          const parsedF = rawF ? JSON.parse(rawF) : { data: [] };
          const sellerId = (watch && (watch.seller_id || watch.sellerId));
          const listF = (parsedF.data || []).filter(f => Number(f.receiver_id) === Number(sellerId));
          setFeedbacks(listF);
        } catch (_) {
          setFeedbacks([]);
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const formatPrice = (price) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);

  const startPurchase = () => {
    if (!user) { navigate('/login'); return; }
    if (user.role !== 'buyer') { toast.warn('Only buyers can purchase'); return; }
    setOpenPurchase(true);
  };

  const submitPurchase = async () => {
    if (!watch || !watch.id) return;
    if (!address.trim()) { toast.error('Please provide shipping address'); return; }
    setSubmitting(true);
    try {
      // 1) Create order
      const orderRes = await orderAPI.create({
        customer_id: user.id,
        address,
        amount: Number(watch.price || 0),
        status: 'pending'
      });
      const orderId = orderRes.data?.id;
      if (!orderId) throw new Error('Order creation failed');

      // 2) Add order detail
      await orderDetailAPI.create({
        order_id: orderId,
        watch_id: Number(watch.id),
        quantity: 1
      });

      // 3) Checkout (transaction + escrows)
      await transactionAPI.checkout(orderId);

      toast.success('Purchase initiated! Funds held in escrow until delivery.');
    } catch (e) {
      toast.error('Failed to process purchase. Please try again.');
    } finally {
      setSubmitting(false);
      setOpenPurchase(false);
    }
  };

  if (loading) return <Loading />;
  if (!watch) return (
    <Container>
      <Section>
        <SectionTitle>{error || 'Watch not found.'}</SectionTitle>
        <div style={{ marginTop: '0.5rem' }}>
          <a href="/">Go back to Home</a>
        </div>
      </Section>
    </Container>
  );

  return (
    <Container>
      <Grid>
        <div>
          {watch.img && watch.img !== 'Unknow' ? (
            <Image src={watch.img} alt={watch.name} />
          ) : (
            <Section>Image not available</Section>
          )}
        </div>
        <div>
          <Title>{watch.name}</Title>
          <Brand>{watch.brand}</Brand>
          <Price>{formatPrice(watch.price)}</Price>
          {user && user.role === 'buyer' && (
            <div style={{ margin: '12px 0' }}>
              <Button onClick={() => window.location.href = '/cart'} disabled={!watch || !watch.id}>Go to Cart to Checkout</Button>
            </div>
          )}

          <Section>
            <SectionTitle>Description</SectionTitle>
            <div style={{ color: '#2c3e50' }}>
              {(watch.description && String(watch.description).trim()) ? watch.description : 'No description provided.'}
            </div>
          </Section>

          <Section>
            <SectionTitle>Appraisals</SectionTitle>
            {appraisals.length === 0 ? (
              <div style={{ color: '#7f8c8d' }}>No appraisal data yet.</div>
            ) : (
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                {appraisals.map((a) => (
                  <div key={a.id} style={{ padding: '0.75rem', background: '#f8f9fa', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <strong>Status</strong>
                      <span style={{ color: a.status === 'completed' ? '#27ae60' : '#f39c12' }}>{a.status}</span>
                    </div>
                    {a.es_value !== undefined && a.es_value !== null && (
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Estimated Value</span>
                        <span>{formatPrice(a.es_value)}</span>
                      </div>
                    )}
                    {a.con_note && (
                      <div style={{ marginTop: '0.25rem', color: '#7f8c8d' }}>{a.con_note}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Section>

          <Section>
            <SectionTitle>Seller Reviews</SectionTitle>
            {feedbacks.length === 0 ? (
              <div style={{ color: '#7f8c8d' }}>No reviews yet.</div>
            ) : (
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                {feedbacks.map((fb) => (
                  <div key={fb.id} style={{ padding: '0.75rem', background: '#f8f9fa', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <strong>From User #{fb.sender_id}</strong>
                      <span style={{ color: '#7f8c8d' }}>{new Date(fb.created_at).toLocaleString()}</span>
                    </div>
                    <div style={{ color: '#2c3e50' }}>{fb.content}</div>
                  </div>
                ))}
              </div>
            )}
          </Section>
        </div>
      </Grid>

      {/* Purchase modal removed: checkout only via Cart */}
    </Container>
  );
};

export default WatchDetails;



