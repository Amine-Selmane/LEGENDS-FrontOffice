import React, { useState, useEffect } from "react"; // Make sure to import React
import useWindowPosition from "../../Hooks/useWindowPosition";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Button,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {  FaHeart } from 'react-icons/fa'; // Import the heart and cart icons from Font Awesome
import { useSelector } from 'react-redux'; // Import useSelector hook to retrieve data from Redux store
import { selectCartBookItems } from '../../Pages/BookStore/Action/cartSliceBook'; // Import the selector function for cart items


function Home2Header() {
  const [activeMobileMenu, setActiveMobileMenu] = useState(false);
  const [activeMobileSubMenu, setActiveSubMobileMenu] = useState(false);
  const [windowPosition, setWindowPosition] = useState(0);
  const [filter, setActiveFilter] = useState("Explore");
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const bookItems = useSelector(selectCartBookItems); // Retrieve cart items from Redux store


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:5000/api/userToken', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserData(response.data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData();
  }, []);

  const userLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
  };

  useEffect(() => {
    const handleScroll = () => {
      setWindowPosition(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className={`header-03 sticky ${windowPosition > 0 && "fix-header animated fadeInDown"}`}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <nav className="navbar navbar-expand-lg">
              {/* Logo */}
              <Link className="navbar-brand" to="/">
                <img src="assets/images/logo.png" alt="" />
              </Link>
              {/* logo End */}

              {/* Moblie Btn Start */}
              <button
                className="navbar-toggler"
                type="button"
                onClick={() => setActiveMobileMenu(!activeMobileMenu)}
              >
                <i className="fal fa-bars"></i>
              </button>
              {/* Moblie Btn End */}
              {/* Nav Menu Start */}
              <div
                className="collapse navbar-collapse"
                style={{ display: activeMobileMenu && "block" }}
              >
                <ul className="navbar-nav">
                 
                    
                    
                     
                      <li>
                        <Link to="/home-2">Home</Link>
                      </li>
                     
                  
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
                        className={`fal ${
                          activeMobileSubMenu === "Events"
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
                        <Link to="/Cart">My Cart</Link>
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
                  <li>
                        <Link to="/StudentReport">Reports</Link>
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
                    <li>
                        <Link to="/ChatbotComponent">Chatbot</Link>
                      </li>
                </ul>
              </div>
                      {/* Basket Icon */}
                      <Link to="/cartBook" className="basket-icon">
                <i className="fas fa-shopping-cart" style={{ color: 'black', fontSize: '24px', marginRight: '10px' }}>
                  {bookItems.length > 0 && <span className="badge">{bookItems.length}</span>} {/* Display the number of items in the cart */}
                </i>
              </Link>
              
              {/* Heart Icon for Wishlist */}
              <Link to="/wishlist" className="wishlist-icon">
                <FaHeart style={{ color: 'black', fontSize: '24px', marginLeft: '10px' }} />
              </Link>
              {/* Nav Menu End  */}

              <div className="dropdown ml-auto">
                {userData && (
                  <UncontrolledDropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                    <DropdownToggle color="transparent" className="nav-link dropdown-toggle d-flex align-items-center">
                      <div className="rounded-circle overflow-hidden mr-2" style={{ width: '30px', height: '30px' }}>
                        <img src={userData.profile} alt="profile" className="w-100 h-100 object-fit-cover" />
                      </div>
                      <div>
                        <p className="mb-0 font-weight-bold" style={{ fontSize: '1.2em' }}>{userData.firstName} {userData.lastName}</p>
                        <p className="mb-0" style={{ fontSize: '0.9em', fontWeight: 'normal' }}>{userData.email}</p>
                      </div>
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-left custom-dropdown-menu text-left" style={{ minWidth: '250px'}}>
                      <DropdownItem>
                        <Link to="/profilestudent" className="text-dark text-decoration-none">
                          <FontAwesomeIcon icon={faUser} className="me-2 text-primary" />
                          My Profile
                        </Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link to="#" className="text-dark text-decoration-none">
                          <FontAwesomeIcon icon={faEnvelope} className="me-2 text-info" />
                          Inbox
                        </Link>
                      </DropdownItem>
                      <DropdownItem onClick={userLogout} className="text-center">
                        <Button color="primary" size="sm">Logout</Button>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                )}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Home2Header;
