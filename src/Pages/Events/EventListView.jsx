import ProtoTypes from "prop-types";
import { Link } from "react-router-dom";

function EventListView({ event }) {
  const {
    imageUrl,
    name,
    date,
    beginTime,
    endTime,
    location,
    price,
    nbrPlaces,
  } = event;

  return (
    <div className="course-item-4" style={{ width: "100%" }}>
      <div className="ci-thumb">
        <img src={imageUrl} alt={name} />
      </div>
      <div className="course-details">
        <h4>{name}</h4>
        <p>Date: {new Date(date).toLocaleDateString()}</p>
        <p>
          Time: {new Date(beginTime).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })} to {new Date(endTime).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}
        </p>
        <p>Location: {location}</p>
        <p>Price: ${price}</p>
        <p>Available Places: {nbrPlaces}</p>
        <Link to={`single-event/${event._id}`} className="enroll">Get Ticket</Link>
      </div>
    </div>
  );
}

EventListView.propTypes = {
  event: ProtoTypes.object,
};

export default EventListView;
