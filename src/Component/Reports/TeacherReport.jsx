import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Header from '../../Component/Headers';
import Home3Header from "../../Component/Headers/Home3Header";
import Home2Header from "../../Component/Headers/Home2Header";
import Footer from '../../Component/Footer/Footer';
import Banner from '../../Component/Banner/Banner';
import CallAction from '../../Component/CallAction';
import GotoTop from '../../Component/GotoTop';
import Preloader from '../Preloader';
import { Card, Col, Table, Row, Button } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';

const TeacherReport = () => {
    const [username, setUsername] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [teacherReports, setTeacherReports] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(true); // Déclaration de la variable isFormVisible
    const [userFullName, setUserFullName] = useState('');
    const [userData, setUserData] = useState(null);
    const loginFormRef = useRef(null);

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const token = localStorage.getItem("token");
            if (token) {
              const response = await axios.get("http://localhost:5000/api/userToken", {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              setUserData(response.data);
              handleLogin(response.data);
            }
          } catch (error) {
            console.error("Error fetching user data:", error.message);
          }
        };
    
        fetchUserData();
        setIsLoading(false);
      }, []);

    const handleLogin = async (userData) => {
        try {
            const response = await axios.get(`http://localhost:5000/reports/teacher/${userData.username}`);
            const { data } = response;
    
            if (data.reports.length === 0) {
                console.log('No reports found for this username');
                return;
            }
    
            const { reports, userFullName } = data; // Assurez-vous que le nom complet de l'utilisateur est correctement extrait de la réponse
            setTeacherReports(reports);
            setUserFullName(userFullName); // Mettez à jour le nom complet de l'utilisateur
            setIsLoggedIn(true);
           // setIsFormVisible(false);
        } catch (error) {
            console.error('Error logging in:', error);
        } finally {
            setIsLoading(false);
        }
    };


    // useEffect(() => {
    //     setIsLoading(false);
    // }, []);

    // const scrollToLoginForm = () => {
    //     if (loginFormRef.current) {
    //         loginFormRef.current.scrollIntoView({ behavior: 'smooth' });
    //     }
    // };

    const handleViewAnother = () => {
        //setIsFormVisible(true);
        setIsLoggedIn(false);
        setTeacherReports([]);
        setUsername('');
        window.location.href = '/';
    };

    // Fonction pour calculer la moyenne des marques
    const calculateAverageMark = (reports) => {
        if (!reports || reports.length === 0) return 0;

        const totalMark = reports.reduce((accumulator, report) => accumulator + report.mark, 0);
        return (totalMark / reports.length).toFixed(2);
    };
    // Fonction pour calculer la moyenne de la classe
    const calculateClassAverage = () => {
        if (!teacherReports || teacherReports.length === 0) return 0;
    
        const totalMark = teacherReports.reduce((accumulator, report) => accumulator + report.mark, 0);
        return (totalMark / teacherReports.length).toFixed(2);
    };


    //   useEffect(() => {
    //     setIsLoading(false);
    //   }, [isLoading]);

    return (
        <div className="teacher-report">
            {userData?.role === "student" && <Home2Header />}
            {userData?.role === "teacher" && <Home3Header />}
            {!userData && <Header logo="assets/images/kindy.png" joinBtn={true} />}

            <Banner title="Teacher Home" background="assets/images/banner.jpg" />

            <section className="coursepage-section">
                <div className="container">
                    {isLoading ? (
                        <Preloader />
                    ) : isLoggedIn ? (
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <h2 style={{ textAlign: 'center' }}>Students Results</h2>
                                {userFullName && (
                                    <div className="row">
                                        <div className="col-md-12 text-right" style={{ fontSize: '16px', fontWeight: 'bold', color: 'green' }}>
                                            <span style={{ marginRight: '310px' }}> Teacher Name : {userFullName}</span>
                                        </div>
                                    </div>
                                )}
                                {teacherReports.length > 0 ? (
                                    <>
                                        <Table bordered hover responsive>
                                            <thead>
                                                <tr>
                                                    <th>Student Name</th>
                                                    <th>Course Name</th>
                                                    <th>Mark</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {teacherReports.map(report => (
                                                    <tr key={report._id}>
                                                        <td>{report.student.firstName} {report.student.lastName}</td>
                                                        <td>{report.course.name}</td>
                                                        <td>{report.mark}</td>
                                                    </tr>
                                                ))}
                                                 <tr>
                                        <td colSpan="3" style={{ textAlign: 'center', backgroundColor:'gainsboro' }}>
                                            <strong>Class Average :</strong> {calculateClassAverage()}
                                        </td>
                                    </tr>
                                            </tbody>
                                        </Table>
                                        <div style={{ textAlign: 'center' }}>
                                        <Button variant="danger" onClick={handleViewAnother}>Quit</Button> {/* Utiliser la fonction handleViewAnother */}
                                        </div>
                                    </>
                                ) : <p>No reports found for this teacher.</p>}
                            </div>
                        </div>
                    ) : null}
                </div>
            </section>

            <CallAction btnClass="bisylms-btn" />
            <Footer />
            <GotoTop />
        </div>
    );
};

export default TeacherReport;