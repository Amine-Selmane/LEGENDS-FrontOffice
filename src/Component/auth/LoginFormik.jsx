import React , { useState }from 'react';
import { Button, Label, FormGroup, Container, Row, Col, Card, CardBody, Input } from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making HTTP requests
import toast, { Toaster } from 'react-hot-toast';
import logo from '../../logos/logo.png';
import './LoginFormik.css';




const LoginFormik = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const navigate = useNavigate();

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleLogin = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', values);
      const { token, role } = response.data;
      if (role === 'student') {
        localStorage.setItem('token', token);
        navigate('/home-2');
      } else if (role === 'teacher'){
        localStorage.setItem('token', token);
        navigate('/home-3');
        
      } else {
        window.location.href = 'http://localhost:3000/auth/loginFormik';
      }
    } catch (error) {
      if (error.response) {
        setErrors({ password: 'Invalid username or password' });
      } else {
        console.error('Error:', error.message);
      }
    }
    setSubmitting(false);
  };

  return (
    <div className="login-page"> 
      <Container fluid className="h-100">
        <Row className="justify-content-center align-items-center h-100">
          <Col lg="12" className="login-form-container">
            <Card>
              <CardBody className="p-4 m-1 login-form">
                <div className="login-logo-container">
                  <img src={logo} alt="Logo" className="login-logo" />
                </div>
                <h5 className="mb-0">Login</h5>
                <small className="pb-4 d-block small">
                  Do not have an account? <Link to="/register">Sign Up</Link>
                </small>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleLogin}
                  render={({ errors, touched }) => (
                    <Form>
                      <FormGroup>
                        <Label htmlFor="username">Username</Label> {/* Change label to Username */}
                        <Field
                          name="username" // Change name to username
                          type="text"
                          className={`form-control${
                            errors.username && touched.username ? ' is-invalid' : ''
                          }`}
                        />
                        <ErrorMessage name="username" component="div" className="invalid-feedback" /> {/* Change name to username */}
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="password">Password</Label>
                        <Field
                          name="password"
                          type="password"
                          className={`form-control${
                            errors.password && touched.password ? ' is-invalid' : ''
                          }`}
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="invalid-feedback"
                        />
                      </FormGroup>

                      <FormGroup className="d-flex justify-content-center">
                        <Button type="submit" color="primary" className="me-2">
                          Login
                        </Button>
                      </FormGroup>
                      <FormGroup className="form-check d-flex align-items-center">
                          
                          <div style={{ marginRight: '170px' }}></div> {/* Élément vide avec une marge de droite */}
                          
                          <Link className="text-decoration-none small" to="/recovery">
                            <small>Forgot Password?</small>
                          </Link>
                       </FormGroup>
                    </Form>
                  )}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <Toaster position='top-center' reverseOrder={false} />
    </div>
  );
};

export default LoginFormik;
