
// import React, { useState } from 'react';
// import axios from 'axios';

// const ClaimForm = () => {
//     const [transcript, setTranscript] = useState('');
//     const [mediaRecorder, setMediaRecorder] = useState(null);

//     const startRecording = async () => {
//         try {
//             const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//             const recorder = new MediaRecorder(stream);
//             setMediaRecorder(recorder);

//             const audioChunks = [];
//             recorder.ondataavailable = (e) => {
//                 audioChunks.push(e.data);
//             };

//             recorder.onstop = () => {
//                 const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
//                 sendAudioToServer(audioBlob);
//             };

//             recorder.start();
//         } catch (error) {
//             console.error('Error starting recording:', error);
//         }
//     };

//     const stopRecording = () => {
//         if (mediaRecorder) {
//             mediaRecorder.stop();
//         }
//     };

//     const sendAudioToServer = async (audioBlob) => {
//         try {
//             const formData = new FormData();
//             formData.append('audio', audioBlob);

//             const response = await axios.post('http://localhost:3000/transcribe', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });

//             setTranscript(response.data.transcript);
//         } catch (error) {
//             console.error('Error transcribing audio:', error);
//         }
//     };

//     const submitClaim = () => {
//         // Logique pour soumettre la réclamation
//         console.log('Claim submitted!');
//     };

//     return (
//         <div>
//             <h2>Submit a Claim</h2>
//             <button onClick={startRecording}>Start Recording</button>
//             <button onClick={stopRecording}>Stop Recording</button>
//             <button onClick={submitClaim}>Submit Claim</button>
//             <p>Transcript: {transcript}</p>
//         </div>
//     );
// };

// export default ClaimForm;





// import React, { useState } from 'react';
// import axios from 'axios';

// const ClaimForm = () => {
//     const [transcript, setTranscript] = useState('');
//     const [recording, setRecording] = useState(false);
//     const [recognition, setRecognition] = useState(null);

//     const startRecording = () => {
//         const recognitionInstance = new window.webkitSpeechRecognition();
//         recognitionInstance.lang = 'fr-FR';

//         recognitionInstance.onstart = () => {
//             console.log('Speech recognition started');
//             setRecording(true);
//         };

//         recognitionInstance.onresult = (event) => {
//             const result = event.results[0][0].transcript;
//             setTranscript(result);
//             setRecording(false);
//         };

//         recognitionInstance.onerror = (event) => {
//             console.error('Speech recognition error:', event.error);
//             setRecording(false);
//         };

//         recognitionInstance.start();
//         setRecognition(recognitionInstance);
//     };

//     const stopRecording = () => {
//         if (recognition) {
//             recognition.stop();
//         }
//     };

//     const handleClaimSubmission = async () => {
//         try {
//             const response = await axios.post('http://127.0.0.1:5000/transcribe', { transcript });
//             console.log('Transcript:', response.data.transcript);
//         } catch (error) {
//             console.error('Error transcribing audio:', error);
//         }
//     };

//     return (
//         <div>
//             <h2>Submit a Claim</h2>
//             <button onClick={startRecording} disabled={recording}>Start Recording</button>
//             <button onClick={stopRecording} disabled={!recording}>Stop Recording</button>
//             <button onClick={handleClaimSubmission}>Submit Claim</button>
//             <p>Transcript: {transcript}</p>
//         </div>
//     );
// };

// export default ClaimForm;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FormGroup, Label, Input, Alert } from 'reactstrap';
import Banner from '../Banner/Banner';
import Home2Header from "../Headers/Home2Header";

const baseURL = 'http://localhost:5000';

const ClaimForm = () => {
  const [transcript, setTranscript] = useState('');
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState('');
  const [grade, setGrade] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [userData, setUserData] = useState(null);
  

  useEffect(() => {
    // const fetchCourses = async () => {
    //   try {
    //     const response = await axios.get(`${baseURL}/courses`);
    //     setCourses(response.data);
    //   } catch (error) {
    //     console.error('Error fetching courses:', error);
    //   }
    // };

    // fetchCourses();

    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found, user not authenticated");
          return;
        }

        const response = await axios.get("http://localhost:5000/api/userToken", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.error) {
          console.error("Authentication Failed!");
          return;
        }
        setUserData(response.data);
        console.log("User data:", response.data);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchUserData();
  }, []);

  const startRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'fr-FR';
      recognition.onresult = (event) => {
        const result = event.results[0][0].transcript;
        setTranscript(result);
      };
      recognition.start();
    } else {
      alert("Votre navigateur ne prend pas en charge la reconnaissance vocale.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!userData) {
        console.error("User data not available");
        return;
      }
  
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found, user not authenticated");
        return;
      }
  
      const userId = userData._id;
      if (!userId) {
        console.error("User ID not available");
        return;
      }
  
      const response = await axios.post(`${baseURL}/claims/createClaim`, {
        userId: userId,
        audio: transcript
       // courseId,
        // Ajoutez la transcription à l'objet envoyé au serveur
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
  
      console.log('Claim submitted successfully:', response.data);
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting claim:', error);
      setError('An error occurred while submitting the claim.');
    }
  };
  
  const isUserDataAvailable = userData && userData.firstName && userData.lastName;

  return (
    <div>
        {userData?.role === "student" && <Home2Header />}
      <Banner title="Send Claim" background="assets/images/banner3.jpg" />
      <div style={styles.container}>
        <h2>Submit a Claim</h2>
        {error && <div>{error}</div>}
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="studentName">Student</Label>
            <Input
              type="text"
              name="studentName"
              id="studentName"
              value={isUserDataAvailable ? `${userData.firstName} ${userData.lastName}` : ''}
              disabled
            />
          </FormGroup>
          <div>
            <button type="button" onClick={startRecognition}>Start Recognition</button>
            <p>{transcript}</p>
          </div>
          <button type="submit" disabled={submitted || !isUserDataAvailable}>Submit Claim</button>
        </form>
      </div>
    </div>
  );
};

export default ClaimForm;

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid #000',
    padding: '20px',
    borderRadius: '10px',
    maxWidth: '400px',
    margin: 'auto',
    marginTop: '50px', // Adjust this value to center vertically
  },
};


// import React, { useState } from 'react';      //ça marcheeeeeeeeeeeeeee
// import Banner from '../../Component/Banner/Banner';

// function SpeechRecognitionExample() {
//   const [transcript, setTranscript] = useState('');

//   const startRecognition = () => {
//     // Vérifie si l'API SpeechRecognition est disponible dans le contexte global
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
//     // Si l'API est disponible, crée une instance et configure la langue
//     if (SpeechRecognition) {
//       const recognition = new SpeechRecognition();
//       recognition.lang = 'fr-FR';
      
//       // Écoute les résultats de la reconnaissance vocale
//       recognition.onresult = (event) => {
//         const result = event.results[0][0].transcript;
//         setTranscript(result);
//       };
      
//       // Démarrer la reconnaissance vocale
//       recognition.start();
//     } else {
//       // Gestion si l'API n'est pas disponible dans le navigateur
//       alert("Votre navigateur ne prend pas en charge la reconnaissance vocale.");
//     }
//   };

//  // Styles CSS intégrés
//  const styles = {
//     container: {
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       justifyContent: 'center',
//       border: '2px solid #000',
//       padding: '20px',
//       borderRadius: '10px',
//       maxWidth: '400px',
//       position: 'absolute',
//       top: '50%',
//       left: '50%',
//       transform: 'translate(-50%, -50%)',
//     },
//     greenButton: {
//       padding: '10px 20px',
//       backgroundColor: 'green',
//       color: 'white',
//       border: 'none',
//       borderRadius: '5px',
//       cursor: 'pointer',
//       marginBottom: '10px',
//     },
//     transcript: {
//       fontWeight: 'bold',
//       color: 'black',
//     },
//   };

//   return (
//     <div style={styles.container}>
//          <Banner title="Student Claim" background="assets/images/banner3.jpg" />
//       <h2>Speech Recognition Example</h2>
//       <button style={styles.greenButton} onClick={startRecognition}>Start Recognition</button>
//       <p style={styles.transcript}>{transcript}</p>
//     </div>
//   );
// }

// export default SpeechRecognitionExample;





//62c2e52bc0d6a95a9eb907065d6553522e956eca572e1d8b807a3e2338fdd0dc/stage

// import React, { useState } from 'react';

// function SpeechToTextWithAlanAI() {
//   const [transcript, setTranscript] = useState('');

//   // Fonction pour traiter le texte transcrit
//   const handleTranscript = (text) => {
//     setTranscript(text);
//   };

//   return (
//     <div>
//       <h2>Speech to Text with Alan AI</h2>
//       <p>Transcript: {transcript}</p>
//     </div>
//   );
// }

// export default SpeechToTextWithAlanAI;






// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FormGroup, Label, Input, Button } from 'reactstrap'; // Importez les composants nécessaires
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'; // Importez le module pour la reconnaissance vocale

// const ClaimForm = () => {
//     const [claimText, setClaimText] = useState('');
//     const { transcript, resetTranscript } = useSpeechRecognition(); // Utilisez le hook useSpeechRecognition pour accéder à la transcription vocale

//     const startRecording = () => {
//         SpeechRecognition.startListening(); // Commencez l'écoute de l'entrée vocale
//     };

//     const stopRecording = () => {
//         SpeechRecognition.stopListening(); // Arrêtez l'écoute de l'entrée vocale
//     };

//     useEffect(() => {
//         if (transcript) {
//             setClaimText(transcript); // Mettez à jour le texte de la réclamation avec la transcription vocale
//         }
//     }, [transcript]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         // Ajoutez ici la logique pour soumettre la réclamation avec le texte transcrit
//     };

//     return (
//         <div>
//             <h2>Submit a Claim</h2>
//             <form onSubmit={handleSubmit}>
//                 <FormGroup>
//                     <Label htmlFor="claimText">Claim Text</Label>
//                     <Input
//                         type="textarea"
//                         name="claimText"
//                         id="claimText"
//                         value={claimText}
//                         onChange={(e) => setClaimText(e.target.value)}
//                     />
//                 </FormGroup>
//                 <div>
//                     <Button onClick={startRecording}>Start Recording</Button> {/* Bouton pour démarrer l'enregistrement vocal */}
//                     <Button onClick={stopRecording}>Stop Recording</Button> {/* Bouton pour arrêter l'enregistrement vocal */}
//                     <Button type="submit">Submit Claim</Button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default ClaimForm;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FormGroup, Label, Input, Alert } from 'reactstrap';

// const baseURL = 'http://localhost:5000';

// const ClaimForm = () => {
//   const [courses, setCourses] = useState([]);
//   const [courseId, setCourseId] = useState('');
//   const [grade, setGrade] = useState('');
//   const [description, setDescription] = useState('');
//   const [error, setError] = useState('');
//   const [submitted, setSubmitted] = useState(false);
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const response = await axios.get(`${baseURL}/courses`);
//         setCourses(response.data);
//       } catch (error) {
//         console.error('Error fetching courses:', error);
//       }
//     };

//     fetchCourses();

//     const fetchUserData = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           console.error("No token found, user not authenticated");
//           // Gérer le cas où l'utilisateur n'est pas authentifié
//           return;
//         }

//         const response = await axios.get("http://localhost:5000/api/userToken", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         if (response.data.error) {
//           console.error("Authentication Failed!");
//           // Gérer le cas où l'authentification a échoué
//           return;
//         }
//         setUserData(response.data);
//         console.log("User data:", response.data);
//       } catch (error) {
//         console.error("Error fetching user data:", error.message);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (!userData) {
//         console.error("User data not available");
//         // Gérer le cas où les données de l'utilisateur ne sont pas disponibles
//         return;
//       }
  
//       const token = localStorage.getItem("token");
//       if (!token) {
//         console.error("No token found, user not authenticated");
//         // Gérer le cas où l'utilisateur n'est pas authentifié
//         return;
//       }
  
//       const userId = userData._id; // Utiliser userData._id au lieu de userData.id
//       if (!userId) {
//         console.error("User ID not available");
//         // Gérer le cas où l'ID de l'utilisateur n'est pas disponible
//         return;
//       }
  
//       console.log("Token:", token);
//       console.log("User ID:", userId);
  
//       const response = await axios.post(`${baseURL}/claims/createClaim`, {
//         userId: userId, // Utiliser userId au lieu de studentId
//         courseId,
//         grade,
//         description
//       }, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         }
//       });
  
//       console.log('Claim submitted successfully:', response.data);
//       setSubmitted(true);
//     } catch (error) {
//       console.error('Error submitting claim:', error);
//       setError('An error occurred while submitting the claim.');
//     }
//   };
  
//   // Vérifier si les données utilisateur sont disponibles avant de soumettre le formulaire
//   const isUserDataAvailable = userData && userData.firstName && userData.lastName;

//   return (
//     <div>
//       <h2>Submit a Claim</h2>
//       {error && <div>{error}</div>}
//       <form onSubmit={handleSubmit}>
//         <FormGroup>
//           <Label htmlFor="studentName">Student</Label>
//           <Input
//             type="text"
//             name="studentName"
//             id="studentName"
//             value={isUserDataAvailable ? `${userData.firstName} ${userData.lastName}` : ''}
//             disabled
//           />
//         </FormGroup>
//         <FormGroup>
//           <Label htmlFor="courseName">Course</Label>
//           <Input
//             type="select"
//             name="courseName"
//             id="courseName"
//             value={courseId}
//             onChange={(e) => setCourseId(e.target.value)}
//           >
//             <option value="">Select Course</option>
//             {courses.map((course) => (
//               <option key={course._id} value={course._id}>
//                 {course.name}
//               </option>
//             ))}
//           </Input>
//           {submitted && !courseId && <Alert color="danger">Course is required</Alert>}
//         </FormGroup>
//         <div>
//           <label htmlFor="grade">Grade:</label>
//           <input type="text" id="grade" value={grade} onChange={(e) => setGrade(e.target.value)} />
//         </div>
//         <div>
//           <label htmlFor="description">Description:</label>
//           <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
//         </div>
//         <button type="submit" disabled={submitted || !isUserDataAvailable}>Submit Claim</button>
//       </form>
//     </div>
//   );
// };

// export default ClaimForm;
