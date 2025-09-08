import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { watchAPI, appraisalAPI } from '../services/api';
import Loading from './Common/Loading';

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
  const [watch, setWatch] = useState(null);
  const [appraisals, setAppraisals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
      } catch (_) {}

      try {
        const watchId = Number(id);
        const [wRes, aRes] = await Promise.all([
          watchAPI.getById(watchId),
          appraisalAPI.getByWatch(watchId)
        ]);
        setWatch(wRes.data || null);
        setAppraisals(aRes.data || []);
      } catch (e) {
        // Fallback: try load all watches and find by id
        try {
          const watchId = Number(id);
          const all = await watchAPI.getAll();
          const found = (all.data || []).find(w => Number(w.id) === watchId);
          if (found) {
            setWatch(found);
            try { localStorage.setItem('watches_cache', JSON.stringify({ data: all.data || [], cachedAt: Date.now() })); } catch(_){}
          } else {
            setError('Watch not found');
          }
        } catch (e2) {
          setError('Unable to load watch details');
        }
        setAppraisals([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

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

  const formatPrice = (price) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);

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

          <Section>
            <SectionTitle>Description</SectionTitle>
            <div style={{ color: '#2c3e50' }}>
              {watch.description || 'No description provided.'}
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
                    {a.es_value !== undefined && (
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
        </div>
      </Grid>
    </Container>
  );
};

export default WatchDetails;



