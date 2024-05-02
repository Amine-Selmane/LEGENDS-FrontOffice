import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { FormGroup, Label, Button, Alert,Row,Col ,Input} from 'reactstrap'; // Assurez-vous que FormGroup, Label, Button et Alert sont correctement importés depuis reactstrap
import Banner from '../../Component/Banner/Banner';
import Preloader from '../Preloader';
import CallAction from '../../Component/CallAction';
import Footer from '../../Component/Footer/Footer';
import GotoTop from '../../Component/GotoTop';
import Home2Header from "../../Component/Headers/Home2Header";
import Home3Header from "../../Component/Headers/Home3Header";

const QuizAssignment = () => {
    const [grades, setGrades] = useState([]);
    const [courses, setCourses] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        studentGrade: '',
        courseId: '',
        questionIds: [],
        date: '',
        beginTime: '',
        endTime: '',
        code: '' // Ajout du champ code
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const gradesResponse = await axios.get('http://localhost:5000/grades');
                setGrades(gradesResponse.data);

                const coursesResponse = await axios.get('http://localhost:5000/courses');
                setCourses(coursesResponse.data);

                const questionsResponse = await axios.get('http://localhost:5000/questions');
                setQuestions(questionsResponse.data);

                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleChange = e => {
        const { name, value, options } = e.target;
        if (name === "questionIds") {
            const selectedIds = Array.from(options)
                .filter(option => option.selected)
                .map(option => option.value);
            setFormData({ ...formData, [name]: selectedIds });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        setSubmitted(true);
        if (formData.questionIds.length < 5 || !formData.code) { // Vérification si le code est renseigné
            return;
        }
        axios.post('http://localhost:5000/quiz/createQuiz', formData)
            .then(response => {
                console.log('Quiz added successfully:', response.data);
                window.location.href = '/quiz';
            })
            .catch(error => {
                console.error('Error adding quiz:', error);
            });
    };

    return (
        <div className="student-report">
            <Home3Header />
            <Banner title="Add Quiz" background="assets/images/banner.jpg" />

            <section className="coursepage-section">
                <div className="container">
                    {isLoading ? (
                        <Preloader />
                    ) : (
                        <Row className="justify-content-center">
                            <Col md={8}>
                                <h2 style={{ textAlign: 'center' }}>Add Quiz</h2>

                                <Form onSubmit={handleSubmit}>
                                  
                                <FormGroup>
        <Label htmlFor="studentGrade">Grade</Label>
        <Form.Select
          aria-label="Grade"
          name="studentGrade"
          id="studentGrade"
          value={formData.studentGrade}
          onChange={handleChange}
        >
          <option value="">Select Grade</option>
          {grades.map(grade => (
            <option key={grade} value={grade}>
              {grade}
            </option>
          ))}
        </Form.Select>
      </FormGroup>

      {/* Autres champs du formulaire */}

      <FormGroup>
        <Label htmlFor="courseId">Course</Label>
        <Form.Select
          aria-label="Course"
          name="courseId"
          id="courseId"
          value={formData.courseId}
          onChange={handleChange}
        >
          <option value="">Select Course</option>
          {courses.map(course => (
            <option key={course._id} value={course._id}>
              {course.name}
            </option>
          ))}
        </Form.Select>
        {submitted && formData.courseId === '' && <Alert color="danger">Course is required</Alert>}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="questionIds">Question</Label>
        <Form.Select
          aria-label="Question"
          name="questionIds"
          id="questionIds"
          value={formData.questionIds}
          onChange={handleChange}
          multiple 
        >
          <option value="">Select Question</option>
          {questions.map(question => (
            <option key={question._id} value={question._id}>
              {question.content}
            </option>
          ))}
        </Form.Select>
        {submitted && formData.questionIds.length < 5 && <Alert color="danger">Please select at least 5 questions</Alert>}
      </FormGroup>
              <FormGroup>
                <Label htmlFor="date">Date</Label>
                <Input
                  type="date"
                  name="date"
                  id="date"
                  value={formData.date}
                  onChange={handleChange}
                />
                {submitted && formData.date === '' && <Alert color="danger">Date is required</Alert>}
              </FormGroup>
              <FormGroup>
                <Label htmlFor="beginTime">Begin Time</Label>
                <Input
                  type="time"
                  name="beginTime"
                  id="beginTime"
                  value={formData.beginTime}
                  onChange={handleChange}
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
                                        />
                                          {submitted && formData.code === '' && <Alert color="danger">Code is required</Alert>}
                                    </FormGroup>
                                    <Button color="primary" type="submit">Add Quiz</Button>
                                </Form>
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

export default QuizAssignment;
