import ProtoTypes from "prop-types";
import { Link } from "react-router-dom";
const bgCourse = "../../assets/images/course/l2.jpg"
const bgTeacher = "../../assets/images/course/1.jpg"

function CourseListViewV2({ course }) {
  const {
    name,
    classroom,
    teacher_name,
    nbrQuiz,
    halfYearlyPrice,
    yearlyPrice,
  } = course;
  return (
    <div className="course-item-4" style={{ width: "100%" }}>
      <div className="ci-thumb">
        <img src={bgCourse} alt="" />
        <Link className="enroll">
          Enroll Now
        </Link>
      </div>
      <div className="course-details">
        <h4>
          <Link to="#">{name}</Link>
        </h4>
        <div style={{ marginBottom: "10px", fontSize: "14px", color: "black" }}>
            Duration : <span style={{ fontWeight: "bold" }}>30 minutes</span></div>

          <div style={{ marginBottom: "10px", fontSize: "14px", color: "black" }}>
            Number of quizzes : <span style={{ fontWeight: "bold" }}>{nbrQuiz}</span></div>
        <div className="author">
          <img src={bgTeacher} alt="" />
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
  );
}

CourseListViewV2.propTypes = {
  course: ProtoTypes.object,
};

export default CourseListViewV2;
