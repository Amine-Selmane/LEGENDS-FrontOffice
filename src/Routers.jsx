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
import CartEvent from "./Pages/Events/CartEvent";
import Chekout from "./Pages/Events/Chekout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/checkout-success",
    element: <Chekout/>,
  },
  {
    path: "/EventList",
    element: <ListEvent/>,
  },
  {
    path: "/Cart",
    element: <CartEvent/>,
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