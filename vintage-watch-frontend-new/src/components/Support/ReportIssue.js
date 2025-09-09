import React, { useState } from 'react';
import styled from 'styled-components';
import { feedbackAPI } from '../../services/api';
import { toast } from 'react-toastify';

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.08);
  padding: 1.5rem;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
  @media (max-width: 900px) { grid-template-columns: 1fr; }
`;

const Label = styled.label`
  font-weight: 600;
  color: #2c3e50;
`;

const Input = styled.input`
  padding: 12px;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
`;

const Select = styled.select`
  padding: 12px;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
`;

const TextArea = styled.textarea`
  padding: 12px;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  min-height: 150px;
`;

const Button = styled.button`
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
`;

const ReportIssue = () => {
  const [form, setForm] = useState({
    category: 'transaction',
    subject: '',
    description: '',
    contact_email: ''
  });
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      // Map to existing feedback endpoint
      // Backend requires: sender_id, receiver_id, content
      // Use current user as sender. Route to support agent (receiver_id=1 by default) – adjust if needed.
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const payload = {
        sender_id: user.id || 0,
        receiver_id: 1,
        content: `[${form.category}] ${form.subject}\n${form.description}\nContact: ${form.contact_email}`,
      };
      await feedbackAPI.create(payload);
      toast.success('Report submitted. Our support team will contact you soon.');
      setForm({ category: 'transaction', subject: '', description: '', contact_email: '' });
    } catch (err) {
      const msg = err.response?.data ? JSON.stringify(err.response.data) : err.message;
      toast.error(`Failed to send report: ${msg}`);
    } finally {
      setSending(false);
    }
  };

  return (
    <Container>
      <Title>Report an Issue</Title>
      <Card>
        <form onSubmit={handleSubmit}>
          <Row>
            <div>
              <Label>Category</Label>
              <Select name="category" value={form.category} onChange={handleChange}>
                <option value="transaction">Transaction</option>
                <option value="account">Account</option>
                <option value="listing">Listing</option>
                <option value="other">Other</option>
              </Select>
            </div>
            <div>
              <Label>Subject</Label>
              <Input name="subject" value={form.subject} onChange={handleChange} placeholder="Short summary" required />
            </div>
          </Row>

          <div style={{ marginBottom: '1rem' }}>
            <Label>Description</Label>
            <TextArea name="description" value={form.description} onChange={handleChange} placeholder="Describe the issue in detail..." required />
          </div>

          <Row>
            <div>
              <Label>Contact Email</Label>
              <Input name="contact_email" type="email" value={form.contact_email} onChange={handleChange} placeholder="you@example.com" required />
            </div>
          </Row>

          <Button type="submit" disabled={sending}>{sending ? 'Sending...' : 'Submit Report'}</Button>
        </form>
      </Card>
    </Container>
  );
};

export default ReportIssue;
 
 
