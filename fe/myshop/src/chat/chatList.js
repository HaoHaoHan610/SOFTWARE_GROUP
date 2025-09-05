import React from 'react';

const ChatList = ({ users, selectUser }) => (
    <div style={{ borderRight: '1px solid #ccc', width: '200px' }}>
        <h3>Friends</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
            {users.map((user) => (
                <li
                    key={user.id}
                    style={{ padding: '8px', cursor: 'pointer' }}
                    onClick={() => selectUser(user)}
                >
                    {user.name}
                </li>
            ))}
        </ul>
    </div>
);

export default ChatList;
