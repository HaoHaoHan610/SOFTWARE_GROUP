import React, { useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const SupportTicketsContainer = styled.div`
  max-width: 100%;
`;

const TicketCard = styled.div`
  background: white;
  border: 1px solid #e1e8ed;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  transition: box-shadow 0.2s ease;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const TicketHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const TicketInfo = styled.div`
  flex: 1;
`;

const TicketTitle = styled.h3`
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
`;

const TicketMeta = styled.div`
  display: flex;
  gap: 1rem;
  color: #7f8c8d;
  font-size: 0.9rem;
  flex-wrap: wrap;
`;

const PriorityBadge = styled.div`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  background-color: ${props => {
    switch (props.priority) {
      case 'high': return '#f8d7da';
      case 'medium': return '#fff3cd';
      case 'low': return '#d4edda';
      default: return '#e2e3e5';
    }
  }};
  color: ${props => {
    switch (props.priority) {
      case 'high': return '#721c24';
      case 'medium': return '#856404';
      case 'low': return '#155724';
      default: return '#383d41';
    }
  }};
`;

const StatusBadge = styled.div`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  background-color: ${props => {
    switch (props.status) {
      case 'open': return '#fff3cd';
      case 'in_progress': return '#cce5ff';
      case 'resolved': return '#d4edda';
      case 'closed': return '#e2e3e5';
      default: return '#f8d7da';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'open': return '#856404';
      case 'in_progress': return '#004085';
      case 'resolved': return '#155724';
      case 'closed': return '#383d41';
      default: return '#721c24';
    }
  }};
`;

const TicketContent = styled.div`
  margin-bottom: 1rem;
`;

const TicketDescription = styled.p`
  color: #2c3e50;
  margin: 0 0 1rem 0;
  line-height: 1.6;
`;

const TicketDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const DetailLabel = styled.span`
  font-size: 0.8rem;
  color: #7f8c8d;
  font-weight: 500;
  text-transform: uppercase;
`;

const DetailValue = styled.span`
  font-weight: 600;
  color: #2c3e50;
`;

const TicketActions = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
  
  &:hover {
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ViewButton = styled(ActionButton)`
  background-color: #3498db;
  color: white;
  
  &:hover {
    background-color: #2980b9;
  }
`;

const AssignButton = styled(ActionButton)`
  background-color: #e67e22;
  color: white;
  
  &:hover {
    background-color: #d35400;
  }
`;

const ResolveButton = styled(ActionButton)`
  background-color: #27ae60;
  color: white;
  
  &:hover {
    background-color: #229954;
  }
`;

const CloseButton = styled(ActionButton)`
  background-color: #95a5a6;
  color: white;
  
  &:hover {
    background-color: #7f8c8d;
  }
`;

const CreateTicketButton = styled.button`
  background: linear-gradient(135deg, #e67e22 0%, #d35400 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease;
  margin-bottom: 2rem;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #7f8c8d;
  
  h3 {
    margin-bottom: 1rem;
    color: #2c3e50;
  }
`;

const SupportTickets = () => {
  // Mock data for demonstration
  const [tickets] = useState([
    {
      id: 1,
      title: 'Order #1234 - Shipping Delay',
      description: 'Customer is reporting that their order has been delayed and they need an update on the shipping status.',
      priority: 'high',
      status: 'open',
      customer_id: 456,
      order_id: 1234,
      created_at: '2024-01-15T10:30:00Z',
      assigned_to: null,
      category: 'shipping'
    },
    {
      id: 2,
      title: 'Payment Issue - Transaction Failed',
      description: 'Customer is unable to complete payment for their order. They are getting an error message.',
      priority: 'high',
      status: 'in_progress',
      customer_id: 789,
      order_id: 1235,
      created_at: '2024-01-15T09:15:00Z',
      assigned_to: 'Agent Smith',
      category: 'payment'
    },
    {
      id: 3,
      title: 'Watch Authentication Question',
      description: 'Customer wants to know more about the authentication process for a vintage Rolex they are interested in purchasing.',
      priority: 'medium',
      status: 'resolved',
      customer_id: 321,
      order_id: null,
      created_at: '2024-01-14T16:45:00Z',
      assigned_to: 'Agent Johnson',
      category: 'product'
    },
    {
      id: 4,
      title: 'Appraisal Service Inquiry',
      description: 'Seller wants to know how to request an appraisal for their vintage watch collection.',
      priority: 'low',
      status: 'closed',
      customer_id: 654,
      order_id: null,
      created_at: '2024-01-14T14:20:00Z',
      assigned_to: 'Agent Brown',
      category: 'appraisal'
    }
  ]);

  const handleStatusUpdate = (ticketId, newStatus) => {
    toast.success(`Ticket #${ticketId} status updated to ${newStatus}`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <SupportTicketsContainer>
      <CreateTicketButton onClick={() => toast.info('Create ticket functionality would be implemented here')}>
        + Create New Ticket
      </CreateTicketButton>

      {tickets.length === 0 ? (
        <EmptyState>
          <h3>No support tickets found</h3>
          <p>No support tickets are currently open.</p>
        </EmptyState>
      ) : (
        tickets.map(ticket => (
          <TicketCard key={ticket.id}>
            <TicketHeader>
              <TicketInfo>
                <TicketTitle>{ticket.title}</TicketTitle>
                <TicketMeta>
                  <span>Customer: #{ticket.customer_id}</span>
                  <span>Category: {ticket.category}</span>
                  <span>{formatDate(ticket.created_at)}</span>
                  {ticket.order_id && <span>Order: #{ticket.order_id}</span>}
                </TicketMeta>
              </TicketInfo>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <PriorityBadge priority={ticket.priority}>
                  {ticket.priority}
                </PriorityBadge>
                <StatusBadge status={ticket.status}>
                  {ticket.status}
                </StatusBadge>
              </div>
            </TicketHeader>

            <TicketContent>
              <TicketDescription>{ticket.description}</TicketDescription>
              
              <TicketDetails>
                <DetailItem>
                  <DetailLabel>Assigned To</DetailLabel>
                  <DetailValue>
                    {ticket.assigned_to || 'Unassigned'}
                  </DetailValue>
                </DetailItem>
                
                <DetailItem>
                  <DetailLabel>Priority</DetailLabel>
                  <DetailValue style={{ textTransform: 'capitalize' }}>
                    {ticket.priority}
                  </DetailValue>
                </DetailItem>
                
                <DetailItem>
                  <DetailLabel>Category</DetailLabel>
                  <DetailValue style={{ textTransform: 'capitalize' }}>
                    {ticket.category}
                  </DetailValue>
                </DetailItem>
                
                <DetailItem>
                  <DetailLabel>Created</DetailLabel>
                  <DetailValue>{formatDate(ticket.created_at)}</DetailValue>
                </DetailItem>
              </TicketDetails>
            </TicketContent>

            <TicketActions>
              <ViewButton onClick={() => toast.info('View ticket details functionality would be implemented here')}>
                View Details
              </ViewButton>
              
              {!ticket.assigned_to && (
                <AssignButton onClick={() => toast.info('Assign ticket functionality would be implemented here')}>
                  Assign to Me
                </AssignButton>
              )}
              
              {ticket.status === 'open' && (
                <ResolveButton onClick={() => handleStatusUpdate(ticket.id, 'in_progress')}>
                  Start Working
                </ResolveButton>
              )}
              
              {ticket.status === 'in_progress' && (
                <ResolveButton onClick={() => handleStatusUpdate(ticket.id, 'resolved')}>
                  Mark Resolved
                </ResolveButton>
              )}
              
              {ticket.status === 'resolved' && (
                <CloseButton onClick={() => handleStatusUpdate(ticket.id, 'closed')}>
                  Close Ticket
                </CloseButton>
              )}
            </TicketActions>
          </TicketCard>
        ))
      )}
    </SupportTicketsContainer>
  );
};

export default SupportTickets;
