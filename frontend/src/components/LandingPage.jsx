
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';



const socket = io('http://localhost:3000',{
    query: {
        userId: 'yash',
        status: 'Available'
    }
}); // Update with your server URL

function LandingPage() {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [status, setStatus] = useState(true);

    useEffect(() => {
        socket.on('message', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });
        return () => {
            socket.disconnect();
        };
    }, []);

    const sendMessage = () => {
        if (inputMessage.trim() !== '') {
            socket.emit('message', {data: inputMessage, status: status});
            setInputMessage('');
        }
    };


    const handleCLick1 = () => {
        setStatus(!status);
        let st=status?'Busy':'Available';
        socket.emit('status', {st});
    }

    return (
        <div className="flex flex-col h-screen justify-between">
            <div className="overflow-auto h-4/5 p-4 border">
                {messages.map((message, index) => (
                    <div key={index} className="mb-2">
                        {message}
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-between p-4 border-t">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 p-2 mr-2 border rounded-lg"
                />
                <button onClick={sendMessage} className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2">
                    Send
                </button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={handleCLick1}>
                    {
                        status?'Busy':'Available'
                    }
                </button>
            </div>
        </div>
    );
}

export default LandingPage;
