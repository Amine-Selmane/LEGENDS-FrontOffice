// Importez useRef depuis React
import React, { useEffect, useState, useRef } from "react";
import { addMessage, getMessages } from "../api/MessageRequests";
import { getUser } from "../api/UserRequests";
import "./ChatBox.css";
import { format } from "timeago.js";
import ChatImageModal from './ChatImageModal';
import InputEmoji from 'react-input-emoji';
import img1 from "../../../bg/user4.jpg";

const ChatBox = ({ chat, currentUser, setSendMessage, receiveMessage,imageUrl }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const [newMessage, setNewMessage] = useState("");
  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);


  const scrollRef = useRef(); // Utilisez useRef pour la référence de défilement
  const inputRef = useRef(null);

  const handleOpenModal = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };


  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  }
  function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }
  
  // fetching data for header
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  // fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) fetchMessages();
  }, [chat]);

  // Always scroll to last Message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const imageRef = useRef();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    
    // Générer un aperçu de l'image sélectionnée
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };
    const receiverId = chat.members.find((id) => id !== currentUser);

    // Ajouter le fichier sélectionné à l'objet message
    if (selectedFile) {
      message.file = selectedFile;
    }

    // Envoyer le message au serveur et au socket server
    try {
      setSendMessage({ ...message, receiverId });

      // Envoyer le message à la base de données
      const { data } = await addMessage(message);
      setMessages([...messages, data]);
      setNewMessage("");
      setSelectedFile(null); // Réinitialiser le fichier sélectionné après l'envoi
      setImagePreview(null); // Réinitialiser l'aperçu de l'image

    } catch (error) {
      console.log("Error:", error);
    }
  };

 

  // Receive Message from parent component
useEffect(() => {
  console.log("Message Arrived: ", receiveMessage);
  if (receiveMessage !== null && receiveMessage.chatId === chat._id) {
    // Mettre à jour les messages en ajoutant le nouveau message reçu
    setMessages(prevMessages => [...prevMessages, receiveMessage]);
    // Scroll vers le bas de la conversation
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }
}, [receiveMessage]);
 // Receive Message from parent component
  // useEffect(() => {
  //   console.log("Message Arrived: ", receiveMessage)
  //   if (receiveMessage !== null && receiveMessage.chatId === chat._id) {
  //     setMessages([...messages, receiveMessage]);
  //   }
  // }, [receiveMessage]);

  // Écoute des changements dans le tableau 'messages'
  useEffect(() => {
    // Fait défiler vers le bas de la conversation lorsque de nouveaux messages sont ajoutés
    if (messages.length > 0) {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const imagePreviewIcon = imagePreview ? (
    <img src={imagePreview} alt="Selected Image" style={{ width: '80px', height: '80px', marginRight: '2px' }} />
  ) : null;

  const cancelSelectionButton = imagePreview ? (
    <button
      className="cancel-selection-button"
      onClick={() => {
        setImagePreview(null);
        setSelectedFile(null);
      }}
    >
      X
    </button>
  ) : null;
  return (
    <>
      <div className="ChatBox-container">
        {chat ? (
          <>
            {/* chat-header */}
            <div className="chat-header">
              <div className="follower">
                <div>
                  <img
                    src={userData?.profile || img1}
                    alt="Profile"
                    className="followerImage"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <div className="name" style={{ fontSize: "0.9rem" }}>
                    <span>
                      {userData?.firstName} {userData?.lastName}
                    </span>
                  </div>
                </div>
              </div>
              <hr
                style={{
                  width: "95%",
                  border: "0.1px solid #ececec",
                  marginTop: "20px",
                }}
              />
            </div>
            {/* chat-body */}
            <div className="chat-body">
              {messages.map((message, index) => (
                <div key={message._id || index} className={message.senderId === currentUser ? "message own" : "message"}>
                  <span>{message.text}</span>{" "}
                  {message.file && (
                    <div>
                      <img src={`data:image/png;base64,${arrayBufferToBase64(message.file.data)}`} alt="Fichier joint" onClick={() => handleOpenModal(`data:image/png;base64,${arrayBufferToBase64(message.file.data)}`)} style={{ cursor: 'pointer', width: '150px', height: '120px' }} />
                    </div>
                  )}
                  <span>{format(message.createdAt)}</span>
                </div>
              ))}
              {modalOpen && (
                <ChatImageModal imageUrl={selectedImageUrl} onClose={handleCloseModal} />
              )}
              <div ref={scrollRef} /> {/* Référence pour le défilement */}
            </div>
                  {/* chat-sender */}
                  <div className="chat-sender">
        <div onClick={() => imageRef.current.click()}>+</div>
        {/* Affichez l'icône d'aperçu d'image dans le champ d'entrée */}
        <div className="image-preview-wrapper">
          {imagePreviewIcon}
          {cancelSelectionButton}
        </div>
        <InputEmoji
          value={newMessage}
          onChange={handleChange}
          placeholder="Type a message or select an image"
        />
         <input
          type="file"
          name=""
          id=""
          ref={imageRef}
          onChange={handleFileChange}
        />
        <div className="send-button button" onClick={handleSend}>Send</div>
      </div>{" "}
          </>
        ) : (
          <span className="chatbox-empty-message">
            Tap on a chat to start conversation...
          </span>
        )}
      </div>
    </>
  );
};

export default ChatBox;
