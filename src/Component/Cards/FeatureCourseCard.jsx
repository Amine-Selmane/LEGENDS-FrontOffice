import ProtoTypes from "prop-types";
import { Link } from "react-router-dom";

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
          <h4 className=" p-5">{name}</h4>
          <Link className="enroll">
            Enroll Now
          </Link>
        </div>
        <div className="fci-details">
          <Link className="c-cate">
            <i className="icon_tag_alt"></i>
            {classroom} - {nbrQuiz}
          </Link>
          <h4>
            <Link to="#">{name}</Link>
          </h4>
          <div className="author">
            <h4>{teacher_name}</h4>
          </div>
          <div className="price-rate">
            <div className="course-price">
              <p> ${yearlyPrice}</p>
            </div>
          </div>
          <div className="price-rate">
            <div className="course-price">
              <p>${halfYearlyPrice}</p>
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
