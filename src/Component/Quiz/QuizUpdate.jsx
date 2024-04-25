import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Col, Button, Form, FormGroup, Label, Input, Row } from 'reactstrap';
import Banner from '../../Component/Banner/Banner';
import Preloader from '../Preloader';
import CallAction from '../../Component/CallAction';
import Footer from '../../Component/Footer/Footer';
import GotoTop from '../../Component/GotoTop';
import Home3Header from "../../Component/Headers/Home3Header";

const QuizUpdate = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    studentGrade: '',
    courseName: '',
    selectedQuestions: [],
    allQuestions: [],
    date: '',
    beginTime: '',
    endTime: '',
    code: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/quiz/getQuizById/${id}`)
      .then(response => {
        const quizData = response.data.quiz;
        if (!quizData || !quizData.studentGrade || !quizData.course) {
          console.error('Quiz data is invalid:', quizData);
          return;
        }
        const { course, questions, date, beginTime, endTime, code } = quizData;
        const formattedDate = new Date(date).toISOString().split('T')[0];
        const questionContents = questions.map(question => ({ _id: question._id, content: question.content }));
        const selectedQuestionIds = questions.map(question => question._id); // IDs des questions sélectionnées
        setFormData({
          studentGrade: quizData.studentGrade,
          courseName: course.name,
          selectedQuestions: selectedQuestionIds, // Utiliser les IDs des questions sélectionnées
          allQuestions: questionContents,
          date: formattedDate,
          beginTime,
          endTime,
          code
        });
      })
      .catch(error => console.error('Error fetching quiz:', error))
      .finally(() => setIsLoading(false));
  }, [id]);
  

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = e => {
    e.preventDefault();
    const { date, beginTime, endTime, selectedQuestions, code } = formData;
    if (selectedQuestions.length === 0) {
      console.error('No questions selected');
      return;
    }
    axios.put(`http://localhost:5000/quiz/updateQuiz/${id}`, { date, beginTime, endTime, questionIds: selectedQuestions, code })
      .then(response => {
        console.log('Quiz updated successfully:', response.data.quiz);
        window.location.href = '/quiz';
      })
      .catch(error => console.error('Error updating quiz:', error));
  };

  return (
    <div className="student-report">
      <Home3Header />
      <Banner title="Update Quiz" background="assets/images/banner.jpg" />

      <section className="coursepage-section">
        <div className="container">
          {isLoading ? (
            <Preloader />
          ) : (
            <Row className="justify-content-center">
              <Col md={8}>
                <h2 style={{ textAlign: 'center' }}>Update Quiz</h2>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label htmlFor="studentGrade">Student Grade</Label>
                    <Input
                      type="text"
                      name="studentGrade"
                      id="studentGrade"
                      value={formData.studentGrade}
                      disabled
                      placeholder="studentGrade"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="courseName">Course Name</Label>
                    <Input
                      type="text"
                      name="courseName"
                      id="courseName"
                      value={formData.courseName}
                      disabled
                      placeholder="Course Name"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="selectedQuestions">Questions</Label>
                    <Input
                      type="select"
                      name="selectedQuestions"
                      id="selectedQuestions"
                      multiple
                      disabled // Désactiver le champ de sélection
                      onChange={handleChange}
                    >
                      {formData.allQuestions.map(question => (
                        <option key={question._id} value={question._id} disabled>{question.content}</option> // Désactiver les options
                      ))}
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      type="date"
                      name="date"
                      id="date"
                      value={formData.date}
                      onChange={handleChange}
                      placeholder="Date"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="beginTime">Begin Time</Label>
                    <Input
                      type="time"
                      name="beginTime"
                      id="beginTime"
                      value={formData.beginTime}
                      onChange={handleChange}
                      placeholder="Begin Time"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="endTime">End Time</Label>
                    <Input
                      type="time"
                      name="endTime"
                      id="endTime"
                      value={formData.endTime}
                      onChange={handleChange}
                      placeholder="End Time"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="code">Code</Label>
                    <Input
                      type="text"
                      name="code"
                      id="code"
                      value={formData.code}
                      onChange={handleChange}
                      placeholder="Code"
                    />
                  </FormGroup>
                  <Button color="primary" type="submit">Update Quiz</Button>
                </Form>
                {formData.selectedQuestions.length === 0 && (
                  <p style={{ color: 'red' }}>Please select at least one question</p>
                )}
              </Col>
            </Row>
          )}
        </div>
      </section>
      <CallAction btnClass="bisylms-btn" />
      <Footer />
      <GotoTop />
    </div>
  );
};

export default QuizUpdate;
