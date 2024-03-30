import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';
import Header from '../../Component/Headers';
import Footer from '../../Component/Footer/Footer';
import Banner from '../../Component/Banner/Banner';
//import FeatureReportCard from '../../Component/Cards/FeatureReportCard';
import CallAction from '../../Component/CallAction';
import GotoTop from '../../Component/GotoTop';
import Preloader from '../Preloader';
import { Card, Col, Table ,Row,Button} from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';

const TeacherReport = () => {
    const [username, setUsername] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [teacherReports, setTeacherReports] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(true); // Déclaration de la variable isFormVisible
    const loginFormRef = useRef(null); 

   const handleLogin = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/reports/teacher/${username}`);
        const { data } = response;
        
        // Vérifier si des rapports ont été renvoyés
        if (data.reports.length === 0) {
            console.log('No reports found for this username');
            // Afficher un message à l'utilisateur indiquant qu'aucun rapport n'a été trouvé
            return;
        }
        
        const { reports } = data; 
        setTeacherReports(reports);
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
               setTeacherReports([]);
              setUsername('');
          };
        


    return (
        <div className="student-report">
            <Header logo="assets/images/logo4.png" joinBtn={true} />
            <Banner title="Teacher Home" background="assets/images/banner.jpg" />

            <section className="coursepage-section">
                <div className="container">
                    {isFormVisible && (
                       <div className="row" ref={loginFormRef}>
                                      <div className="col-md-12">
                                           <div className="login-form" id="login-form">
                                          <h2>Teacher Username</h2>
                                                   <input 
                                                       type="text" 
                                                       placeholder="Enter your username" 
                                                       value={username} 
                                                       onChange={(e) => setUsername(e.target.value)} 
                                                   />
                                                   <Button variant="primary" onClick={handleLogin}>View StudentReport</Button>
                                               </div>
                                           </div>
                                       </div>
                    )}
                    {!isFormVisible && (
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <h2 style={{ textAlign: 'center' }}>Students Results</h2>
                                {isLoading ? (
                                    <Preloader />
                                ) : isLoggedIn && teacherReports.length > 0 ? (
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
                                        </tbody>
                                    </Table>
                                    
                                ) : null}
                                  {!isFormVisible && (
                <div className="row justify-content-center">
                    <div className="col-md-6 text-center">
                        <Button variant="danger" onClick={handleViewAnother}>Quit</Button>
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

export default TeacherReport;