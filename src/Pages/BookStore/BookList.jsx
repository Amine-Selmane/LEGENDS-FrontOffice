import { useEffect, useState } from "react";
import Preloader from "../../Component/Preloader";
import Header from "../../Component/Headers";
import Home2Header from "../../Component/Headers/Home2Header";
import Home3Header from "../../Component/Headers/Home3Header";
import Footer from "../../Component/Footer/Footer";
import Banner from "../../Component/Banner/Banner";
import axios from "axios";
import CallAction from "../../Component/CallAction";
import GotoTop from "../../Component/GotoTop";
import BooksContainer from "./BooksContainer";
import { Pagination } from 'antd'; // Import Pagination from Ant Design
import React from 'react';

function BookList() {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Simulate loading delay for demonstration
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Clear the timer on component unmount to prevent memory leaks
    return () => clearTimeout(timer);
  }, []);

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

  let content = undefined;
  if (isLoading) {
    content = <Preloader />;
  } else {
    content = (
      <>
        {userData?.role === "student" && <Home2Header />}
        {userData?.role === "teacher" && <Home3Header />}
        {!userData && <Header logo="assets/images/kindy.png" joinBtn={true} />}
        <Banner title="Books" background="assets/images/banner3.jpg" />
        <section className="coursepage-section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <BooksContainer />
              </div>
            </div>
          </div>
        </section>
        <CallAction btnClass="bisylms-btn" />
        <Footer />
        <GotoTop />
      </>
    );
  }

  // Pagination configuration
  const paginationConfig = {
    showSizeChanger: false,
    showQuickJumper: false,
    showTotal: total => `Total ${total} items`,
    pageSizeOptions: ['10', '20', '30'], // Customize page size options if needed
    // Handle page change event
    onChange: (page, pageSize) => {
      console.log('Page:', page, 'Page Size:', pageSize);
      // You can update the state or fetch data for the new page here
    },
    // Handle page size change event
    onShowSizeChange: (current, size) => {
      console.log('Current Page:', current, 'New Page Size:', size);
      // You can update the state or fetch data for the new page size here
    },
  };

  return (
    <>
      <div>
        {content}
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Pagination {...paginationConfig} total={100} defaultPageSize={10} />
      </div>
    </>
  );
}

export default BookList;