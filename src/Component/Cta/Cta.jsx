import { Link } from "react-router-dom";
import React from 'react';

function Cta() {
  return (
    <section
      className="cta-section"
      style={{ backgroundImage: "url(assets/images/home/cta-bg.jpg)" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h2 className="sec-title">
               End of year party!
            </h2>
          
      
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cta;
