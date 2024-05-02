import { Link } from "react-router-dom";
import Events from "../../Pages/Events/Events"; // Import the Event component

import React from 'react';

function Event() {
  return (
    <section className="event-section">
      <div className="container">
        
        <div className="row">
              <div className="col-md-12">
                <Events />
              </div>
            </div>
        <div className="row">
          <div className="col-md-12 text-center">
            <Link className="read-more" to="/EventList">
              View all Events<i className="arrow_right"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Event;
