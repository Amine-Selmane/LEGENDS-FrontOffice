import { useEffect, useState } from "react";
import Preloader from "../../Component/Preloader";
import Header from "../../Component/Headers";
import Home3Header from "../../Component/Headers/Home3Header";
import Home2Header from "../../Component/Headers/Home2Header";
import Footer from "../../Component/Footer/Footer";
import Banner from "../../Component/Banner/Banner";
import FeatureCourseCard from "../../Component/Cards/FeatureCourseCard";
import { Link } from "react-router-dom";
import CourseListViewV2 from "../../Component/Cards/CourseListViewV2";
import LatestCourseCard from "../../Component/Cards/LatestCourseCard";
import FilterForm from "../../Component/Form/FilterForm";
import GotoTop from "../../Component/GotoTop";
import axios from "axios";
function Course3() {
  /////////////////////////////////////////////////
  const [query, setQuery] = useState("");
  const [courses, setCourses] = useState([]);
  const [userData, setUserData] = useState(null);

  const fetchPosts = async () => {
    const res = await axios.get('http://localhost:5000/courses/getCourse')
      .then(res => setCourses(res.data));
  };

  useEffect(() => {
    fetchPosts();
  }, []);
//////////////////////////////////////////////////////////////
//////////////////////SEARCHBAR/////////////////////////////
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCourses, setFilteredCourses] = useState(courses);

  useEffect(() => {
    const filterCourses = () => {
      if (searchTerm) {
        const filtered = courses.filter((course) =>
          course.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCourses(filtered);
      } else {
        setFilteredCourses(courses); // Reset to all courses when search term is empty
      }
    };

    filterCourses();
  }, [searchTerm, courses]); // Update filteredCourses when searchTerm or courses change

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchIcon = document.getElementById('searchIcon');
  function searchIconDisappearDependingOnEvent () {
    if (searchTerm) {
      searchIcon.style.display = 'none';
    } else {
      searchIcon.style.display = 'inline-block';
    }
  }
////////////////////////////////////////////////////////////////////


  const [isLoading, setIsLoading] = useState(true);
  const [activeView, setActiveView] = useState("grid");
  let content = undefined;
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

  if (isLoading) {
    content = <Preloader />;
  } else {
    content = (
      <>
         {userData?.role === "student" && <Home2Header />}
      {userData?.role === "teacher" && <Home3Header />}
      {!userData && <Header logo="assets/images/kindy.png" joinBtn={true} />}

        <Banner title="Courses Grid" background="assets/images/banner4.jpg" />
        <section className="coursepage-section-2">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="toolbar-wrapper-2">
                  <ul className="toolbar-btn nav nav-tabs">
                    <li>
                      <a
                        className={activeView === "grid" ? "active" : ""}
                        onClick={() => setActiveView("grid")}
                        data-toggle="tab"
                      >
                        <i className="icon_grid-2x2"></i>Grid
                      </a>
                    </li>
                    <li style={{ marginLeft: "5px" }}>
                      <a
                        onClick={() => setActiveView("list")}
                        className={activeView === "list" ? "active" : ""}
                        data-toggle="tab"
                      >
                        <i className="icon_menu"></i>List
                      </a>
                    </li>

                    <li>
                      <form className="search-box" method="post" action="/" style={{ marginLeft: "15px" }}>
                        <input
                          type="search"
                          name="search"
                          id="searchInput"
                          placeholder="Search Courses..."
                          value = {searchTerm}
                          onChange={handleSearchChange}
                          onSelect={searchIconDisappearDependingOnEvent}
                         
                        />
                        <button disabled>
                          <i className="ti-search" id="searchIcon"></i>
                        </button>
                      </form>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-11">
                <div className="tab-content">
                  <div
                    className="tab-pane fade show in active"
                    style={{
                      display: "flex",
                      flexDirection: activeView === "list" && "column",
                      flexWrap: "wrap",
                      gap: activeView === "list" && "30px",
                    }}
                  >
                    <div className="row">
                      {filteredCourses.map((item) =>
                        activeView === "grid" ? (
                          <FeatureCourseCard
                            course={item}
                            key={item.id}
                            className="feature-course-item-4"
                          />
                        ) : (
                          <CourseListViewV2 key={item.id} course={item} />
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer getStart={true} />
        <GotoTop />
      </>
    );
  }
  return content;
}

export default Course3;
