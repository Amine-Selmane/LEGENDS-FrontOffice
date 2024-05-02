import React, { useState } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';

const CHAT_API_URL = 'http://localhost:5000/chat';

const systemMessage = { role: "system", content: "Explain things like you're talking to a software professional with 2 years of experience." };

const ChatComponent = () => {
  const [messages, setMessages] = useState([
    { message: "Hello, I'm ChatGPT! Ask me anything!", sentTime: "just now", sender: "ChatGPT" }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = { message, direction: 'outgoing', sender: "user" };
    const newMessages = [...messages, newMessage];
    
    setMessages(newMessages);
    setIsTyping(true);
    
    try {
      const response = await fetch(CHAT_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt: message })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response from server');
      }

      const data = await response.json();
      setMessages([...newMessages, { message: data.completion, sender: "ChatGPT" }]);
      setIsTyping(false);
    } catch (error) {
      console.error('Error:', error);
      // Handle error accordingly, e.g., display error message to the user
    }
  };

  return (
    <div style={{ position:"relative", height: "800px", width: "700px" }}>
      <MainContainer>
        <ChatContainer>
          <MessageList scrollBehavior="smooth" typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}>
            {messages.map((message, i) => {
              return <Message key={i} model={message} />;
            })}
          </MessageList>
          <MessageInput placeholder="Type message here" onSend={handleSend} />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export default ChatComponent;
