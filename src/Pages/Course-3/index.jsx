import { useEffect, useState } from "react";
import Preloader from "../../Component/Preloader";
import Header from "../../Component/Headers";
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
  const [courses, setCourses] = useState([]);
  const fetchPosts = async () => {
    const res = await axios.get('http://localhost:5000/courses/getCourse')
      .then(res => setCourses(res.data));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  const [activeView, setActiveView] = useState("grid");
  let content = undefined;
  
  useEffect(() => {
    setIsLoading(false);
  }, [isLoading]);

  if (isLoading) {
    content = <Preloader />;
  } else {
    content = (
      <>
        <Header logo="assets/images/logo4.png" joinBtn={true} />
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
                  </ul>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-9">
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
                      {courses.map((item) =>
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
              <div className="col-lg-3">
                <div className="course-sidebar">
                  <aside className="widget">
                    <h3 className="widget-title">Courses Available</h3>
                    <ul>
                      <li>
                        <Link to="/">Web Design</Link>
                      </li>
                      <li>
                        <Link to="/">Marketing</Link>
                      </li>
                      <li>
                        <Link to="/">Frontend</Link>
                      </li>
                      <li>
                        <Link to="/">IT &amp; Software</Link>
                      </li>
                      <li>
                        <Link to="/">Photography</Link>
                      </li>
                      <li>
                        <Link to="/">Technology</Link>
                      </li>
                    </ul>
                  </aside>
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
