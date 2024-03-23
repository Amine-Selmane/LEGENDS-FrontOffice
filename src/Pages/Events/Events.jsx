import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Event() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from Express backend when the component mounts
    axios.get("http://localhost:5000/events") // Update the URL with your actual API endpoint
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error("Error fetching events:", error);
      });
  }, []);

  return (
    <section className="event-section">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h2 className="sec-title">
               Upcoming Events
            </h2>
          </div>
        </div>
        <div className="row">
          {events.map(event => (
            <div className="col-md-6" key={event._id}>
              <div className="event-item-1">
                <div className="ci-thumb" style={{ width: "100%" }}>
                  <img src={event.imageUrl} style={{ maxWidth: "100%", height: "auto" }} alt={event.name} />
                </div>
                <div className="e-date">
                  {/* Format date as needed */}
                  {new Date(event.date).getDate()}{" "}
                  <span>
                    {new Date(event.date).toLocaleString("default", {
                      month: "short",
                    })}
                  </span>
                </div>
                <div className="event-time" style={{ marginTop: "10px" }}>
                  <p>
                    Time:{" "}
                    {new Date(event.beginTime).toLocaleTimeString([], {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}{" "}
                    to{" "}
                    {new Date(event.endTime).toLocaleTimeString([], {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                </div>
                <p>
                  <i className="icon_pin_alt"></i>
                  {event.location}
                </p>
                <h4>{event.name}</h4>
                <p>Price: ${event.price}</p>
                <p>Available Places: {event.nbrPlaces}</p>

                <Link className="bisylms-btn" to={`single-event/${event._id}`}>
                  Get Ticket
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Event;
