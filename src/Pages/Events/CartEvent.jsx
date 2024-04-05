import { useEffect, useState } from "react";
import axios from "axios";
import Preloader from "../../Component/Preloader";
import Header from "../../Component/Headers";
import Home3Header from "../../Component/Headers/Home3Header";
import Home2Header from "../../Component/Headers/Home2Header";

import Footer from "../../Component/Footer/Footer";
import Banner from "../../Component/Banner/Banner";
import CallAction from "../../Component/CallAction";
import GotoTop from "../../Component/GotoTop";
import PaymentMethods from "./PaymentMethods";

import React from 'react';

function CartEvent() {
  const [isLoading, setIsLoading] = useState(true);
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
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchUserData();
    setIsLoading(false);
  }, []);

  let content = undefined;
  if (isLoading) {
    content = <Preloader />;
  } else {
    content = (
      <>
        {userData?.role === "student" && <Home2Header />}
        {userData?.role === "teacher" && <Home3Header />}
        {!userData && <Header logo="assets/images/kindy.png" joinBtn={true} />}
        <Banner title="Booking Cart" background="assets/images/banner3.jpg" />
        <section className="coursepage-section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <PaymentMethods />
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
  return content;
}

export default CartEvent;