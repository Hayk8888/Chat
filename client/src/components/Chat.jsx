import React, { useEffect, useState } from 'react';
import './chat/chat.css';
import userImage1 from '../images/unnamed.jpg';
import userImage2 from '../images/download.jpg';
import userImage3 from '../images/vardan.jpg';
import './chat/ChatApp.css';
import './chat/chat.css';
import {socket} from "../../io/index.js";

function Chat() {
    const [activeUser, setActiveUser] = useState(0);
    const [userChats] = useState([
        { username: 'Aram Asatryan', status: 'offline', photo: userImage1 },
        { username: 'Gor Vardanyan', status: 'online', photo: userImage2 },
        { username: 'Vardan Karagyozyan', status: 'online', photo: userImage3 },
        // Add more users as needed
    ]);

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const handleInputChange = (e) => {
        setNewMessage(e.target.value);
    };


    useEffect(() => {
        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off('message');
        }
    }, []);

    const handleUserClick = (index) => {
        setActiveUser(index);
    };

    const sendMessage = () => {
        socket.emit('message', newMessage);
    };

    return (
        <div className="content-chat mt-20">
            <div className="content-chat-user">
                <div className="head-search-chat">
                    <h4 className="text-center">Chat Finder</h4>
                </div>

                <div className="search-user mt-30">
                    <input id="search-input" type="text" placeholder="Search..." name="search" className="search" />
                    <span>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </span>
                </div>

                <div className="list-search-user-chat mt-20">
                    {userChats.map((user, index) => (
                        <div
                            key={index}
                            className={`user-chat ${index === activeUser ? 'active' : ''}`}
                            data-username={user.username}
                            onClick={() => handleUserClick(index)}
                        >
                            <div className="user-chat-img">
                                <img
                                    src={user.photo}
                                    alt=""
                                />
                                <div className={user.status === 'online' ? 'online' : 'offline'}></div>
                            </div>
                            <div className="user-chat-text">
                                <p className="mt-0 mb-0">
                                    <strong>{user.username}</strong>
                                </p>
                                <small>barev {user.username}, jan</small>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="content-chat-message-user">
            </div>
            <div className="chat-app">
            <div className="chat-container">
                <div className="chat-messages">
                    {messages.map((message, index) => (
                        <div key={index} className="message">
                            {message}
                            {/*<span className="user">{message.user}:</span> {message.text}*/}
                        </div>
                    ))}
                </div>
                <div className="chat-input">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={handleInputChange}
                    />

                    <button onClick={sendMessage} >send</button>
                </div>
            </div>
        </div>
        </div>

    );
}

export default Chat;




