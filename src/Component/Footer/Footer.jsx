import ProtoTypes from "prop-types";
import { Link } from "react-router-dom";
import React from 'react';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
function Footer({ getStart }) {
  return (
    <footer className={`footer-1 ${!getStart && "pd-top-90"}`}>
      <div className="container">
        
        <div className="row">
          <div className="col-lg-4 col-md-3">
            <aside className="widget">
              <div className="about-widget">
                <Link to="/">
                  <img src="assets/images/logo.png" alt="" />
                </Link>
                <p>
                Our conservatory offers complete, adapted and tailor-made
                musical training for all ages!
                </p>
                <div className="ab-social">
                  <a className="fac" href="https://www.facebook.com/elkindy.conservatoire">
                    <i className="social_facebook"></i>
                  </a>
                  <a className="inst" href="https://www.instagram.com/conservatoire_el_kindy/">
                    <i className="social_instagram"></i>
                  </a>
                  <a className="you" href="https://www.youtube.com/user/conservatoireelkindy">
                    <i className="social_youtube"></i>
                  </a>
                
                </div>
              </div>
            </aside>
          </div>
          <div className="col-lg-3 col-md-3">
            <aside className="widget">
              <h3 className="widget-title">Explore</h3>
              <ul>
                <li>
                  <Link to="/">About Us</Link>
                </li>
                <li>
                  <Link to="/course-3">Courses</Link>
                </li>
                <li>
                  <Link to="/EventList">Events</Link>
                </li>
                <li>
                  <Link to="/books">Books</Link>
                </li>
                
              </ul>
            </aside>
          </div>
          <div className="col-lg-3 col-md-3">
            <aside className="widget">
              <h3 className="widget-title">Address</h3>
              <p>
              <AddLocationIcon/>
              24, Rue Manzel Mabrouk
              Cité Olympique, Tunis
              </p>
            </aside>
          </div>
          <div className="col-lg-2 col-md-3">
            <aside className="widget">
              <h3 className="widget-title">Hours of operation</h3>
              
                <p>

                <AccessTimeIcon/>  
                Monday - Friday: 14:00 - 20:00 
                </p>
                
                <p>
                <AccessTimeIcon/>
                Saturday - Sunday: 10:00 - 20:00
                </p>
            </aside>
          </div>
        </div>
        {/* Copyrigh  */}
        <div className="row">
          <div className="col-lg-12 text-center">
            <div className="copyright">
              <p>
                © 2021 Copyright all Right Reserved Design by{" "}
                <a href="http://quomodosoft.com/">Quomodosoft</a>
              </p>
            </div>
          </div>
        </div>
        {/* Copyrigh  */}
      </div>
    </footer>
  );
}

Footer.propTypes = {
  getStart: ProtoTypes.bool,
};

export default Footer;
