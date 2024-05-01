// Importez useRef depuis React
import React, { useEffect, useState, useRef } from "react";
import { addMessage, getMessages } from "../api/MessageRequests";
import { getUser } from "../api/UserRequests";
import "./ChatBox.css";
import { format } from "timeago.js";
import ChatImageModal from './ChatImageModal';
import InputEmoji from 'react-input-emoji';
import img1 from "../../../bg/user4.jpg";
import Robot from "../../../bg/robot.gif";
import { AiFillAudio } from "react-icons/ai";
import { FiSend } from 'react-icons/fi';
import { Display } from "react-bootstrap-icons";
import { FiPlay, FiPause } from 'react-icons/fi';
import styled from "styled-components";
import ProgressBar from 'react-bootstrap/ProgressBar'; // Importer ProgressBar depuis react-bootstrap
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SendIcon from '@mui/icons-material/Send';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import CollectionsIcon from '@mui/icons-material/Collections';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
 
} from 'reactstrap';


const ChatBox = ({ chat, currentUser, setSendMessage, receiveMessage,imageUrl }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  const [showTimer, setShowTimer] = useState(false);

  const scrollRef = useRef(); // Utilisez useRef pour la référence de défilement
  const inputRef = useRef(null);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  //const bookItems = useSelector(selectCartBookItems); // Retrieve cart items from Redux store


  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

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

  const handleKeyPress = (e) => {
    // Vérifiez si la touche pressée est la touche "Entrée"
    if (e.key === "Enter") {
      // Appelez la fonction handleSend pour envoyer le message
      handleSend(e);
    }
  };

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

  function convertTobase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result);
        }

        fileReader.onerror = (error) => {
            reject(error);
        }
    })
}
  const timer = useRef(null);
  const interval = useRef(null);
  const recorderRef = useRef(null);
  const timerRef = useRef(null);
  const intervalRef = useRef(null);
  const [time, setTime] = useState(0);

  const cancelRecording = () => {
    
   
      setTime(0); // Réinitialiser le temps à 0
      clearInterval(intervalRef.current); // Arrêter l'intervalle
      timerRef.current.classList.add("opacity-0"); // Masquer l'élément
    
 }
  const startRecording = async () => {
    intervalRef.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    if (timer.current.classList.contains("opacity-0")) {
      timer.current.classList.remove("opacity-0");
  }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    recorderRef.current = new MediaRecorder(stream);

    recorderRef.current.addEventListener("dataavailable", handleSendRecord);
    recorderRef.current.start();
   
  };

  const stopRecording = async () => {
    // Assuming recorderRef and intervalRef are defined elsewhere
    recorderRef.current.stop();
    clearInterval(intervalRef.current);
    setTime(0);
  };

  const handleSendRecord = async (e) => {
    e.preventDefault();

    if (recorderRef.current.state === "inactive") {
      const audioBlob = new Blob([e.data], { type: "audio/webm" });
      const audioBase64 = await convertTobase64(audioBlob);

      const body = {
        senderId: currentUser,
        text: "",
        chatId: chat._id,
        audio: audioBase64,
      };

      try {
        const res = await fetch(`http://localhost:5000/msg/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser}`,
          },
          body: JSON.stringify(body),
        });

        if (!res.ok) {
          throw new Error("Failed to send audio message");
        }

        const json = await res.json();
        setMessages((prev) => [...prev, json]);
        console.log("msg send", messages);
      } catch (error) {
        console.error("Error sending audio message:", error);
      }
    }
  };

  
  const handleRecord = () => {
    startRecording();
    setShowTimer(true);
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

  const audio = useRef(null);


  useEffect(() => {
    if (audio.current) {
    audio.current?.addEventListener("play", () => {
        setIsPlaying(true);
    });

    audio.current?.addEventListener("pause", () => {
        setIsPlaying(false);
    })

    function formatTime(time) {
        const minute = Math.floor(time / 60);
        const minutes = (minute >= 10) ? minute : "0" + minute;
        const second = Math.floor(time % 60);
        const seconds = (second >= 10) ? second : "0" + second;
        return minutes + ":" + seconds;
    }

    audio.current?.addEventListener("timeupdate", () => {
        setTime(formatTime(audio.current.currentTime))
    })
}}, []);


  
  return (
    <>
      <div className="ChatBox-container" style={{ 
  backgroundImage: "url('src/bg/chatbg3.jpg')",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center"
}} >
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
                  {message.audio && <div>
                    <audio ref={audio} className="hidden" src={message.audio} controls></audio>
                   
                </div>}
                 <span>{format(message.createdAt)}</span>
                </div>
              ))}
              {modalOpen && (
                <ChatImageModal imageUrl={selectedImageUrl} onClose={handleCloseModal} />
              )}
              <div ref={scrollRef} /> 
            </div>

                  {/* chat-sender */}
                  <div className="chat-sender">
                    <div onClick={() => imageRef.current.click()}><CollectionsIcon/></div>
                    {/* Affichez l'icône d'aperçu d'image dans le champ d'entrée */}
                    <div className="image-preview-wrapper">
                      {imagePreviewIcon}
                      {cancelSelectionButton}
                    </div>
                    
                    <InputEmoji
                      value={newMessage}
                      onChange={handleChange}
                      onKeyDown={handleKeyPress}
                      placeholder="Type a message or select an image"
                    />
                    <input
                      type="file"
                      name=""
                      id=""
                      style={{ display: "none" }}
                      ref={imageRef}
                      onChange={handleFileChange}
                      onKeyDown={handleKeyPress}

                    />
                     <UncontrolledDropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                     <DropdownToggle color="transparent" className="nav-link dropdown-toggle d-flex align-items-center">
                     <SettingsVoiceIcon/>
                     </DropdownToggle>
                     <DropdownMenu className="dropdown-menu-left custom-dropdown-menu text-left" >
                     <div onClick={handleRecord} data-tooltip="voice recording" style={{ textAlign: 'center' }}>
                  <RadioButtonCheckedIcon cursor="pointer" color="#5b5d8d" style={{ color: 'red' }} />
                </div>
                   <div className="relative">
          
                    <div ref={timer}  style={{ width: '350px'}}>
                      <div className='flex justify-between my-3'>
                        <RestartAltIcon onClick={cancelRecording} className='cursor-pointer'></RestartAltIcon>
                        <SendIcon onClick={stopRecording} style={{ color: 'green' }} className='cursor-pointer'></SendIcon>
                      </div>
                      <ProgressBar now={(time / 5) * 100} />
                      <div className='text-center'>{time + "s"}</div>
                    </div>
                
               
              </div>
              </DropdownMenu>
              </UncontrolledDropdown>

                    <div onClick={handleSend}> <SendIcon/></div>
                  </div>
                
                  
                
               
                        
                 </>
        ) : (
         
          <Container>
             <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <img src={Robot} alt="" />
      <h1>
        <span> Welcome Again!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
        )}
      </div>
    </>
  );
};


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;
export default ChatBox;
