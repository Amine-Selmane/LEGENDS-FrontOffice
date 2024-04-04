import { useEffect, useState } from "react";
import Preloader from "../../Component/Preloader";
import Header from "../../Component/Headers";
import Home2Header from "../../Component/Headers/Home2Header";
import Home3Header from "../../Component/Headers/Home3Header";
import axios from "axios";
import Footer from "../../Component/Footer/Footer";
import Banner from "../../Component/Banner/Banner";
import CallAction from "../../Component/CallAction";
import GotoTop from "../../Component/GotoTop";
import Events from "./Events"; // Import the Event component

function EventList() {
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState("");
  const [userData, setUserData] = useState(null); // State to store user data



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
        <Banner title="Events" background="assets/images/banner3.jpg" />
        <section className="coursepage-section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <Events />
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

export default EventList;

