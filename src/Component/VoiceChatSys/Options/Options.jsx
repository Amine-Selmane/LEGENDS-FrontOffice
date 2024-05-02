import { Button, Container, TextField, Grid, Typography, Paper } from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { createContext, useRef, useEffect } from 'react';

import { Assignment, Phone, PhoneDisabled } from '@mui/icons-material';
import { useContext, useState } from 'react';
import { SocketContext } from '../SocketContext';
import io from 'socket.io-client';

import './Options.css';

const Options = () => {
  const { me, name, setName, callEnded, leaveCall,  } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState('');
  const [stream, setStream] = useState(null);
  const [callAccepted, setCallAccepted] = useState(false);

  const socket = io('http://localhost:8801'); 
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
      });

    socket.on('me', (id) => setMe(id));

    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);
  const callUser = (id) => {
    if (!stream) {
      console.error("No stream available");
      return;
    }
  
    const peer = new RTCPeerConnection();
    peer.ontrack = (event) => {
      userVideo.current.srcObject = event.streams[0];
    };
  
    peer.addStream(stream);
  
    peer.onicecandidate = (event) => {
      socket.emit('callUser', { userToCall: id, signalData: event.candidate, from: me, name });
    };
  
    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });
  
    connectionRef.current = peer;
  };

  
  const answerCall = () => {
    setCallAccepted(true);

    const peer = new RTCPeerConnection();
    peer.ontrack = (event) => {
      userVideo.current.srcObject = event.streams[0];
    };

    peer.signal(call.signal);

    connectionRef.current = peer;
  };


  return (
    <Container>
      <Paper elevation={10}>
        <form noValidate autoComplete='off'>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Typography gutterBottom variant='h6' > Account Info </Typography>
              <TextField label='Name' value={name} onChange={(e) => setName(e.target.value)} fullWidth />
              <CopyToClipboard text={me} >
                <Button variant='contained' color='primary' fullWidth startIcon={<Assignment fontSize='large' />}>
                  Copy Your ID
                </Button>
              </CopyToClipboard>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography gutterBottom variant='h6' > Make a Call </Typography>
              <TextField label='ID For Call' value={idToCall} onChange={(e) => setIdToCall(e.target.value)} fullWidth />
              <Grid>
                {callAccepted && !callEnded ?
                  (
                    <Button
                      variant='contained'
                      color='secondary'
                      fullWidth
                      startIcon={<PhoneDisabled fontSize='large' />}
                      onClick={leaveCall}
                    >
                      Hang Up
                    </Button>
                  ) :
                  (
                    <Button
                      variant='contained'
                      color='primary'
                      fullWidth
                      onClick={() => callUser(idToCall)}
                      startIcon={<Phone fontSize='large' />}
                    >
                      Call
                    </Button>
                  )}
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Options;
