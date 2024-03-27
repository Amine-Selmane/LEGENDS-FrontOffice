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

const RegisterFormik = () => {
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState('');
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [availability, setAvailability] = useState([{ jour: '', heureDebut: '', heureFin: '' }]);

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
    availability: [{ jour: '', heureDebut: '', heureFin: '' }],


  };

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
  
  const handleAddAvailability = () => {
    // Add an empty availability slot with initialized time fields
    setAvailability((prevAvailability) => [...prevAvailability, { jour: '', heureDebut: '', heureFin: '' }]);
  };

  const handleRemoveAvailability = (index) => {
    // Remove the availability slot at the specified index
    setAvailability((prevAvailability) => [...prevAvailability.slice(0, index), ...prevAvailability.slice(index + 1)]);
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
        availability,
        acceptTerms,
      } = fields;
  
      // Format the date before sending
      const formattedDateNaiss = dateNaiss.toISOString().split('T')[0]; // Format 'yyyy-MM-dd'
  
      /// Assurez-vous que les données de disponibilité sont correctement formatées
const formattedAvailability = availability.map((avail) => ({
  jour: avail.jour,
  heureDebut: avail.heureDebut,
  heureFin: avail.heureFin,
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
                      <Container>
                        <Label>Availability</Label>
                        {availability.map((avail, index) => (
                          <div key={index}>
                            <Row>
                              <Col>
                                <FormGroup>
                                  <Label htmlFor={`jour_${index}`}>Day *</Label>
                                  <div className="mb-2">
                                    <Field
                                      name={`availability[${index}].jour`}
                                      as="select"
                                      className={`form-control ${
                                        errors.availability &&
                                        errors.availability[index]?.jour &&
                                        touched.availability &&
                                        touched.availability[index]?.jour
                                          ? 'is-invalid'
                                          : ''
                                      }`}
                                    >
                                      <option value="">Select</option>
                                      <option value="lundi">Lundi</option>
                                      <option value="mardi">Mardi</option>
                                      <option value="mercredi">Mercredi</option>
                                      <option value="jeudi">Jeudi</option>
                                      <option value="vendredi">Vendredi</option>
                                      <option value="samedi">Samedi</option>
                                      <option value="dimanche">Dimanche</option>
                                    </Field>
                                    <ErrorMessage
                                      name={`availability[${index}].jour`}
                                      component="div"
                                      className="text-danger"
                                    />
                                  </div>
                                </FormGroup>
                              </Col>
                              <Col>
                                <FormGroup>
                                  <Label htmlFor={`heureDebut_${index}`}>Start Hour *</Label>
                                  <div className="mb-2">
                                    <Field
                                      name={`availability[${index}].heureDebut`}
                                      type="text"
                                      className={`form-control ${
                                        errors.availability &&
                                        errors.availability[index]?.heureDebut &&
                                        touched.availability &&
                                        touched.availability[index]?.heureDebut
                                          ? 'is-invalid'
                                          : ''
                                      }`}
                                      placeholder="HH:mm"
                                    />
                                    <ErrorMessage
                                      name={`availability[${index}].heureDebut`}
                                      component="div"
                                      className="text-danger"
                                    />
                                  </div>
                                </FormGroup>
                              </Col>
                              <Col>
                                <FormGroup>
                                  <Label htmlFor={`heureFin_${index}`}>End Hour *</Label>
                                  <div className="mb-2">
                                    <Field
                                      name={`availability[${index}].heureFin`}
                                      type="text"
                                      className={`form-control ${
                                        errors.availability &&
                                        errors.availability[index]?.heureFin &&
                                        touched.availability &&
                                        touched.availability[index]?.heureFin
                                          ? 'is-invalid'
                                          : ''
                                      }`}
                                      placeholder="HH:mm"
                                    />
                                    <ErrorMessage
                                      name={`availability[${index}].heureFin`}
                                      component="div"
                                      className="text-danger"
                                    />
                                  </div>
                                </FormGroup>
                              </Col>
                            </Row>
                          </div>
                        ))}
                      </Container>

                      {/* Boutons pour ajouter ou supprimer une disponibilité */}
                      <FormGroup>
                        <Button type="button" color="primary" onClick={handleAddAvailability}>
                          Add Availability
                        </Button>{' '}
                        {availability.length > 0 && (
                          <Button type="button" color="danger" onClick={() => handleRemoveAvailability(availability.length - 1)}>
                            Remove Availability
                          </Button>
                        )}
                      </FormGroup>
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
                                    </CardBody>
                                  </Card>
                                </Col>
                              </Row>
                            </Container>
                          </div>
                        );
                      };

export default RegisterFormik;