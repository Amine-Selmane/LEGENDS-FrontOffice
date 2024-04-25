// QuizDisplay.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './styles/QuizDisplay.css'; // Assurez-vous d'importer le fichier CSS pour les styles personnalisés
import Home3Header from "../../Component/Headers/Home3Header";
import Footer from '../../Component/Footer/Footer';
import GotoTop from '../../Component/GotoTop';
import Preloader from '../Preloader';
import Banner from '../../Component/Banner/Banner';

const QuizDisplay = () => {
  const { code } = useParams();
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState('');
  const [responses, setResponses] = useState({});

  useEffect(() => {
    const fetchQuizQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/quiz/getQuizByCode/${code}`);
        const questionIds = response.data.quiz.questions;
        const questionDetails = await Promise.all(questionIds.map(async (questionId) => {
          const questionResponse = await axios.get(`http://localhost:5000/quiz/question/${questionId}`);
          return questionResponse.data.question;
        }));
        setQuestions(questionDetails);
      } catch (error) {
        console.error('Error fetching quiz questions:', error);
        setError('An error occurred while fetching quiz questions.');
      }
    };
    fetchQuizQuestions();
  }, [code]);

  const handleResponseSelection = (questionId, optionIndex) => {
    setResponses({ ...responses, [questionId]: optionIndex });
  };

  const handleSubmitQuiz = () => {
    // Ajoutez ici la logique pour envoyer les réponses du quiz
    console.log('Responses:', responses);
  };

  return (
    <div className="quiz-container">
      {error && <div>{error}</div>}
      <div className="quiz-frame">
      <h2 className="quiz-title">Pass your quiz</h2> {/* Ajout du titre violet */}
        {questions && questions.map((question, index) => (
          <div key={index} className="question-container">
            <h3>{` ${index + 1}/ ${question.content}`}</h3> {/* Numérotation de la question */}
            <ul>
              {question.options && question.options.map((option, idx) => (
                <ul key={idx}>
                  <input
                    type={question.type === 'single' ? 'radio' : 'checkbox'}
                    name={`question-${index}`}
                    value={option}
                    checked={responses[question._id] === idx}
                    onChange={() => handleResponseSelection(question._id, idx)}
                  />
                  <label>{option}</label>
                </ul>
              ))}
            </ul>
          </div>
        ))}
        {/* Bouton pour soumettre le quiz */}
        <button className="submit-button" onClick={handleSubmitQuiz}>Submit Quiz</button>
      </div>
    </div>
  );
};

export default QuizDisplay;
