import { createContext, useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
const SocketContext = createContext();

const socket = io('http://localhost:8801'); // Remplacez l'URL par votre URL de serveur backend

const SocketProvider = ({ children }) => {
  const [stream, setStream] = useState(null);
  const [me, setMe] = useState('');
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState('');

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

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

//   const answerCall = () => {
//     setCallAccepted(true);

//     const peer = new RTCPeerConnection();
//     peer.ontrack = (event) => {
//       userVideo.current.srcObject = event.streams[0];
//     };

//     peer.signal(call.signal);

//     connectionRef.current = peer;
//   };

  
  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.close();
    window.location.reload();
  };

  return (
    <SocketContext.Provider value={{ call, callAccepted, myVideo, userVideo, stream, name, setName, callEnded, me, leaveCall }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider, socket };
