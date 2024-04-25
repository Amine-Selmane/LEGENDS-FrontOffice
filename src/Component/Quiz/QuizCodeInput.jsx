import React, { useState } from 'react';
import axios from 'axios';
import { Button, Input, FormGroup, Label, Alert } from 'reactstrap';
import Banner from '../../Component/Banner/Banner';
import Preloader from '../Preloader';
import CallAction from '../../Component/CallAction';
import Footer from '../../Component/Footer/Footer';
import GotoTop from '../../Component/GotoTop';
import Home3Header from "../../Component/Headers/Home3Header";

const QuizCodeInput = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!code) {
      setError('Please enter a quiz code.');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/quiz/getQuizByCode/${code}`);
      const quiz = response.data.quiz;
      if (quiz) {
        window.location.href = `/QuizDisplay/${code}`;
      } else {
        setError('No quiz found with the provided code.');
      }
    } catch (error) {
      console.error('Error fetching quiz:', error);
      setError('An error occurred while fetching the quiz.');
    }
  };

  return (
    <div>
      <FormGroup>
        <Label for="quizCode">Enter Quiz Code:</Label>
        <Input
          type="text"
          name="quizCode"
          id="quizCode"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter quiz code"
        />
      </FormGroup>
      {error && <Alert color="danger">{error}</Alert>}
      <Button color="primary" onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default QuizCodeInput;
