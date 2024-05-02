import React, { useState } from 'react';
import styled from 'styled-components';
import './style.css';

const ChatContainer = styled.div`
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ChatBox = styled.div`
    height: 300px;
    overflow-y: scroll;
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #cccccc;
    border-radius: 5px;
`;

const UserInput = styled.input`
    width: calc(100% - 70px);
    padding: 10px;
    border: 1px solid #cccccc;
    border-radius: 5px;
    margin-right: 10px;
`;

const SendButton = styled.button`
    padding: 10px 20px;
    background-color: #6a0dad;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #5b0892;
    }
`;

const Message = styled.p`
    margin: 5px 0;
`;

const UserMessage = styled(Message)`
    color: #bdb7b7;
`;

const BotMessage = styled(Message)`
    color: #6a0dad;
`;

const Question = styled(Message)`
    font-weight: bold;
`;

function Chatbot() {
    const [userInput, setUserInput] = useState('');
    const [messages, setMessages] = useState([]);

    const sendMessage = () => {
        const userInputValue = userInput.trim();
        if (!userInputValue) return;

        const chatBox = document.getElementById('chat-box');
        const userMessage = document.createElement('p');
        userMessage.textContent = 'You: ' + userInputValue;
        userMessage.classList.add('user-message');
        if (isQuestion(userInputValue)) {
            userMessage.classList.add('question');
        }
        chatBox.appendChild(userMessage);

        fetch('http://localhost:5001/get_response', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'user_input=' + encodeURIComponent(userInputValue),
        })
            .then(response => response.json())
            .then(data => {
                const botMessage = document.createElement('p');
                botMessage.textContent = 'Bot: ' + data.bot_response;
                botMessage.classList.add('bot-message');
                chatBox.appendChild(botMessage);
            })
            .catch(error => console.error('Error:', error));

        setUserInput('');
    };

    const isQuestion = message => {
        return message.endsWith('?');
    };

    return (
      
        <div>
            <h1>Chatbot</h1>
            <ChatContainer>
                <ChatBox id="chat-box"></ChatBox>
                <UserInput
                    type="text"
                    value={userInput}
                    onChange={e => setUserInput(e.target.value)}
                    onKeyPress={e => {
                        if (e.key === 'Enter') {
                            sendMessage();
                        }
                    }}
                />
                <SendButton onClick={sendMessage}>Send</SendButton>
            </ChatContainer>
        </div>
    );
}

export default Chatbot;
