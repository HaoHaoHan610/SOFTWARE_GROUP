import React, { useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const LiveChatContainer = styled.div`
  max-width: 100%;
  height: 600px;
  display: flex;
  flex-direction: column;
`;

const ChatHeader = styled.div`
  background: linear-gradient(135deg, #e67e22 0%, #d35400 100%);
  color: white;
  padding: 1rem;
  border-radius: 8px 8px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChatTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
`;

const OnlineStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
`;

const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #27ae60;
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }
`;

const ChatArea = styled.div`
  flex: 1;
  background: white;
  border: 1px solid #e1e8ed;
  border-top: none;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Message = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.isAgent ? 'flex-end' : 'flex-start'};
`;

const MessageBubble = styled.div`
  max-width: 70%;
  padding: 0.75rem 1rem;
  border-radius: 18px;
  background-color: ${props => props.isAgent ? '#e67e22' : '#f1f3f4'};
  color: ${props => props.isAgent ? 'white' : '#2c3e50'};
  font-size: 0.9rem;
  line-height: 1.4;
`;

const MessageTime = styled.span`
  font-size: 0.7rem;
  color: #7f8c8d;
  margin-top: 0.25rem;
  padding: 0 0.5rem;
`;

const MessageSender = styled.span`
  font-size: 0.7rem;
  color: #7f8c8d;
  margin-bottom: 0.25rem;
  padding: 0 0.5rem;
  font-weight: 500;
`;

const ChatInput = styled.div`
  background: white;
  border: 1px solid #e1e8ed;
  border-top: none;
  border-radius: 0 0 8px 8px;
  padding: 1rem;
  display: flex;
  gap: 0.5rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #e1e8ed;
  border-radius: 20px;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: #e67e22;
  }
`;

const SendButton = styled.button`
  background: #e67e22;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 20px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: #d35400;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ActiveChats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const ChatCard = styled.div`
  background: white;
  border: 1px solid #e1e8ed;
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: box-shadow 0.2s ease;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const ChatCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const CustomerName = styled.h4`
  margin: 0;
  color: #2c3e50;
  font-size: 1rem;
`;

const UnreadCount = styled.div`
  background: #e74c3c;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 600;
`;

const LastMessage = styled.p`
  margin: 0;
  color: #7f8c8d;
  font-size: 0.8rem;
  line-height: 1.4;
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

const LiveChat = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState('');
  const [chats] = useState([
    {
      id: 1,
      customerName: 'John Smith',
      customerId: 123,
      lastMessage: 'Hi, I have a question about my order...',
      unreadCount: 2,
      messages: [
        {
          id: 1,
          text: 'Hi, I have a question about my order #1234',
          isAgent: false,
          timestamp: '2024-01-15T10:30:00Z',
          sender: 'John Smith'
        },
        {
          id: 2,
          text: 'Hello John! I\'d be happy to help you with your order. What specific question do you have?',
          isAgent: true,
          timestamp: '2024-01-15T10:32:00Z',
          sender: 'Support Agent'
        },
        {
          id: 3,
          text: 'I was wondering about the shipping status. It says it should have arrived by now.',
          isAgent: false,
          timestamp: '2024-01-15T10:35:00Z',
          sender: 'John Smith'
        }
      ]
    },
    {
      id: 2,
      customerName: 'Sarah Johnson',
      customerId: 456,
      lastMessage: 'Thank you for your help!',
      unreadCount: 0,
      messages: [
        {
          id: 1,
          text: 'Thank you for your help!',
          isAgent: false,
          timestamp: '2024-01-15T09:45:00Z',
          sender: 'Sarah Johnson'
        }
      ]
    },
    {
      id: 3,
      customerName: 'Mike Wilson',
      customerId: 789,
      lastMessage: 'Is this watch authentic?',
      unreadCount: 1,
      messages: [
        {
          id: 1,
          text: 'Is this watch authentic? I want to make sure before purchasing.',
          isAgent: false,
          timestamp: '2024-01-15T11:15:00Z',
          sender: 'Mike Wilson'
        }
      ]
    }
  ]);

  const handleSendMessage = () => {
    if (!message.trim() || !activeChat) return;

    const newMessage = {
      id: Date.now(),
      text: message,
      isAgent: true,
      timestamp: new Date().toISOString(),
      sender: 'Support Agent'
    };

    // In a real application, this would send the message to the backend
    toast.success('Message sent!');
    setMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <LiveChatContainer>
      {!activeChat ? (
        <>
          <h3 style={{ color: '#2c3e50', marginBottom: '1rem' }}>Active Chat Sessions</h3>
          <ActiveChats>
            {chats.map(chat => (
              <ChatCard key={chat.id} onClick={() => setActiveChat(chat)}>
                <ChatCardHeader>
                  <CustomerName>{chat.customerName}</CustomerName>
                  {chat.unreadCount > 0 && (
                    <UnreadCount>{chat.unreadCount}</UnreadCount>
                  )}
                </ChatCardHeader>
                <LastMessage>{chat.lastMessage}</LastMessage>
              </ChatCard>
            ))}
          </ActiveChats>
          
          {chats.length === 0 && (
            <EmptyState>
              <h3>No active chat sessions</h3>
              <p>No customers are currently waiting for support.</p>
            </EmptyState>
          )}
        </>
      ) : (
        <>
          <ChatHeader>
            <ChatTitle>Chat with {activeChat.customerName}</ChatTitle>
            <OnlineStatus>
              <StatusDot />
              Online
            </OnlineStatus>
          </ChatHeader>
          
          <ChatArea>
            {activeChat.messages.map(msg => (
              <Message key={msg.id} isAgent={msg.isAgent}>
                {!msg.isAgent && <MessageSender>{msg.sender}</MessageSender>}
                <MessageBubble isAgent={msg.isAgent}>
                  {msg.text}
                </MessageBubble>
                <MessageTime>{formatTime(msg.timestamp)}</MessageTime>
              </Message>
            ))}
          </ChatArea>
          
          <ChatInput>
            <Input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <SendButton onClick={handleSendMessage} disabled={!message.trim()}>
              Send
            </SendButton>
          </ChatInput>
          
          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <button
              onClick={() => setActiveChat(null)}
              style={{
                background: '#95a5a6',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Back to Chat List
            </button>
          </div>
        </>
      )}
    </LiveChatContainer>
  );
};

export default LiveChat;
