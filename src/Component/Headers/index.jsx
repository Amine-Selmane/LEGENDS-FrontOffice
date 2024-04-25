import ProtoTypes from "prop-types";
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import useWindowPosition from "../../Hooks/useWindowPosition";
import {  FaHeart } from 'react-icons/fa'; // Import the heart and cart icons from Font Awesome
import { useSelector } from 'react-redux'; // Import useSelector hook to retrieve data from Redux store
import { selectCartBookItems } from '../../Pages/BookStore/Action/cartSliceBook'; // Import the selector function for cart items

function Header({ className, logo, joinBtn, search }) {
  const [activeMobileMenu, setActiveMobileMenu] = useState(false);
  const [activeMobileSubMenu, setActiveSubMobileMenu] = useState(false);
  const windowPosition = useWindowPosition();
  const bookItems = useSelector(selectCartBookItems); // Retrieve cart items from Redux store



  return (
    <header
      className={`${className ? className : "header-01"} sticky ${windowPosition > 0 && "fix-header animated fadeInDown"
        } `}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <nav className="navbar navbar-expand-lg">
              {/* logo Start */}
              <Link className="navbar-brand" to="/">
                <img src={logo} alt="" />
                <img
                  className="sticky-logo"
                 
                  src="assets/images/home/logo.png"
                  alt=""
                />
              </Link>
              {/* logo End */}

              {/* Moblie Btn Start  */}
              <button
                className="navbar-toggler"
                type="button"
                onClick={() => setActiveMobileMenu(!activeMobileMenu)}
              >
                <i className="fal fa-bars"></i>
              </button>
              {/*  Moblie Btn End  */}

              {/* Nav Menu Start  */}
              <div
                className="collapse navbar-collapse"
                style={{ display: activeMobileMenu && "block", marginLeft: "350px" }}
              >
                <ul className="navbar-nav">
                  
                    
                
                   
                      <li>
                        <Link to="/">Home</Link>
                      </li>
                     
                    
           

                  {/* Events */}
                  <li
                    className="menu-item-has-children"
                    onClick={() =>
                      setActiveSubMobileMenu(
                        activeMobileSubMenu === "Events" ? false : "Events"
                      )
                    }
                  >
                    <a>Events</a>
                    <span className="submenu-toggler">
                      <i
                        className={`fal ${activeMobileSubMenu === "Events"
                            ? "fa-minus"
                            : "fa-plus"
                          }`}
                      ></i>
                    </span>
                    <ul
                      className="sub-menu"
                      style={{
                        display: activeMobileSubMenu === "Events" && "block",
                      }}
                    >
                      <li>
                        <Link to="/EventList">List Of Events</Link>
                      </li>
                      <li>
                        <Link to="/Cart">My Card</Link>
                      </li>
                    </ul>
                  </li>

                 
                  
                  <li
                    className="menu-item-has-children"
                    onClick={() =>
                      setActiveSubMobileMenu(
                        activeMobileSubMenu === "course" ? false : "course"
                      )
                    }
                  >
                    <a>Courses</a>
                    <span className="submenu-toggler">
                      <i
                        className={`fal ${activeMobileSubMenu === "course"
                            ? "fa-minus"
                            : "fa-plus"
                          }`}
                      ></i>
                    </span>
                    <ul
                      className="sub-menu"
                      style={{
                        display: activeMobileSubMenu === "course" && "block",
                      }}
                    >
                      <li>
                        <Link to="/course-3">Courses Catalog</Link>
                      </li>
                    </ul>
                  </li>
                              {/* Books */}

                  <li
                    className="menu-item-has-children"
                    onClick={() =>
                      setActiveSubMobileMenu(
                        activeMobileSubMenu === "Books" ? false : "Books"
                      )
                    }
                  >
                    <a>Book Store</a>
                    <span className="submenu-toggler">
                      <i
                        className={`fal ${
                          activeMobileSubMenu === "Books"
                            ? "fa-minus"
                            : "fa-plus"
                        }`}
                      ></i>
                    </span>
                    <ul
                      className="sub-menu"
                      style={{
                        display: activeMobileSubMenu === "Books" && "block",
                      }}
                    >
                      <li>
                        <Link to="/books">Books</Link>
                      </li>
                     
                    

                    </ul>
                    </li>

                  {/* Reports */}

                  
                 
                  
                </ul>
              </div>
              {/* Nav Menu End  */}

              {/*  User Btn  */}
              {className !== "header-02" && (
                <a href="/login" className="user-btn">
                  <i className="ti-user"></i>
                </a>
              )}
              {/*  User Btn  */}

              {/* Join Btn  */}
              {joinBtn && (
                <a href="/register" className="join-btn">
                  Join Us! 
                </a>
              )}
                {/* Nav Menu Start  */}
                <div
                className="collapse navbar-collapse"
                style={{ display: activeMobileMenu && "block" }}
              >
                {/* Your navigation menu */}
              </div>
              {/* Nav Menu End  */}

             
              {/* Join Btn   */}
              {search && (
                <form className="search-box" method="post" action="#">
                  <input
                    type="search"
                    name="s"
                    placeholder="Search Courses..."
                  />
                  <button type="submit">
                    <i className="ti-search"></i>
                  </button>
                </form>
              )}
                     {/* Basket Icon */}
              <Link to="/cartBook" className="basket-icon">
                <i className="fas fa-shopping-cart" style={{ color: 'white', fontSize: '24px', marginRight: '10px' }}>
                  {bookItems.length > 0 && <span className="badge">{bookItems.length}</span>} {/* Display the number of items in the cart */}
                </i>
              </Link>
              
              {/* Heart Icon for Wishlist */}
              <Link to="/wishlist" className="wishlist-icon">
                <FaHeart style={{ color: 'white', fontSize: '24px', marginLeft: '10px' }} />
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  className: ProtoTypes.string,
  logo: ProtoTypes.string,
  joinBtn: ProtoTypes.bool,
  search: ProtoTypes.bool,
};

export default Header;
