import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import ChatBox from "../../ChatBox/ChatBox";
import Conversation from "../../Coversation/Conversation";
import LogoSearch from "../../LogoSearch/LogoSearch";
import NavIcons from "../../NavIcons/NavIcons";
import "./Chat.css";
import { userChats } from "../../api/ChatRequests";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

const Chat = () => {
  const dispatch = useDispatch();
  const socket = useRef(); // Initialize socket as null
  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  const [messages, setMessages] = useState([]); // Add the 'messages' state variable
  
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get("http://localhost:5000/api/userToken", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserData(response.data);

          // Now you have the user data, you can proceed with other operations
          if (response.data) {
            getChats(response.data);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchUserData();
  }, [userData]);
  
  //sending message to socket server
  useEffect(() => {
    if (sendMessage!==null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);
  

  useEffect(() => {
    
      if (userData) {
        socket.current = io("ws://localhost:8800");
        socket.current.emit("new-user-add", userData._id);
        socket.current.on("get-users", (users) => {
          setOnlineUsers(users);
        });

        socket.current.on("recieve-message", (data) => {
          console.log(data);
          setReceiveMessage(data);
        });
      }
   
  }, [userData]);



  const getChats = async (userData) => {
    try {
      const { data } = await userChats(userData._id);
      setChats(data);
    } catch (error) {
      console.log(error);
    }
  };


 // Assuming you have fetched _id from Redux once and stored it in a state variable named userId

// Assuming you have fetched _id from Redux once and stored it in a state variable named userId

//const userData = useSelector((state) => state.authReducer.authData);

const checkOnlineStatus = (chat) => {
  const _id = userData._id;
  const chatMember = chat.members.find((member) => member!== _id);
  const online = onlineUsers.find((user) => user.userId === chatMember);
  return online? true : false;
};




  return (
    <div className="Chat">
      {/* Left Side */}
      <div className="Left-side-chat">
        <LogoSearch />
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {chats.map((chat) => (
              <div
                key={chat._id}
                onClick={() => {
                  setCurrentChat(chat);
                }}
              >
                {userData && (
                  <Conversation
                    data={chat}
                    currentUser={userData._id}
                    online={checkOnlineStatus(chat)}
                  />
                )}  
              </div>
            ))}
          </div>
        </div>
      </div>

     {/* Right Side */}
      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          <NavIcons />
        </div>
        {/* Ensure user is defined before passing user._id */}
        {userData && (
          <ChatBox
            chat={currentChat}
            currentUser={userData._id}
            setSendMessage={setSendMessage}
            receiveMessage={receiveMessage}
          />
        )}
      </div>

    </div>
  );
};

export default Chat;
