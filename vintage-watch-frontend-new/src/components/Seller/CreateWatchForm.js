import React, { useState } from 'react';
import { watchAPI } from '../../services/api';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const FormContainer = styled.div`
  max-width: 600px;
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
    border-color: #3498db;
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
    border-color: #3498db;
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
    border-color: #3498db;
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
  background: linear-gradient(135deg, #27ae60 0%, #229954 100%);
  color: white;
`;

const CancelButton = styled(Button)`
  background: #95a5a6;
  color: white;
`;

const CreateWatchForm = ({ onWatchCreated, sellerId }) => {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: '',
    img: '',
    existing_status: true,
    description: '',
    year: '',
    condition: 'excellent'
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const watchData = {
        name: formData.name,
        brand: formData.brand,
        price: parseFloat(formData.price),
        img: formData.img,
        existing_status: formData.existing_status,
        seller_id: sellerId
      };

      const response = await watchAPI.create(watchData);
      onWatchCreated(response.data);
      
      // Reset form
      setFormData({
        name: '',
        brand: '',
        price: '',
        img: '',
        existing_status: true,
        description: '',
        year: '',
        condition: 'excellent'
      });
      
    } catch (error) {
      console.error('Error creating watch:', error);
      const detail = error.response?.data ? JSON.stringify(error.response.data) : error.message;
      toast.error(`Failed to create watch listing: ${detail}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <FormRow>
          <FormGroup>
            <Label htmlFor="name">Watch Name *</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g., Rolex Submariner"
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="brand">Brand *</Label>
            <Input
              type="text"
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
              placeholder="e.g., Rolex, Omega, Patek Philippe"
            />
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <Label htmlFor="year">Year</Label>
            <Input
              type="number"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              placeholder="e.g., 1965"
              min="1800"
              max={new Date().getFullYear()}
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="price">Price (USD) *</Label>
            <Input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              placeholder="0.00"
              min="0"
              step="0.01"
            />
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <Label htmlFor="condition">Condition</Label>
            <Select
              id="condition"
              name="condition"
              value={formData.condition}
              onChange={handleChange}
            >
              <option value="excellent">Excellent</option>
              <option value="very-good">Very Good</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
            </Select>
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="img">Image URL *</Label>
            <Input
              type="url"
              id="img"
              name="img"
              value={formData.img}
              onChange={handleChange}
              required
              placeholder="https://example.com/watch-image.jpg"
            />
          </FormGroup>
        </FormRow>

        <FormGroup>
          <Label htmlFor="description">Description</Label>
          <TextArea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the watch's history, features, and any notable characteristics..."
          />
        </FormGroup>

        <ButtonGroup>
          <CancelButton type="button" onClick={() => onWatchCreated(null)}>
            Cancel
          </CancelButton>
          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Listing'}
          </SubmitButton>
        </ButtonGroup>
      </Form>
    </FormContainer>
  );
};

export default CreateWatchForm;
