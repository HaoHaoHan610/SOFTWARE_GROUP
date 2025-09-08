import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { watchAPI } from '../services/api';
import Loading from './Common/Loading';
import WatchCard from './Buyer/WatchCard';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: #2c3e50;
  margin: 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: #7f8c8d;
`;

const Home = () => {
  const [watches, setWatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errored, setErrored] = useState(false);
  const [errorDetail, setErrorDetail] = useState('');
  const [fromCache, setFromCache] = useState(false);

  const fetchWatches = async () => {
    setLoading(true);
    setErrored(false);
    try {
      const response = await watchAPI.getAll();
      setWatches(response.data || []);
      setErrorDetail('');
      setFromCache(false);
      try {
        localStorage.setItem('watches_cache', JSON.stringify({
          data: response.data || [],
          cachedAt: Date.now()
        }));
      } catch (_) {}
    } catch (e1) {
      // Thử lại với 127.0.0.1 đề phòng lỗi name resolution/CORS
      try {
        const alt = await fetch('http://127.0.0.1:5000/watches/all', {
          headers: { 'Content-Type': 'application/json' },
          method: 'GET'
        });
        if (alt.ok) {
          const data = await alt.json();
          setWatches(data || []);
          setErrored(false);
          setErrorDetail('');
          setFromCache(false);
          try {
            localStorage.setItem('watches_cache', JSON.stringify({ data: data || [], cachedAt: Date.now() }));
          } catch (_) {}
        } else {
          setErrored(true);
          setErrorDetail(`HTTP ${alt.status}`);
          setWatches([]);
        }
      } catch (e2) {
        setErrored(true);
        const msg = e1?.response?.status
          ? `HTTP ${e1.response.status}`
          : (e1?.message || 'Network error');
        setErrorDetail(msg);
        // Thử dùng cache để hiển thị tạm thời
        try {
          const raw = localStorage.getItem('watches_cache');
          if (raw) {
            const parsed = JSON.parse(raw);
            setWatches(parsed?.data || []);
            setFromCache(true);
          } else {
            setWatches([]);
            setFromCache(false);
          }
        } catch (_) {
          setWatches([]);
          setFromCache(false);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        await fetchWatches();
      } catch (e) {
        // handled in fetchWatches
      } finally {
        // loading handled in fetchWatches
      }
    };
    init();
  }, []);

  if (loading) return <Loading />;

  return (
    <Container>
      <Header>
        <Title>Explore Vintage Watches</Title>
      </Header>

      {(errored || fromCache) && (
        <div style={{
          background: '#fff3cd',
          color: '#856404',
          border: '1px solid #ffeeba',
          padding: '12px 16px',
          borderRadius: '8px',
          marginBottom: '16px'
        }}>
          {fromCache
            ? `Không thể kết nối server${errorDetail ? ` (${errorDetail})` : ''}. Đang hiển thị dữ liệu tạm thời (cache).`
            : `Không thể tải danh sách đồng hồ từ máy chủ${errorDetail ? `: ${errorDetail}` : ''}.`}
          <button onClick={fetchWatches} style={{
            marginLeft: '12px',
            padding: '6px 12px',
            border: 'none',
            borderRadius: '6px',
            background: '#3498db',
            color: 'white',
            cursor: 'pointer'
          }}>Retry</button>
          {fromCache && (
            <button onClick={() => { localStorage.removeItem('watches_cache'); setFromCache(false); }} style={{
              marginLeft: '8px',
              padding: '6px 12px',
              border: 'none',
              borderRadius: '6px',
              background: '#6c757d',
              color: 'white',
              cursor: 'pointer'
            }}>Clear cache</button>
          )}
        </div>
      )}

      {watches.length === 0 ? (
        <EmptyState>
          {errored ? 'Could not load watches from the server. Showing nothing for now.' : 'No watches available yet.'}
        </EmptyState>
      ) : (
        <Grid>
          {watches.map(watch => (
            <WatchCard key={watch.id} watch={watch} onPurchase={() => {}} />
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Home;
 
 
