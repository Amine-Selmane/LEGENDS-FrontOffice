import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import Home2 from "./Pages/Home-2";
import Home3 from "./Pages/Home-3";
import Course1 from "./Pages/Course-1";
import Course2 from "./Pages/Course-2";
import Course3 from "./Pages/Course-3";
import CourseSingle from "./Pages/CourseSingle";
import About1 from "./Pages/About-1";
import About2 from "./Pages/About-2";
import Instructor from "./Pages/Instructor";
import InstructorProfile from "./Pages/InstructorProfile";
import Error from "./Pages/Error";
import Blogs from "./Pages/Blogs";
import SinglePost from "./Pages/SinglePost";
import Contact from "./Pages/Contact";
import ListEvent from "./Pages/Events/ListEvent";
import RegisterFormik from "./Component/auth/RegisterFormik";
import LoginFormik from "./Component/auth/LoginFormik";
import RecoverPassword from "./Component/auth/RecoverPassword";
import Maintanance from "./Component/auth/Maintanance";
import LockScreen from "./Component/auth/LockScreen";
import StudentProfile from "./Pages/StudentProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/EventList",
    element: <ListEvent/>,
  },

  {
    path: "/home-2",
    element: <Home2 />,
  },
  {
    path: "/home-3",
    element: <Home3 />,
  },
  {
    path: "/course-1",
    element: <Course1 />,
  },
  {
    path: "/course-2",
    element: <Course2 />,
  },
  {
    path: "/course-3",
    element: <Course3 />,
  },
  {
    path: "/register",
    element: <RegisterFormik />,
  },
  {
    path: "/login",
    element: <LoginFormik />,
  },
  {
    path: "/recovery",
    element: <RecoverPassword />,
  },
  {
    path: "/otp",
    element: <Maintanance />,
  },
  {
    path: "/reset",
    element: <LockScreen />,
  },
  {
    path: "/single-course",
    element: <CourseSingle />,
  },
  {
    path: "/about-1",
    element: <About1 />,
  },
  {
    path: "/about-2",
    element: <About2 />,
  },
  {
    path: "/instructor",
    element: <Instructor />,
  },
  {
    path: "/profile",
    element: <InstructorProfile />,
  },
  {
    path: "/profilestudent",
    element: <StudentProfile />,
  },
  {
    path: "/blog",
    element: <Blogs />,
  },
  {
    path: "/single-post",
    element: <SinglePost />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "*",
    element: <Error />,
  },
]);

function Routers() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default Routers;
