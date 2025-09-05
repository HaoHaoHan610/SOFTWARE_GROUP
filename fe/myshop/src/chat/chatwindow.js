import React, { useState, useEffect } from 'react';
import ChatList from './chatList';
import MessageInput from './messageInput';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // kết nối backend

const ChatWindow = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);

    const users = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
    ];

    const selectUser = (user) => {
        setSelectedUser(user);
        setMessages([]); // reset hoặc load lịch sử từ backend
    };

    const sendMessage = (text) => {
        if (!selectedUser) return;
        const message = { from: 'Me', to: selectedUser.id, text };
        socket.emit('send_message', message); // gửi lên server
        setMessages((prev) => [...prev, message]);
    };

    useEffect(() => {
        socket.on('receive_message', (message) => {
            // nếu message gửi đến user hiện tại thì hiển thị
            if (selectedUser && message.to === selectedUser.id) {
                setMessages((prev) => [...prev, message]);
            }
        });

        return () => {
            socket.off('receive_message');
        };
    }, [selectedUser]);

    return (
        <div style={{ display: 'flex', border: '1px solid #ccc', height: '400px' }}>
            <ChatList users={users} selectUser={selectUser} />
            <div style={{ flex: 1, padding: '10px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ flex: 1, overflowY: 'auto', borderBottom: '1px solid #ccc' }}>
                    {messages.map((msg, index) => (
                        <div key={index} style={{ margin: '5px 0' }}>
                            <b>{msg.from}:</b> {msg.text}
                        </div>
                    ))}
                </div>
                <MessageInput sendMessage={sendMessage} />
            </div>
        </div>
    );
};

export default ChatWindow;
