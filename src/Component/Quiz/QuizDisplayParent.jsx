// QuizDisplayParent.jsx
import React, { useState } from 'react';
import QuizCodeInput from './QuizCodeInput';

const QuizDisplayParent = () => {
  const [questions, setQuestions] = useState([]);

  return (
    <div>
      <h1>Welcome to the Quiz App</h1>
      <QuizCodeInput setQuestions={setQuestions} />
      {/* Afficher les questions ici en utilisant le state 'questions' */}
      <ul>
        {questions.map((question, index) => (
          <li key={index}>{question.content}</li>
        ))}
      </ul>
    </div>
  );
};
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import QuizDisplay from './QuizDisplay'; // Importez le composant QuizDisplay

// const QuizDisplayParent = () => {
//   const [questions, setQuestions] = useState([]);

//   // Récupérer les questions depuis l'API (exemple de méthode)
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/quiz/getAllQuestions/all');
//         setQuestions(response.data.questions);
//       } catch (error) {
//         console.error('Error fetching questions:', error);
//       }
//     };

//     fetchQuestions();
//   }, []);

//   return (
//     <div>
//       <h2>Quiz Display</h2>
//       <QuizDisplay questions={questions} /> {/* Passez les questions en tant que props */}
//     </div>
//   );
// };

export default QuizDisplayParent;

