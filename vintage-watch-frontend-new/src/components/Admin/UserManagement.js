import React, { useState, useEffect } from 'react';
import { userAPI } from '../../services/api';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const UserManagementContainer = styled.div`
  max-width: 100%;
`;

const UserCard = styled.div`
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

const UserHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const UserInfo = styled.div`
  flex: 1;
`;

const UserName = styled.h3`
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
`;

const UserEmail = styled.p`
  color: #7f8c8d;
  margin: 0;
  font-size: 0.9rem;
`;

const RoleBadge = styled.div`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  background-color: ${props => {
    switch (props.role) {
      case 'admin': return '#9b59b6';
      case 'seller': return '#27ae60';
      case 'buyer': return '#3498db';
      case 'appraiser': return '#f39c12';
      case 'support': return '#e67e22';
      default: return '#95a5a6';
    }
  }};
  color: white;
`;

const UserDetails = styled.div`
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

const UserActions = styled.div`
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

const EditButton = styled(ActionButton)`
  background-color: #3498db;
  color: white;
  
  &:hover {
    background-color: #2980b9;
  }
`;

const DeleteButton = styled(ActionButton)`
  background-color: #e74c3c;
  color: white;
  
  &:hover {
    background-color: #c0392b;
  }
`;

const AddUserButton = styled.button`
  background: linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%);
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

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userAPI.getAll();
      setUsers(response.data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    try {
      await userAPI.delete(userId);
      setUsers(users.filter(user => user.id !== userId));
      toast.success('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <LoadingSpinner>
        <div className="spinner"></div>
      </LoadingSpinner>
    );
  }

  return (
    <UserManagementContainer>
      <AddUserButton onClick={() => toast.info('Add user functionality would be implemented here')}>
        + Add New User
      </AddUserButton>

      {users.length === 0 ? (
        <EmptyState>
          <h3>No users found</h3>
          <p>No users are currently registered on the platform.</p>
        </EmptyState>
      ) : (
        users.map(user => (
          <UserCard key={user.id}>
            <UserHeader>
              <UserInfo>
                <UserName>{user.username}</UserName>
                <UserEmail>{user.email}</UserEmail>
              </UserInfo>
              <RoleBadge role={user.role}>
                {user.role}
              </RoleBadge>
            </UserHeader>

            <UserDetails>
              <DetailItem>
                <DetailLabel>User ID</DetailLabel>
                <DetailValue>#{user.id}</DetailValue>
              </DetailItem>
              
              <DetailItem>
                <DetailLabel>Role</DetailLabel>
                <DetailValue style={{ textTransform: 'capitalize' }}>
                  {user.role}
                </DetailValue>
              </DetailItem>
              
              <DetailItem>
                <DetailLabel>Created</DetailLabel>
                <DetailValue>{formatDate(user.created_at)}</DetailValue>
              </DetailItem>
              
              <DetailItem>
                <DetailLabel>Status</DetailLabel>
                <DetailValue style={{ color: '#27ae60' }}>
                  Active
                </DetailValue>
              </DetailItem>
            </UserDetails>

            <UserActions>
              <EditButton onClick={() => toast.info('Edit user functionality would be implemented here')}>
                Edit User
              </EditButton>
              <DeleteButton onClick={() => handleDeleteUser(user.id)}>
                Delete User
              </DeleteButton>
            </UserActions>
          </UserCard>
        ))
      )}
    </UserManagementContainer>
  );
};

export default UserManagement;
