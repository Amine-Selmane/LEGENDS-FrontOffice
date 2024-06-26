import ProtoTypes from "prop-types";
import { Link } from "react-router-dom";
const bgCourse = "../../assets/images/course/course.png"

const bgTeacher = "../../assets/images/course/1.jpg"
import React from 'react';

function FeatureCourseCard({ course, className, swiper }) {
  const {
    name,
    classroom,
    teacher_name,
    nbrQuiz,
    halfYearlyPrice,
    yearlyPrice,
  } = course;

  return (
    <div className={!swiper ? "col-lg-4 col-md-6" : ""}>
      <div className={`${className ? className : "feature-course-item-3"}`}>
        <div className="fcf-thumb">
          <img src={bgCourse} alt="" />
          <Link  to="/register" className="enroll">
            Subscribe Now
          </Link>
        </div>
        <div className="fci-details">
          <h4 style={{ fontWeight: "bold" }}>
            <Link>{name}</Link>
          </h4>

          <div style={{ marginBottom: "10px", fontSize: "14px", color: "black" }}>
            Duration : <span style={{ fontWeight: "bold" }}>30 minutes</span></div>

          <div style={{ marginBottom: "10px", fontSize: "14px", color: "black" }}>
            Number of quizzes : <span style={{ fontWeight: "bold" }}>{nbrQuiz}</span></div>
          <div className="author">
            Teacher:
            <Link>{teacher_name}</Link>
          </div>
          <div className="price-rate">
            <p style={{ fontWeight: "bold" }}>Yearly Price: </p>
            <div className="course-price">
             <p>{yearlyPrice} Dt</p>
            </div>
          </div>
          <div className="price-rate">
          <p style={{ fontWeight: "bold" }}>Half-yearly Price: </p>
            <div className="course-price">
              <p>{halfYearlyPrice} Dt</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

FeatureCourseCard.propTypes = {
  course: ProtoTypes.object,
  className: ProtoTypes.string,
  swiper: ProtoTypes.bool,
};

export default FeatureCourseCard;
