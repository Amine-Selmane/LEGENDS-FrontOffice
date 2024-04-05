import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import React from 'react';

function EventListView({ event }) {
  const {
    name,
    date,
    beginTime,
    endTime,
    location,
    description,
    price,
    nbrPlaces,
    imageUrl,
  } = event;

  return (
    <div className="course__item white-bg mb-30 fix">
      <div className="row gx-0">
        <div className="col-xxl-4 col-xl-4 col-lg-4">
          <div className="course__thumb course__thumb-list w-img p-relative fix">
            <Link to={`/event-details/${event._id}`}>
              <img src={imageUrl} alt={name} />
            </Link>
            <div className="course__tag">
              <Link to={`/event-details/${event._id}`}>{name}</Link>
            </div>
          </div>
        </div>
        <div className="col-xxl-8 col-xl-8 col-lg-8">
          <div className="course__right">
            <div className="course__content course__content-3">
              <div className="course__meta d-flex align-items-center">
                <div className="course__lesson mr-20">
                  <span>
                    <i className="fas fa-calendar"></i>
                    {new Date(date).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="course__lesson">
                  <span>
                    <i className="far fa-clock"></i>
                    {formatTime(beginTime)} - {formatTime(endTime)}
                  </span>
                </div>
                <div className="course__lesson">
                  <span>
                    <i className="fas fa-map-marker-alt"></i>
                    {location}
                  </span>
                </div>
              </div>
              <h3 className="course__title course__title-3">
                <Link to={`/event-details/${event._id}`}>{name}</Link>
              </h3>
              <div className="course__summary">
                <p>{description}</p>
              </div>
              <div className="course__more course__more-2 d-flex justify-content-between align-items-center">
                <div className="course__status">
                  <span>
                    {price === 0 ? "Free" : `$${price.toFixed(2)}`}
                  </span>
                </div>
                <div className="course__btn">
                  <Link to={`/event-details/${event._id}`} className="link-btn">
                    Know Details
                    <i className="fas fa-arrow-right"></i>
                    <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

EventListView.propTypes = {
  event: PropTypes.object,
};

function formatTime(timeString) {
  const time = new Date(`1970-01-01T${timeString}`);
  return time.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

export default EventListView;
