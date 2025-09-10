import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { feedbackAPI } from '../../services/api';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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

const RatingContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const StarButton = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: ${props => props.filled ? '#f39c12' : '#e1e8ed'};
  transition: color 0.2s ease;
  
  &:hover {
    color: #f39c12;
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  color: white;
  border: none;
  padding: 14px 24px;
  border-radius: 8px;
  font-size: 16px;
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

const InfoBox = styled.div`
  background-color: #e3f2fd;
  border: 1px solid #bbdefb;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
`;

const InfoTitle = styled.h4`
  color: #1976d2;
  margin: 0 0 0.5rem 0;
`;

const InfoText = styled.p`
  color: #1976d2;
  margin: 0;
  font-size: 0.9rem;
`;

const FeedbackForm = ({ onFeedbackSubmitted }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    subject: '',
    category: 'general',
    rating: 0,
    message: '',
    order_id: '',
    agent_id: null
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Backend sẽ broadcast tới tất cả agent nếu không truyền receiver_id/agent_id
      const payload = {
        sender_id: user?.id,
        receiver_id: formData.agent_id || undefined,
        content: `[${formData.category}] ${formData.subject}\n${formData.message}${formData.order_id ? `\nOrder: #${formData.order_id}` : ''}`
      };

      await feedbackAPI.create(payload);
      onFeedbackSubmitted();
      
      // Reset form
      setFormData({
        subject: '',
        category: 'general',
        rating: 0,
        message: '',
        order_id: '',
        agent_id: null
      });
      
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('Failed to submit feedback. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map(star => (
      <StarButton
        key={star}
        type="button"
        filled={star <= formData.rating}
        onClick={() => handleRatingChange(star)}
      >
        ★
      </StarButton>
    ));
  };

  return (
    <FormContainer>
      <InfoBox>
        <InfoTitle>💬 We Value Your Feedback</InfoTitle>
        <InfoText>
          Your feedback helps us improve our service. Whether you have a question, 
          suggestion, or concern, we're here to help. Our customer support team 
          will review your feedback and respond promptly.
        </InfoText>
      </InfoBox>

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="subject">Subject *</Label>
          <Input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            placeholder="Brief description of your feedback"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="category">Category *</Label>
          <Select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="general">General Inquiry</option>
            <option value="order">Order Related</option>
            <option value="product">Product Question</option>
            <option value="shipping">Shipping & Delivery</option>
            <option value="payment">Payment Issue</option>
            <option value="appraisal">Appraisal Service</option>
            <option value="technical">Technical Support</option>
            <option value="complaint">Complaint</option>
            <option value="suggestion">Suggestion</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Overall Rating</Label>
          <RatingContainer>
            {renderStars()}
            <span style={{ marginLeft: '1rem', color: '#7f8c8d' }}>
              {formData.rating > 0 ? `${formData.rating} star${formData.rating > 1 ? 's' : ''}` : 'No rating'}
            </span>
          </RatingContainer>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="order_id">Order ID (if applicable)</Label>
          <Input
            type="text"
            id="order_id"
            name="order_id"
            value={formData.order_id}
            onChange={handleChange}
            placeholder="Enter order number if this feedback relates to a specific order"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="message">Message *</Label>
          <TextArea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Please provide detailed information about your feedback, question, or concern..."
          />
        </FormGroup>

        <Button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Feedback'}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default FeedbackForm;
