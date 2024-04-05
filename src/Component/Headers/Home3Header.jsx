import { useState , useEffect } from "react";
import useWindowPosition from "../../Hooks/useWindowPosition";
import { Link , useNavigate } from "react-router-dom";
import axios from 'axios'; // Import Axios for making HTTP requests
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Button,
} from 'reactstrap';
import InstructorProfile from "../../Pages/InstructorProfile";
import { Envelope, Person, PersonFill } from 'react-bootstrap-icons'; // Import des icônes nécessaires
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

function Home3Header() {
  const [activeMobileMenu, setActiveMobileMenu] = useState(false);
  const [activeMobileSubMenu, setActiveSubMobileMenu] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [filter, setActiveFilter] = useState("Explore");
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
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
  const windowPosition = useWindowPosition();

  const handleFilter = (e) => {
    setActiveFilter(e.target.innerText);
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
                  <li
                    className="menu-item-has-children"
                    onClick={() =>
                      setActiveSubMobileMenu(
                        activeMobileSubMenu === "home" ? false : "home"
                      )
                    }
                  >
                    <a>Home</a>
                    <span className="submenu-toggler">
                      <i
                        className={`fal ${
                          activeMobileSubMenu === "home"
                            ? "fa-minus"
                            : "fa-plus"
                        }`}
                      ></i>
                    </span>
                    <ul
                      className="sub-menu"
                      style={{
                        display: activeMobileSubMenu === "home" && "block",
                      }}
                    >
                      <li>
                        <Link to="/">Home One</Link>
                      </li>
                      <li>
                        <Link to="/home-2">Home Two</Link>
                      </li>
                      <li>
                        <Link to="/home-3">Home Three</Link>
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
                        className={`fal ${
                          activeMobileSubMenu === "course"
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
                        <Link to="/course-1">Course 01</Link>
                      </li>
                      <li>
                        <Link to="/course-2">Course 02</Link>
                      </li>
                      <li>
                        <Link to="/course-3">Course 03</Link>
                      </li>
                      <li>
                        <Link to="/single-course">Course Details</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                        <Link to="/TeacherReport">Reports</Link>
                      </li>
                  <li
                    className="menu-item-has-children"
                    name="pages"
                    onClick={(e) => {
                      setActiveSubMobileMenu(
                        e.target.name
                          ? e.target.name === activeMobileSubMenu
                            ? "pages"
                            : e.target.name
                          : activeMobileSubMenu === "pages"
                          ? false
                          : "pages"
                      );
                    }}
                  >
                    <a>Pages</a>
                    <span className="submenu-toggler">
                      <i
                        className={`fal ${
                          activeMobileSubMenu === "pages"
                            ? "fa-minus"
                            : "fa-plus"
                        }`}
                      ></i>
                    </span>
                    <ul
                      className="sub-menu"
                      style={{
                        display:
                          (activeMobileSubMenu === "pages" && "block") ||
                          (activeMobileSubMenu === "aboutPages" && "block"),
                      }}
                    >
                      <li className="menu-item-has-children">
                        <a name="aboutPages">About Pages</a>
                        <span className="submenu-toggler" name="aboutPages">
                          <i
                            className={`fal ${
                              activeMobileSubMenu === "aboutPages"
                                ? "fa-minus"
                                : "fa-plus"
                            }`}
                            name="aboutPages"
                          ></i>
                        </span>
                        <ul
                          className="sub-menu"
                          style={{
                            display:
                              activeMobileSubMenu === "aboutPages" && "block",
                          }}
                        >
                          <li>
                            <Link to="/about-1">About 01</Link>
                          </li>
                          <li>
                            <Link to="/about-2">About 02</Link>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <Link to="/instructor">Instructor Page</Link>
                      </li>
                      <li>
                        <Link to="/profile">Instructor Profile</Link>
                      </li>
                      <li>
                        <Link to="/404">404 Page</Link>
                      </li>
                    </ul>
                  </li>
                  <li
                    className="menu-item-has-children"
                    onClick={() =>
                      setActiveSubMobileMenu(
                        activeMobileSubMenu === "blog" ? false : "blog"
                      )
                    }
                  >
                    <a>Blog</a>
                    <span className="submenu-toggler">
                      <i
                        className={`fal ${
                          activeMobileSubMenu === "blog"
                            ? "fa-minus"
                            : "fa-plus"
                        }`}
                      ></i>
                    </span>
                    <ul
                      className="sub-menu"
                      style={{
                        display: activeMobileSubMenu === "blog" && "block",
                      }}
                    >
                      <li>
                        <Link to="/blog">Blog Page</Link>
                      </li>
                      <li>
                        <Link to="/single-post">Blog Details</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to="/contact">Contact</Link>
                  </li>
                </ul>
              </div>
              {/* Nav Menu End  */}
              <div className="dropdown ml-auto">
  {userData && (
    <UncontrolledDropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
      <DropdownToggle color="transparent" className="nav-link dropdown-toggle d-flex align-items-center">
        {/* Image de profil à gauche du bouton dropdown */}
        <div className="rounded-circle overflow-hidden mr-2" style={{ width: '30px', height: '30px' }}>
          <img src={userData.profile || user1} alt="profile" className="w-100 h-100 object-fit-cover" />
        </div>
        <div>
          <p className="mb-0 font-weight-bold" style={{ fontSize: '1.2em' }}>{userData.firstName} {userData.lastName}</p>
          <p className="mb-0" style={{ fontSize: '0.9em', fontWeight: 'normal' }}>{userData.email}</p>
        </div>
      </DropdownToggle>
      <DropdownMenu className="dropdown-menu-left custom-dropdown-menu text-left" style={{ minWidth: '250px'}}>
       
     
      <DropdownItem>
  <Link to="/profile" className="text-dark text-decoration-none">
    <FontAwesomeIcon icon={faUser} className="me-2 text-primary" /> {/* Ajoutez la classe text-primary pour définir la couleur de l'icône */}
    My Profile
  </Link>
</DropdownItem>
<DropdownItem>
  <Link to="#" className="text-dark text-decoration-none">
    <FontAwesomeIcon icon={faEnvelope} className="me-2 text-info" /> {/* Utilisez une autre classe de couleur, par exemple text-info */}
    Inbox
  </Link>
</DropdownItem>
<DropdownItem onClick={userLogout} className="text-center"> {/* Ajoutez la classe text-center pour centrer le contenu */}
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

export default Home3Header;
