import React, { useMemo, useState, useEffect } from 'react';
import { appraisalAPI } from '../../services/api';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const FormContainer = styled.div`
  max-width: 800px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: #2c3e50;
`;

const Input = styled.input`
  padding: 12px;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #f39c12;
  }
`;

const Select = styled.select`
  padding: 12px;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 16px;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #f39c12;
  }
`;

const TextArea = styled.textarea`
  padding: 12px;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 16px;
  resize: vertical;
  min-height: 120px;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #f39c12;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const SubmitButton = styled(Button)`
  background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);
  color: white;
`;

const CancelButton = styled(Button)`
  background: #95a5a6;
  color: white;
`;

const WatchSelector = styled.div`
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const SearchRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 200px;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SuggestList = styled.div`
  background: #ffffff;
  border: 1px solid #e1e8ed;
  border-radius: 6px;
  max-height: 220px;
  overflow: auto;
`;

const SuggestItem = styled.div`
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover { background: #f2f4f6; }
`;

const WatchOption = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border: 1px solid #e1e8ed;
  border-radius: 6px;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #e9ecef;
  }
  
  &.selected {
    background-color: #fff3cd;
    border-color: #f39c12;
  }
`;

const AppraisalForm = ({ onAppraisalCreated, appraiserId, watches, selectedWatch }) => {
  const [formData, setFormData] = useState({
    watch_id: selectedWatch?.id || '',
    estimated_value: '',
    condition_rating: '',
    authenticity_verified: false,
    details: '',
    recommendations: '',
    status: 'pending'
  });
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(10);
  const [brandFilter, setBrandFilter] = useState('');

  const MAX_ESTIMATED = 100000000; // 100M USD hard cap to avoid accidental huge values

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'estimated_value') {
      let num = parseFloat(String(value).replace(/[^0-9.]/g, ''));
      if (Number.isNaN(num)) num = 0;
      if (num > MAX_ESTIMATED) {
        num = MAX_ESTIMATED;
        try { toast.info(`Capped estimated value at $${MAX_ESTIMATED.toLocaleString()}`); } catch (_) {}
      }
      return setFormData(prev => ({ ...prev, estimated_value: String(num) }));
    }
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleWatchSelect = (watch) => {
    setFormData(prev => ({
      ...prev,
      watch_id: watch.id
    }));
  };

  // Debounced filtered suggestions
  const filteredWatches = useMemo(() => {
    const q = query.trim().toLowerCase();
    const b = brandFilter.trim().toLowerCase();
    const list = (watches || []).filter(w => w && (w.existing_status !== false));
    const matched = list.filter(w => {
      const name = (w.name || '').toLowerCase();
      const brand = (w.brand || '').toLowerCase();
      const byQuery = !q || name.includes(q) || brand.includes(q) || String(w.id).includes(q) || String(w.seller_id || '').includes(q);
      const byBrand = !b || brand.includes(b);
      return byQuery && byBrand;
    });
    return matched.slice(0, Math.max(1, limit));
  }, [watches, query, brandFilter, limit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.watch_id) {
        toast.error('Please select a watch to appraise');
        setLoading(false);
        return;
      }

      // Map frontend fields to backend schema
      const normalizedAppraiserId = Number(appraiserId ?? 0);
      if (!Number.isFinite(normalizedAppraiserId) || normalizedAppraiserId <= 0) {
        toast.error('Invalid appraiser id. Please re-login.');
        setLoading(false);
        return;
      }

      const appraisalData = {
        appraiser_id: normalizedAppraiserId,
        watch_id: parseInt(formData.watch_id),
        es_value: parseFloat(formData.estimated_value),
        auth: !!formData.authenticity_verified,
        con_note: formData.details || formData.recommendations || '',
        status: formData.status
      };

      const response = await appraisalAPI.create(appraisalData);
      onAppraisalCreated(response.data);
      
      // Reset form
      setFormData({
        watch_id: '',
        estimated_value: '',
        condition_rating: '',
        authenticity_verified: false,
        details: '',
        recommendations: '',
        status: 'pending'
      });
      
    } catch (error) {
      console.error('Error creating appraisal:', error);
      const detail = error.response?.data ? JSON.stringify(error.response.data) : error.message;
      toast.error(`Failed to create appraisal: ${detail}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Select Watch to Appraise</Label>
          <WatchSelector>
            <SearchRow>
              <Input
                type="text"
                placeholder="Search by name, brand, ID, seller..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Filter brand..."
                value={brandFilter}
                onChange={(e) => setBrandFilter(e.target.value)}
              />
            </SearchRow>
            {filteredWatches && filteredWatches.length > 0 ? (
              <SuggestList>
                {filteredWatches.map(watch => (
                  <SuggestItem key={watch.id} onClick={() => handleWatchSelect(watch)}>
                    <div>
                      <strong>#{watch.id}</strong> — {watch.brand} {watch.name}
                      <div style={{ fontSize: '0.85rem', color: '#7f8c8d' }}>Seller: {watch.seller_id}</div>
                    </div>
                    <div style={{ fontWeight: 600, color: '#27ae60' }}>${watch.price?.toLocaleString?.() || watch.price}</div>
                  </SuggestItem>
                ))}
              </SuggestList>
            ) : (
              <div style={{ color: '#7f8c8d' }}>No matching watches.</div>
            )}

            {formData.watch_id && (
              <div style={{ marginTop: '0.5rem', color: '#2c3e50' }}>
                Selected watch ID: <strong>{formData.watch_id}</strong>
              </div>
            )}
          </WatchSelector>
        </FormGroup>

        <FormRow>
          <FormGroup>
            <Label htmlFor="estimated_value">Estimated Value (USD) *</Label>
            <Input
              type="number"
              id="estimated_value"
              name="estimated_value"
              value={formData.estimated_value}
              onChange={handleChange}
              required
              placeholder="0.00"
              min="0"
              max={MAX_ESTIMATED}
              step="0.01"
            />
            <div style={{ fontSize: '0.85rem', color: '#7f8c8d' }}>
              Max {MAX_ESTIMATED.toLocaleString()} USD to prevent accidental huge numbers.
            </div>
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="condition_rating">Condition Rating (1-10) *</Label>
            <Select
              id="condition_rating"
              name="condition_rating"
              value={formData.condition_rating}
              onChange={handleChange}
              required
            >
              <option value="">Select rating</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(rating => (
                <option key={rating} value={rating}>
                  {rating} - {rating <= 3 ? 'Poor' : rating <= 6 ? 'Fair' : rating <= 8 ? 'Good' : 'Excellent'}
                </option>
              ))}
            </Select>
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <Label htmlFor="status">Appraisal Status</Label>
            <Select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="pending">Pending Review</option>
              <option value="completed">Completed</option>
              <option value="requires_inspection">Requires Physical Inspection</option>
            </Select>
          </FormGroup>
          
          <FormGroup>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
              <input
                type="checkbox"
                id="authenticity_verified"
                name="authenticity_verified"
                checked={formData.authenticity_verified}
                onChange={handleChange}
              />
              <Label htmlFor="authenticity_verified" style={{ margin: 0 }}>
                Authenticity Verified
              </Label>
            </div>
          </FormGroup>
        </FormRow>

        <FormGroup>
          <Label htmlFor="details">Detailed Assessment *</Label>
          <TextArea
            id="details"
            name="details"
            value={formData.details}
            onChange={handleChange}
            required
            placeholder="Provide detailed assessment of the watch including movement, case, dial, hands, crown, and overall condition..."
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="recommendations">Recommendations</Label>
          <TextArea
            id="recommendations"
            name="recommendations"
            value={formData.recommendations}
            onChange={handleChange}
            placeholder="Any recommendations for the seller or buyer regarding this watch..."
          />
        </FormGroup>

        <ButtonGroup>
          <CancelButton type="button" onClick={() => onAppraisalCreated(null)}>
            Cancel
          </CancelButton>
          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Appraisal'}
          </SubmitButton>
        </ButtonGroup>
      </Form>
    </FormContainer>
  );
};

export default AppraisalForm;
