import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import VideoPlayer from './VideoPlayer/VideoPlayer';
import Options from './Options/Options';
import { SocketContext, socket } from './SocketContext'; // Importer le contexte SocketContext
import { Container, Typography, AppBar } from '@mui/material';
import axios from 'axios';
function VoiceChat() {
  const [userData, setUserData] = useState(null);

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
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchUserData();
  }, [userData]);

  return (
    <SocketContext.Provider value={socket}> {/* Fournir le socket via le contexte */}
      <Container>
        <AppBar position='static' color='inherit'>
          <Typography variant='h2' align='center'>
            Video Chat
          </Typography>
        </AppBar>
        <VideoPlayer />
        <Options />
      </Container>
    </SocketContext.Provider>
  );
}

export default VoiceChat;
