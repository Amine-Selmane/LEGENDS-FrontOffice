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
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { Table, Button } from 'react-bootstrap';

const StudentReport = () => {
    const [username, setUsername] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [studentReports, setStudentReports] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(true);
    const [userFullName, setUserFullName] = useState('');
    const [userData, setUserData] = useState(null);

    const loginFormRef = useRef(null);

    const handleLogin = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/reports/student/${username}`);
            const { data } = response;

            if (data.reports.length === 0) {
                console.log('No reports found for this username');
                return;
            }

            const { reports, userFullName } = data;
            setStudentReports(reports);
            setUserFullName(userFullName);
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

    const calculateAverageMark = () => {
        const totalMark = studentReports.reduce((accumulator, report) => accumulator + report.mark, 0);
        return (totalMark / studentReports.length).toFixed(2);
    };

    const handleExportPDF = async () => {
        const doc = new jsPDF();
    
        try {
            const tableData = studentReports.map(report => [
                `${report.teacher.firstName} ${report.teacher.lastName}`,
                report.course ? report.course.name : 'N/A',
                report.mark,
            ]);
    
            const averageMark = calculateAverageMark();
            //tableData.push(['Average', '', averageMark]);

            doc.setFontSize(18);
            doc.setTextColor(0, 128, 0); // Vert
            doc.text('Your Report', doc.internal.pageSize.width / 2, 30, { align: 'center' });

            //doc.text(`Student Name: ${userFullName}`, 1, 40);
  
            // Dessiner une bordure autour de la page
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;
        const borderWidth = 5; // Épaisseur de la bordure
        doc.setDrawColor(2); // Couleur de la bordure (noir)
        doc.rect(borderWidth, borderWidth, pageWidth - 2 * borderWidth, pageHeight - 2 * borderWidth);
            
            // Dessiner le tableau avec les données
            doc.autoTable({
                head: [['Teacher Name', 'Course Name', 'Mark']],
                body: tableData,
                startY: 40,
                // Ajouter les options de style ici
                theme: 'grid', // Utiliser un thème de tableau avec des bordures
                styles: {
                    cellPadding: 2,
                    fontSize: 10,
                    fontStyle: 'normal',
                    textColor: [0, 0, 0], // Couleur du texte
                    fillColor: [255, 255, 255], // Couleur de fond des cellules
                    lineColor: [0, 0, 0], // Couleur des lignes du tableau
                    lineWidth: 0.1,
                },
                headStyles: {
                    fillColor: [0, 0, 255], // Couleur de fond de la première ligne (bleu)
                    textColor: [255, 255, 255], // Couleur du texte de la première ligne (blanc)
                },
                bodyStyles: {
                    fillColor: [245, 245, 245], // Couleur de fond du corps du tableau
                },
            });
    
         // Ajouter l'Average avec une taille de police plus petite
        //  const averageX = 14; // Position horizontale de l'Average
        //  const averageY = doc.autoTable.previous.finalY + 20; // Position verticale de l'Average
        //  doc.setFontSize(10); // Taille de police plus petite pour l'Average
        //  doc.text(`Your Average is: ${averageMark}`, averageX, averageY);
    
        doc.text(`Your Average is: ${averageMark}`, doc.internal.pageSize.width - 14, doc.autoTable.previous.finalY + 10, { align: 'right', fontSize: 5 });
    
            doc.save('student_report.pdf');
        } catch (error) {
            console.error('Error exporting PDF:', error);
        }
    };
    

    const handleViewAnother = () => {
        setIsFormVisible(true);
        setIsLoggedIn(false);
        setStudentReports([]);
        setUsername('');
    };
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
            }
          } catch (error) {
            console.error("Error fetching user data:", error.message);
          }
        };
    
        fetchUserData();
        setIsLoading(false);
      }, []);

      useEffect(() => {
        setIsLoading(false);
      }, [isLoading]);
    

    return (
        <div className="student-report">
           {userData?.role === "student" && <Home2Header />}
      {userData?.role === "teacher" && <Home3Header />}
      {!userData && <Header logo="assets/images/kindy.png" joinBtn={true} />}

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
                                {userFullName && (
                                <div className="row">
                                <div className="col-md-12 text-right" style={{ fontSize: '16px', fontWeight: 'bold', color: 'green' }}>
                                    <span style={{ marginRight: '240px' }}> Student Name : {userFullName}</span>
                                </div>
                            </div>
                            )}
                       
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
                                            <strong>Average :</strong> {calculateAverageMark()}
                                        </td>
                                    </tr>
                                            </tbody>
                                        </Table>
                                        <div style={{ textAlign: 'center' }}>
                                            <Button variant="danger" onClick={handleViewAnother}>
                                                Quit
                                            </Button>
                                            <Button variant="success" onClick={handleExportPDF} style={{ marginLeft: '10px' }}>
                                                Export PDF
                                            </Button>
                                        </div>
                                    </>
                                ) : null}
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
