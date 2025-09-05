import React, { useState } from 'react';

const MessageInput = ({ sendMessage }) => {
    const [text, setText] = useState('');

    const handleSend = () => {
        if (text.trim() !== '') {
            sendMessage(text);
            setText('');
        }
    };

    return (
        <div style={{ display: 'flex', marginTop: '10px' }}>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={{ flex: 1, padding: '8px' }}
                placeholder="Type a message..."
            />
            <button onClick={handleSend} style={{ padding: '8px 12px' }}>
                Send
            </button>
        </div>
    );
};

export default MessageInput;
