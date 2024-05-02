import { Link } from "react-router-dom";
import React from 'react';

function HomeHero() {
  return (
    <section
      className="hero-banner-1"
      style={{ backgroundImage: "url(assets/images/home/banner.png)" }}
    >
      {/* shape  */}
      <div className="shape-wrap">
        <div className="b-shape-1">
          <img src="assets/images/home/shape-1.png" alt="" />
        </div>
        <div className="b-shape-2">
          <img src="assets/images/home/shape-2.png" alt="" />
        </div>
        <div className="b-shape-3">
          <img src="assets/images/home/shape-3.png" alt="" />
        </div>
        <div className="b-shape-4">
          <img src="assets/images/home/shape-4.png" alt="" />
        </div>
      </div>
      {/* shape  */}
      <div className="container">
        <div className="row">
          <div className="col-lg-5 col-md-5">
            <div className="hero-content">
              <h2>ART IS IN YOU!</h2>
              <p>
              We support kindies in essential teaching for acquiring the basics and pursuing qualitative and demanding learning.
              We welcome all age groups as well as all nationalities.
              Whether you are a child or adult, student or integrated into the world of work, you are welcome in our conservatory
              </p>
              <Link to="/register" className="bisylms-btn">
                Ready to Get Started?
              </Link>
            </div>
          </div>
          <div className="col-lg-7 col-md-7">
            <div className="banner-thumb">
              <img src="assets/images/home/layer.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeHero;
