import React, { useState, useEffect } from 'react';
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
import { Link } from 'react-router-dom';


const StudentReport = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [studentReports, setStudentReports] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [userFullName, setUserFullName] = useState('');
    const [userData, setUserData] = useState(null);

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
    }, []);

    const handleLogin = async (userData) => {
        try {
            const response = await axios.get(`http://localhost:5000/reports/student/${userData.username}`);
            const { data } = response;

            if (data.reports.length === 0) {
                console.log('No reports found for this username');
                return;
            }

            const { reports, userFullName } = data;
            setStudentReports(reports);
            setUserFullName(userFullName);
            setIsLoggedIn(true);
        } catch (error) {
            console.error('Error logging in:', error);
        } finally {
            setIsLoading(false);
        }
    };

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

            doc.setFontSize(18);
            doc.setTextColor(0, 128, 0);
            doc.text('Your Report', doc.internal.pageSize.width / 2, 30, { align: 'center' });

            const pageWidth = doc.internal.pageSize.width;
            const pageHeight = doc.internal.pageSize.height;
            const borderWidth = 5;
            doc.setDrawColor(2);
            doc.rect(borderWidth, borderWidth, pageWidth - 2 * borderWidth, pageHeight - 2 * borderWidth);

            doc.autoTable({
                head: [['Teacher Name', 'Course Name', 'Mark']],
                body: tableData,
                startY: 40,
                theme: 'grid',
                styles: {
                    cellPadding: 2,
                    fontSize: 10,
                    fontStyle: 'normal',
                    textColor: [0, 0, 0],
                    fillColor: [255, 255, 255],
                    lineColor: [0, 0, 0],
                    lineWidth: 0.1,
                },
                headStyles: {
                    fillColor: [0, 0, 255],
                    textColor: [255, 255, 255],
                },
                bodyStyles: {
                    fillColor: [245, 245, 245],
                },
            });

            doc.text(`Your Average is: ${averageMark}`, doc.internal.pageSize.width - 14, doc.autoTable.previous.finalY + 10, { align: 'right', fontSize: 5 });

            doc.save('student_report.pdf');
        } catch (error) {
            console.error('Error exporting PDF:', error);
        }
    };

    const handleViewAnother = () => {
        setIsLoggedIn(false);
        setStudentReports([]);
        window.location.href = '/';

    };

    return (
        <div className="student-report">
            {userData?.role === "student" && <Home2Header />}
            {userData?.role === "teacher" && <Home3Header />}
           

            <Banner title="Student Home" background="assets/images/banner3.jpg" />

            <section className="coursepage-section">
                <div className="container">
                    {isLoading ? (
                        <Preloader />
                    ) : isLoggedIn ? (
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

                                {studentReports.length > 0 ? (
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
                                        <Button variant="danger" onClick={handleViewAnother}>Quit</Button> {/* Utiliser la fonction handleViewAnother */}
                                            <Button variant="success" onClick={handleExportPDF} style={{ marginLeft: '10px' }}>
                                                Export PDF
                                            </Button>
                                            <Button variant="primary">
                                         <Link to="/claimform" style={{ color: 'white', textDecoration: 'none' }}>Claim</Link>
                                          </Button>
                                        </div>
                                    </>
                                ) : null}
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

export default StudentReport;
