import React, { useState , useEffect} from 'react';
import axios from 'axios';
import { Button, Label, FormGroup, Container, Row, Col, Card, CardBody,Input } from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../logos/logo.png';
import './RegisterFormik.css';
import { Table } from 'react-bootstrap';
import Modal from '@mui/material/Modal';
import { GoogleOAuthProvider,GoogleLogin } from '@react-oauth/google';

const RegisterFormik = () => {
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState('');
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [availability, setAvailability] = useState([{ jour: '', heureDebut: '', heureFin: '' }]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const initialValues = {
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    dateNaiss: new Date(),
    sexe: '',
    role: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    selectedCourses: [], // Ajout de selectedCourses dans les valeurs initiales
    availability: [],


  };
  const handleCheckboxChange = (e) => {
    const slotName = e.target.name;
    const [jour, heureDebut, heureFin] = slotName.split('_').slice(0, 3);
    const isChecked = e.target.checked;

    setSelectedSlots(prevSelectedSlots => {
      if (isChecked) {
        const newSlot = { jour, heureDebut, heureFin };
        console.log('Slot added:', newSlot);
        return [...prevSelectedSlots, newSlot];
      } else {
        const filteredSlots = prevSelectedSlots.filter(slot => !(slot.jour === jour && slot.heureDebut === heureDebut && slot.heureFin === heureFin));
        console.log('Slot removed:', { jour, heureDebut, heureFin });
        return filteredSlots;
      }
    });
  };

  // Utilisez selectedSlots pour effectuer les opérations nécessaires, comme les stocker dans une base de données.
  console.log('Selected slots:', selectedSlots);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:5000/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    }

    fetchData();

    // Cleanup function if needed
    return () => {
      // Any cleanup code goes here
    };
  }, []);

  const handleCourseSelect = (e) => {
    const courseId = e.target.value;
    const isChecked = e.target.checked;
  
    setSelectedCourses(prevState => {
      if (isChecked) {
        return [...prevState, courseId];
      } else {
        return prevState.filter(id => id !== courseId);
      }
    });
  
    // Afficher les IDs des cours sélectionnés dans la console
    setSelectedCourses(updatedCourses => {
      console.log('Selected Course IDs:', updatedCourses);
      return updatedCourses; // Assurez-vous de retourner les cours mis à jour
    });
  };
  
 

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    userName: Yup.string().required('User Name is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    dateNaiss: Yup.date().required('Date is required'),
    sexe: Yup.string().required('Gender is required'),
    role: Yup.string().required('Role is required'),
    availability: Yup.array().of(
      Yup.object().shape({
        jour: Yup.string().required('Day is required'),
        heureDebut: Yup.string().required('Start Hour is required'),
        heureFin: Yup.string().required('End Hour is required'),
      })
    ),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    acceptTerms: Yup.bool().oneOf([true], 'Accept Terms & Conditions is required'),
    
  });


  const handleSubmit = async (fields) => {
    try {
      const {
        firstName,
        lastName,
        userName,
        email,
        password,
        dateNaiss,
        role,
        sexe,
        address,
        mobile,
        acceptTerms,
      } = fields;
  
      // Format the date before sending
      const formattedDateNaiss = dateNaiss.toISOString().split('T')[0]; // Format 'yyyy-MM-dd'
  
      /// Assurez-vous que les données de disponibilité sont correctement formatées
      const formattedAvailability = selectedSlots.map((slot) => ({
        jour: slot.jour,
        heureDebut: slot.heureDebut,
        heureFin: slot.heureFin,
      }));
  
      // Construire l'objet d'utilisateur à envoyer au backend
      const userObject = {
        username: userName,
        password,
        firstName,
        lastName,
        profile: uploadedFile,
        email,
        dateNaiss: formattedDateNaiss,
        address,
        mobile,
        sexe,
        role,
        courses: selectedCourses,
        availability: formattedAvailability,
      };
  
      // Envoyer la requête POST au backend
      const response = await axios.post('http://localhost:5000/api/register', userObject);
  
      // Vérifier la réponse du backend
      if (response.status === 201) {
        // L'enregistrement a réussi
        alert('Registration successful!');
        navigate('/login');
      } else {
        // L'enregistrement a échoué pour une raison quelconque
        throw new Error('Registration failed. Please try again.');
      }
    } catch (error) {
      // Gérer les erreurs
      console.error('Registration failed:', error);
      alert(error.message || 'Registration failed. Please try again.');
    }
  };
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setUploadedFile(base64);
  };


  const responseGoogle = (response) => {
    console.log('Google response:', response);
  
    // Check if profileObj exists
    if (response.profileObj) {
      // Destructure properties if profileObj exists
      const { givenName, familyName, email, imageUrl } = response.profileObj;
      // Remplir le formulaire d'inscription avec les données récupérées
      const fields = {
        firstName: givenName,
        lastName: familyName,
        email: email,
        profilePicture: imageUrl,
        // Vous pouvez également préremplir d'autres champs si vous le souhaitez
      };
      handleSubmit(fields); // Appeler la fonction handleSubmit avec les données récupérées
    } else {
      console.error("Profile object is undefined in response.");
    }
  };
  
  
  const handleErrorGoogle = (error) => {
    console.error('Error during Google login:', error);
  };

  return (
<div className="register-page"> 
  <Container fluid className="h-100">
    <Row className="justify-content-center align-items-center h-100">
      <Col lg="12" className="loginContainer">
        <Card>
          <CardBody className="p-4 m-1">
            <div className="logo-container">
              <img src={logo} alt="Logo" className="logo" />
            </div>
            <h5 className="mb-0">Register</h5>
            <small className="pb-4 d-block small" >
              Already have an account? <Link to="/login">Login</Link>
            </small>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                  render={({ errors, touched }) => (
                    <Form>
                        <FormGroup>
                          <Label htmlFor="firstName">First Name</Label>
                          <Field
                            name="firstName"
                            type="text"
                            className={`form-control ${
                              errors.firstName && touched.firstName ? ' is-invalid' : ''
                            }`}
                          />
                          <ErrorMessage
                            name="firstName"
                            component="div"
                            className="invalid-feedback"
                          />
                        </FormGroup>

                        <FormGroup>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Field
                            name="lastName"
                            type="text"
                            className={`form-control ${
                              errors.lastName && touched.lastName ? ' is-invalid' : ''
                            }`}
                          />
                          <ErrorMessage
                            name="lastName"
                            component="div"
                            className="invalid-feedback"
                          />
                        </FormGroup>

                        <FormGroup>
                          <Label htmlFor="userName">User Name</Label>
                          <Field
                            name="userName"
                            type="text"
                            className={`form-control ${
                              errors.userName && touched.userName ? ' is-invalid' : ''
                            }`}
                          />
                          <ErrorMessage
                            name="userName"
                            component="div"
                            className="invalid-feedback"
                          />
                        </FormGroup>

                        <FormGroup>
                          <Label htmlFor="email">Email</Label>
                          <Field
                            name="email"
                            type="email"
                            className={`form-control ${
                              errors.email && touched.email ? ' is-invalid' : ''
                            }`}
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="invalid-feedback"
                          />
                        </FormGroup>
                        


                        <FormGroup>
                        <Label htmlFor="dateNaiss">Birthdate  </Label><br/>
                        <Field name="dateNaiss">
                          {({ field, form }) => (
                            <DatePicker
                              {...field}
                              selected={field.value}
                              onChange={(date) => form.setFieldValue(field.name, date)}
                              className={`form-control ${errors.dateNaiss && touched.dateNaiss ? 'is-invalid' : ''}`}
                              dateFormat="yyyy-MM-dd" // Format de date
                            />
                          )}
                        </Field>
                        <ErrorMessage name="dateNaiss" component="div" className="invalid-feedback" />
                      </FormGroup>


                      <FormGroup>
                          <Label htmlFor="sexe">Gender</Label>
                          <Field
                            name="sexe"
                            as="select"
                            className={`form-control ${
                              errors.sexe && touched.sexe ? ' is-invalid' : ''
                            }`}
                          >
                            <option value="" disabled hidden>Select Gender</option>
                            <option value="male">Man</option>
                            <option value="female">Woman</option>
                            <option value="other">Other</option>
                          </Field>
                          <ErrorMessage
                            name="sexe"
                            component="div"
                            className="invalid-feedback"
                          />
                      </FormGroup>
                      <FormGroup>
                          <Label htmlFor="role">Select Role</Label>
                          <Field
                            name="role"
                            as="select"
                            className={`form-control ${
                              errors.role && touched.role ? ' is-invalid' : ''
                            }`}
                          >
                            <option value="" disabled hidden>Select your role</option>
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                          </Field>
                          <ErrorMessage
                            name="role"
                            component="div"
                            className="invalid-feedback"
                          />
                        </FormGroup>
                        

                        <FormGroup>
                          <Label htmlFor="password">Password</Label>
                          <Field
                            name="password"
                            type="password"
                            className={`form-control ${
                              errors.password && touched.password ? ' is-invalid' : ''
                            }`}
                          />
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="invalid-feedback"
                          />
                        </FormGroup>

                        <FormGroup>
                          <Label htmlFor="confirmPassword">Confirm Password</Label>
                          <Field
                            name="confirmPassword"
                            type="password"
                            className={`form-control ${
                              errors.confirmPassword && touched.confirmPassword
                                ? ' is-invalid'
                                : ''
                            }`}
                          />
                          <ErrorMessage
                            name="confirmPassword"
                            component="div"
                            className="invalid-feedback"
                          />
                        </FormGroup>

                        <FormGroup>
                          <Label htmlFor="profile">Profile Picture</Label>
                          <Field
                            name="profile"
                            type="file"
                            className={`form-control ${
                              errors.profile && touched.profile ? ' is-invalid' : ''
                            }`}
                            onChange={onUpload}
                          />
                          <ErrorMessage
                            name="profile"
                            component="div"
                            className="invalid-feedback"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label>Select Courses</Label>
                          <Row>
                            {courses.map(course => (
                              <Col md="3" key={course._id}>
                                <Label check>
                                  <Input
                                    type="checkbox"
                                    value={course._id}
                                    onChange={handleCourseSelect}
                                    checked={selectedCourses.includes(course._id)}
                                  />
                                  {course.name}
                                </Label>
                              </Col>
                            ))}
                          </Row>
                       </FormGroup>
                        {/* Disponibilité */}
                        <Button onClick={handleOpen}>Click to Add your availability</Button>
                          <Modal
                            keepMounted
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="keep-mounted-modal-title"
                            aria-describedby="keep-mounted-modal-description"
                            style={{ maxHeight: '900px', overflowY: 'auto', maxWidth:'900px',marginLeft:'300px',backgroundColor:'white' }}
                          >   
                                        
                          <Table striped bordered responsive  >
                          
                          <tbody >
                            {/* Adjust maxHeight as per your requirement */}
                      <tr className="tr_pair" style={{ backgroundColor: '#ffff' }}>
                      <th></th>
                      <th style={{whiteSpace: 'nowrap'}}>MONDAY</th>
                      <th style={{whiteSpace: 'nowrap'}}>TUESDAY</th>
                      <th style={{whiteSpace: 'nowrap'}}>WEDNESDAY</th>
                      <th style={{whiteSpace: 'nowrap'}}>THURSDAY</th>
                      <th style={{whiteSpace: 'nowrap'}}>FRIDAY</th>
                      <th style={{whiteSpace: 'nowrap'}}>SATURDAY</th>
                      <th style={{whiteSpace: 'nowrap'}}>SUNDAY</th>
                    </tr>

                    <tr className="tr_impair">																	
                    <td >10:00-10:30</td>
                    <td colSpan="5"></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="saturday_10:00_10:30" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="sunday_10:00_10:30" onChange={handleCheckboxChange} /></td>
                    </tr>
                    <tr className="tr_pair">
                      <td>10:30-11:00</td>
                      <td colSpan="5"></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="saturday_10:30_11:00" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="sunday_10:30_11:00" onChange={handleCheckboxChange} /></td>
                    </tr>
                    <tr className="tr_impair">
                      <td>11:00-11:30</td>
                      <td colSpan="5"></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="saturday_11:00_11:30" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="sunday_11:00_11:30" onChange={handleCheckboxChange} /></td>
                    </tr>
                    <tr className="tr_pair">
                      <td>11:30-12:00</td>
                      <td colSpan="5"></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="saturday_11:30_12:00" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="sunday_11:30_12:00" onChange={handleCheckboxChange} /></td>
                    </tr>
                    <tr className="tr_impair">
                      <td>12:00-12:30</td>
                      <td colSpan="5"></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="saturday_12:00_12:30" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="sunday_12:00_12:30" onChange={handleCheckboxChange} /></td>
                    </tr>
                    <tr className="tr_pair">
                      <td >12:30-13:00</td>
                      <td colSpan="5"></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="saturday_12:30_13:00" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="sunday_12:30_13:00" onChange={handleCheckboxChange} /></td>
                    </tr>
                    <tr className="tr_impair">
                      <td>13:00-13:30</td>
                      <td colSpan="5"></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="saturday_13:00_13:30" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="sunday_13:00_13:30" onChange={handleCheckboxChange} /></td>
                    </tr>
                    <tr className="tr_pair">
                      <td>13:30-14:00</td>	
                      <td colSpan="5"></td>										
                      <td style={{ textAlign: 'center' }}> <Input type="checkbox" name="saturday_13:30_14:00" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="sunday_13:30_14:00" onChange={handleCheckboxChange} /></td>
                    </tr>
                    <tr className="tr_impair">
                      <td>14:00-14:30</td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="monday_14:00_14:30" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="tuesday_14:00_14:30" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="wednesday_14:00_14:30" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="thursday_14:00_14:30" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="friday_14:00_14:30" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="saturday_14:00_14:30" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="sunday_14:00_14:30" onChange={handleCheckboxChange} /></td>
                    </tr>
                    <tr className="tr_pair">
                      <td>14:30-15:00</td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="monday_14:30_15:00" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="tuesday_14:30_15:00" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="wednesday_14:30_15:00" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="thursday_14:30_15:00" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="friday_14:30_15:00" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="saturday_14:30_15:00" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="sunday_14:30_15:00" onChange={handleCheckboxChange} /></td>
                    </tr>
                    <tr className="tr_impair">
                      <td>15:00-15:30</td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="monday_15:00_15:30" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="tuesday_15:00_15:30" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="wednesday_15:00_15:30" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="thursday_15:00_15:30" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="friday_15:00_15:30" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="saturday_15:00_15:30" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="sunday_15:00_15:30" onChange={handleCheckboxChange} /></td>
                    </tr>
                    <tr className="tr_pair">
                      <td>15:30-16:00</td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="monday_15:30_16:00" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="tuesday_15:30_16:00" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="wednesday_15:30_16:00" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="thursday_15:30_16:00" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="friday_15:30_16:00" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="saturday_15:30_16:00" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="sunday_15:30_16:00" onChange={handleCheckboxChange} /></td>
                    </tr>
                    <tr className="tr_impair">
                      <td>16:00-16:30</td>
                      <td style={{ textAlign: 'center' }}>  <Input type="checkbox" name="monday_16:00_16:30" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="tuesday_16:00_16:30" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="wednesday_16:00_16:30" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="thursday_16:00_16:30" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="friday_16:00_16:30" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="saturday_16:00_16:30" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="sunday_16:00_16:30" onChange={handleCheckboxChange} /></td>
                    </tr>
                    <tr className="tr_pair">
                      <td>16:30-17:00</td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="monday_16:30_17:00" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="tuesday_16:30_17:00" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="wednesday_16:30_17:00" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="thursday_16:30_17:00" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="friday_16:30_17:00" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="saturday_16:30_17:00" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="sunday_16:30_17:00" onChange={handleCheckboxChange} /></td>
                    </tr>
                    <tr className="tr_impair">
                      <td>17:00-17:30</td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="monday_17:00_17:30" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="tuesday_17:00_17:30" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="wednesday_17:00_17:30" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="thursday_17:00_17:30" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="friday_17:00_17:30" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="saturday_17:00_17:30" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="sunday_17:00_17:30" onChange={handleCheckboxChange} /></td>
                    </tr>
                    <tr className="tr_pair">
                      <td>17:30-18:00</td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="monday_17:30_18:00" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="tuesday_17:30_18:00" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="wednesday_17:30_18:00" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="thursday_17:30_18:00" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="friday_17:30_18:00" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="saturday_17:30_18:00" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="sunday_17:30_18:00" onChange={handleCheckboxChange} /></td>
                    </tr>
                    <tr className="tr_impair">
                      <td>18:00-18:30</td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="monday_18:00_18:30" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="tuesday_18:00_18:30" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="wednesday_18:00_18:30" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="thursday_18:00_18:30" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="friday_18:00_18:30" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="saturday_18:00_18:30" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="sunday_18:00_18:30" onChange={handleCheckboxChange} /></td>
                    </tr>
                    <tr className="tr_pair">
                      <td>18:30-19:00</td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="monday_18:30_19:00" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="tuesday_18:30_19:00" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="wednesday_18:30_19:00" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="thursday_18:30_19:00" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="friday_18:30_19:00" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="saturday_18:30_19:00" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="sunday_18:30_19:00" onChange={handleCheckboxChange} /></td>
                    </tr>
                    <tr className="tr_impair">
                      <td >19:00-19:30</td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="monday_19:00_19:30" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="tuesday_19:00_19:30" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="wednesday_19:00_19:30" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="thursday_19:00_19:30" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="friday_19:00_19:30" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="saturday_19:00_19:30" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="sunday_19:00_19:30" onChange={handleCheckboxChange} /></td>
                    </tr>
                    <tr className="tr_pair">
                      <td>19:30-20:00</td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="monday_19:30_20:00" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="tuesday_19:30_20:00" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="wednesday_19:30_20:00" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="thursday_19:30_20:00" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="friday_19:30_20:00" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="saturday_19:30_20:00" onChange={handleCheckboxChange} /></td>
                      <td style={{ textAlign: 'center' }}><Input type="checkbox" name="sunday_19:30_20:00" onChange={handleCheckboxChange} /></td>
                    </tr>

                    </tbody></Table>
                    </Modal>

                        <FormGroup>
                          <Field
                            type="checkbox"
                            name="acceptTerms"
                            className={`form-check-input ${
                              errors.acceptTerms && touched.acceptTerms ? ' is-invalid' : ''
                            }`}
                          />
                          <Label htmlFor="acceptTerms" className="form-check-label">
                            I accept the Terms & Conditions
                          </Label>
                          <ErrorMessage
                            name="acceptTerms"
                            component="div"
                            className="invalid-feedback"
                          />
                        </FormGroup>

                        <div className="mt-4 text-center">
                          <Button type="submit" color="primary" className="w-md">
                            Register
                          </Button>
                        </div>
                      </Form>

                                        )}
                                      />
                                      <GoogleOAuthProvider
                              clientId="896312425867-1lca6buc68keb943v602n1n6adi72hn9.apps.googleusercontent.com"
                              >
                             <GoogleLogin
                                buttonText="Sign in with Google"
                                onSuccess={responseGoogle}
                                onFailure={handleErrorGoogle}
                                cookiePolicy={'single_host_origin'}
                              />
                              </GoogleOAuthProvider>
                                    </CardBody>
                                  </Card>
                                </Col>
                              </Row>
                              
                            </Container>
                           
                          </div>
                        );
                      };

export default RegisterFormik;