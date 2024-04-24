import { useState, useEffect } from "react";
import React from 'react';
import FeatureCourseCard from "../../Component/Cards/FeatureCourseCard";
import CourseListViewV2 from "../../Component/Cards/CourseListViewV2";
import axios from "axios";

import { course } from "../../Data/course";
import FeatureCard from "../Cards/FeatureCard";

function Feature() {

  const [activeCategory, setActiveCategory] = useState("All");
  const [courses, setCourses] = useState([]);
  const [userData, setUserData] = useState(null);
  const [activeView, setActiveView] = useState("grid");

  
  const fetchPosts = async () => {
    const res = await axios.get('http://localhost:5000/courses/getCourse')
      .then(res => setCourses(res.data));
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <section className="feature-course-section">
      <div className="container">
        <div className="row">
          <div className="col-md-5">
            <h2 className="sec-title">
              <span>Find the Right</span>  Course for you
            </h2>
          </div>
          <div className="row">
              {courses.slice(0, 3).map((item) =>
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
    </section>
  );
}

export default Feature;
