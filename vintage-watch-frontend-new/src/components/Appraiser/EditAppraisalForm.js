import React, { useState } from 'react';
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

const WatchInfo = styled.div`
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const EditAppraisalForm = ({ appraisal, watch, onAppraisalUpdated, onClose }) => {
  const [formData, setFormData] = useState({
    estimated_value: appraisal.estimated_value || '',
    condition_rating: appraisal.condition_rating || '',
    authenticity_verified: appraisal.authenticity_verified || false,
    details: appraisal.details || '',
    recommendations: appraisal.recommendations || '',
    status: appraisal.status || 'pending'
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'estimated_value') {
      let num = parseFloat(String(value).replace(/[^0-9.]/g, ''));
      if (Number.isNaN(num)) num = 0;
      return setFormData(prev => ({ ...prev, estimated_value: String(num) }));
    }
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Map to backend fields
      const appraisalData = {
        es_value: parseFloat(formData.estimated_value),
        status: formData.status,
        auth: !!formData.authenticity_verified,
        con_note: formData.details || formData.recommendations || '',
      };

      const response = await appraisalAPI.update(appraisal.id, appraisalData);
      onAppraisalUpdated(response.data);
      onClose();
      toast.success('Appraisal updated successfully!');
      
    } catch (error) {
      console.error('Error updating appraisal:', error);
      toast.error('Failed to update appraisal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      <WatchInfo>
        <h3 style={{ margin: '0 0 0.5rem 0', color: '#2c3e50' }}>
          {watch ? `${watch.brand} ${watch.name}` : 'Unknown Watch'}
        </h3>
        <p style={{ margin: '0', color: '#7f8c8d' }}>
          Watch ID: {appraisal.watch_id} | Appraisal ID: {appraisal.id}
        </p>
      </WatchInfo>

      <Form onSubmit={handleSubmit}>
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
              step="0.01"
            />
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
          <CancelButton type="button" onClick={onClose}>
            Cancel
          </CancelButton>
          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update Appraisal'}
          </SubmitButton>
        </ButtonGroup>
      </Form>
    </FormContainer>
  );
};

export default EditAppraisalForm;
