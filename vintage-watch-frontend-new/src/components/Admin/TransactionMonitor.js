import React, { useState, useEffect } from 'react';
import { transactionAPI, orderAPI } from '../../services/api';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const TransactionMonitorContainer = styled.div`
  max-width: 100%;
`;

const TransactionCard = styled.div`
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

const TransactionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const TransactionInfo = styled.div`
  flex: 1;
`;

const TransactionId = styled.h3`
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
`;

const TransactionDate = styled.p`
  color: #7f8c8d;
  margin: 0;
  font-size: 0.9rem;
`;

const StatusBadge = styled.div`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  background-color: ${props => {
    switch (props.status) {
      case 'completed': return '#d4edda';
      case 'pending': return '#fff3cd';
      case 'failed': return '#f8d7da';
      case 'cancelled': return '#e2e3e5';
      default: return '#cce5ff';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'completed': return '#155724';
      case 'pending': return '#856404';
      case 'failed': return '#721c24';
      case 'cancelled': return '#383d41';
      default: return '#004085';
    }
  }};
`;

const TransactionDetails = styled.div`
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

const TransactionActions = styled.div`
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

const ApproveButton = styled(ActionButton)`
  background-color: #27ae60;
  color: white;
  
  &:hover {
    background-color: #229954;
  }
`;

const RejectButton = styled(ActionButton)`
  background-color: #e74c3c;
  color: white;
  
  &:hover {
    background-color: #c0392b;
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

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const FilterSelect = styled.select`
  padding: 8px 12px;
  border: 2px solid #e1e8ed;
  border-radius: 6px;
  font-size: 14px;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #9b59b6;
  }
`;

const TransactionMonitor = () => {
  const [transactions, setTransactions] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchTransactionData();
  }, []);

  const fetchTransactionData = async () => {
    try {
      setLoading(true);
      const [transactionsResponse, ordersResponse] = await Promise.all([
        transactionAPI.getAll(),
        orderAPI.getAll()
      ]);
      
      setTransactions(transactionsResponse.data || []);
      setOrders(ordersResponse.data || []);
    } catch (error) {
      console.error('Error fetching transaction data:', error);
      toast.error('Failed to load transaction data');
    } finally {
      setLoading(false);
    }
  };

  const getOrderById = (orderId) => {
    return orders.find(order => order.id === orderId);
  };

  const filteredTransactions = transactions.filter(transaction => {
    if (statusFilter === 'all') return true;
    return transaction.status === statusFilter;
  });

  const handleApproveTransaction = async (transactionId) => {
    try {
      // Update transaction status to approved
      const updatedTransaction = {
        ...transactions.find(t => t.id === transactionId),
        status: 'completed'
      };
      
      await transactionAPI.update(transactionId, updatedTransaction);
      setTransactions(transactions.map(t => 
        t.id === transactionId ? updatedTransaction : t
      ));
      toast.success('Transaction approved successfully');
    } catch (error) {
      console.error('Error approving transaction:', error);
      toast.error('Failed to approve transaction');
    }
  };

  const handleRejectTransaction = async (transactionId) => {
    if (!window.confirm('Are you sure you want to reject this transaction?')) {
      return;
    }

    try {
      const updatedTransaction = {
        ...transactions.find(t => t.id === transactionId),
        status: 'failed'
      };
      
      await transactionAPI.update(transactionId, updatedTransaction);
      setTransactions(transactions.map(t => 
        t.id === transactionId ? updatedTransaction : t
      ));
      toast.success('Transaction rejected');
    } catch (error) {
      console.error('Error rejecting transaction:', error);
      toast.error('Failed to reject transaction');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (loading) {
    return (
      <LoadingSpinner>
        <div className="spinner"></div>
      </LoadingSpinner>
    );
  }

  return (
    <TransactionMonitorContainer>
      <FilterContainer>
        <FilterSelect
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Transactions</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
          <option value="cancelled">Cancelled</option>
        </FilterSelect>
      </FilterContainer>

      {filteredTransactions.length === 0 ? (
        <EmptyState>
          <h3>No transactions found</h3>
          <p>No transactions match the current filter criteria.</p>
        </EmptyState>
      ) : (
        filteredTransactions.map(transaction => {
          const order = getOrderById(transaction.order_id);
          return (
            <TransactionCard key={transaction.id}>
              <TransactionHeader>
                <TransactionInfo>
                  <TransactionId>Transaction #{transaction.id}</TransactionId>
                  <TransactionDate>
                    {formatDate(transaction.created_at || transaction.transaction_date)}
                  </TransactionDate>
                </TransactionInfo>
                <StatusBadge status={transaction.status}>
                  {transaction.status}
                </StatusBadge>
              </TransactionHeader>

              <TransactionDetails>
                <DetailItem>
                  <DetailLabel>Amount</DetailLabel>
                  <DetailValue>{formatCurrency(transaction.amount || 0)}</DetailValue>
                </DetailItem>
                
                <DetailItem>
                  <DetailLabel>Order ID</DetailLabel>
                  <DetailValue>#{transaction.order_id}</DetailValue>
                </DetailItem>
                
                <DetailItem>
                  <DetailLabel>Payment Method</DetailLabel>
                  <DetailValue>
                    {transaction.payment_method || 'Escrow'}
                  </DetailValue>
                </DetailItem>
                
                <DetailItem>
                  <DetailLabel>Buyer ID</DetailLabel>
                  <DetailValue>
                    {order ? `#${order.buyer_id}` : 'N/A'}
                  </DetailValue>
                </DetailItem>
              </TransactionDetails>

              {order && (
                <div style={{ 
                  backgroundColor: '#f8f9fa', 
                  padding: '1rem', 
                  borderRadius: '6px',
                  marginBottom: '1rem'
                }}>
                  <DetailLabel>Order Details</DetailLabel>
                  <p style={{ margin: '0.5rem 0 0 0', color: '#2c3e50' }}>
                    Seller: #{order.seller_id} | Total: {formatCurrency(order.total_amount)}
                  </p>
                </div>
              )}

              <TransactionActions>
                <ViewButton onClick={() => toast.info('View transaction details functionality would be implemented here')}>
                  View Details
                </ViewButton>
                
                {transaction.status === 'pending' && (
                  <>
                    <ApproveButton onClick={() => handleApproveTransaction(transaction.id)}>
                      Approve
                    </ApproveButton>
                    <RejectButton onClick={() => handleRejectTransaction(transaction.id)}>
                      Reject
                    </RejectButton>
                  </>
                )}
              </TransactionActions>
            </TransactionCard>
          );
        })
      )}
    </TransactionMonitorContainer>
  );
};

export default TransactionMonitor;
