import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';
import Header from '../../Component/Headers';
import Footer from '../../Component/Footer/Footer';
import Banner from '../../Component/Banner/Banner';
import CallAction from '../../Component/CallAction';
import GotoTop from '../../Component/GotoTop';
import Preloader from '../Preloader';
import { Card, Col, Table ,Row,Button} from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';


const StudentReport = () => {
   // const [studentId, setStudentId] = useState('');
    const [username, setUsername] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [studentReports, setStudentReports] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(true); // Déclaration de la variable isFormVisible
    const loginFormRef = useRef(null); 

   const handleLogin = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/reports/student/${username}`);
        const { data } = response;
        
        // Vérifier si des rapports ont été renvoyés
        if (data.reports.length === 0) {
            console.log('No reports found for this username');
            // Afficher un message à l'utilisateur indiquant qu'aucun rapport n'a été trouvé
            return;
        }
        
        const { reports } = data; 
        setStudentReports(reports);
        setIsLoggedIn(true);
        setIsFormVisible(false);
    } catch (error) {
        console.error('Error logging in:', error);
    } finally {
        setIsLoading(false);
    }
};


    useEffect(() => {
        setIsLoading(false);
    }, []);

    const scrollToLoginForm = () => {
        if (loginFormRef.current) {
            loginFormRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleViewAnother = () => {
             setIsFormVisible(true);
               setIsLoggedIn(false);
               setStudentReports([]);
              setUsername('');
          };
          const calculateAverageMark = () => {
            const totalMark = studentReports.reduce((accumulator, report) => accumulator + report.mark, 0);
            return (totalMark / studentReports.length).toFixed(2);
        };

    return (
        <div className="student-report">
        <Header logo="assets/images/logo4.png" joinBtn={true} />
        <Banner title="Student Home" background="assets/images/banner.jpg" />

        <section className="coursepage-section">
            <div className="container">
                {isFormVisible && (
                    <div className="row" ref={loginFormRef}>
                        <div className="col-md-12">
                            <div className="login-form" id="login-form">
                                <h2>Student Username</h2>
                                <input
                                    type="text"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <Button variant="primary" onClick={handleLogin}>
                                    View Report
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
                {!isFormVisible && (
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <h2 style={{ textAlign: 'center' }}>Your Results</h2>
                            {isLoading ? (
                                <Preloader />
                            ) : isLoggedIn && studentReports.length > 0 ? (
                                <>
                                    <Table bordered hover responsive>
                                        <thead>
                                            <tr>
                                                <th>Teacher Name</th>
                                                <th>Course Name</th>
                                                <th>Mark</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {studentReports.map((report) => (
                                                <tr key={report._id}>
                                                    <td>
                                                        {report.teacher.firstName} {report.teacher.lastName}
                                                    </td>
                                                    <td>{report.course ? report.course.name : 'N/A'}</td>

                                                    <td>{report.mark}</td>
                                                </tr>
                                            ))}
                                           <tr>
                                        <td colSpan="3" style={{ textAlign: 'center', backgroundColor:'gainsboro' }}>
                                            <strong>Average Mark:</strong> {calculateAverageMark()}
                                        </td>
                                    </tr>
                                        </tbody>
                                    </Table>
                                    {/* <div>
                                        <strong>Average Mark:</strong> {calculateAverageMark()}
                                    </div> */}
                                </>
                            ) : null}
                            {!isFormVisible && (
                                <div className="row justify-content-center">
                                    <div className="col-md-6 text-center">
                                        <Button variant="danger" onClick={handleViewAnother}>
                                            Quit
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </section>

        <CallAction btnClass="bisylms-btn" />
        <Footer />
        <GotoTop />
    </div>
    );
};

export default StudentReport;