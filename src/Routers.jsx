import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from 'react';

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
import BookList from "./Pages/BookStore/BookList";
import Cart from "./Pages/BookStore/Cart";
import ShowBook from "./Pages/BookStore/ShowBook";
import CheckoutSuccess from "./Pages/BookStore/CheckoutSuccess";
import Wishlist from "./Pages/BookStore/wishlist";
import OrderHistory from "./Pages/BookStore/OrderHistory";
import StudentReport from "./Component/Reports/StudentReport";
import TeacherReport from "./Component/Reports/TeacherReport";
import CartEvent from "./Pages/Events/CartEvent";
import Chekout from "./Pages/Events/Chekout";
import RegisterFormik from "./Component/auth/RegisterFormik";
import LoginFormik from "./Component/auth/LoginFormik";
import RecoverPassword from "./Component/auth/RecoverPassword";
import Maintanance from "./Component/auth/Maintanance";
import LockScreen from "./Component/auth/LockScreen";
import StudentProfile from "./Pages/StudentProfile";
import Chat from "./Component/chatSys/pages/Chat/Chat";
import Auth from "./Component/chatSys/middlware/auth";



import ListEvent from "./Pages/Events/ListEvent";
import PriceCard from "./Component/price-card/price-card.component";
import PriceDetails from "./Component/Pricedetails/pricedetails";
import QuizAssignment from "./Component/Quiz/QuizAssignment";
import QuizList from "./Component/Quiz/QuizList";
import QuizUpdate from "./Component/Quiz/QuizUpdate";
import QuizCodeInput from "./Component/Quiz/QuizCodeInput";
import QuizDisplay from "./Component/Quiz/QuizDisplay";
import QuizDisplayParent from "./Component/Quiz/QuizDisplayParent";
import QuestionForm from "./Component/Questions/QuestionForm";
import QuestionList from "./Component/Questions/QuestionList";
import UpdateQuestion from "./Component/Questions/UpdateQuestion";
import Recommendations from "./Pages/Events/Recommendations";
import ChatbotComponent from "./Component/Chatbot/chatBott";
import ClaimForm from "./Component/Claims/ClaimForm";

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
    path: "/Recommendations",
    element: <Recommendations/>,
  },
  {
    path: "/wishlist",
    element: < Wishlist/>,
  },
  
  
  
  {
    path: "/books/details/:id",
    element: <ShowBook/>,
  },
  {
    path: "/ChatbotComponent",
    element: <ChatbotComponent />, 
  },
  
  {
    path: "/book/checkout-success",
    element: <CheckoutSuccess/>,
  },
  {
    path: "/History",
    element: <OrderHistory/>,
  },
  
 {
    path: "/books",
    element: <BookList/>, 
  },
  {
    path: "/cartBook",
    element: <Cart/>,
  }, 
  {path: "/QuizAssignment",
  element: <QuizAssignment/>,
},
{path: "/quiz",
element: <QuizList/>,
},
{path: "/quiz/update/:id",
element: <QuizUpdate/>,
},

{path: "/question/new",
element: <QuestionForm/>,
},
{path: "/questions",
element: <QuestionList/>,
},
{path: "/question/update/:id",
element: <UpdateQuestion/>,
},

{
  path: "/quiz-display", // Définissez une route pour afficher le composant QuizDisplayParent
  element: <QuizDisplayParent />, // Utilisez QuizDisplayParent comme élément à afficher pour cette route
},
{path: "/QuizCodeInput",
element: <QuizCodeInput/>,
},
{path: "/QuizDisplay/:code",
element: <QuizDisplay/>,
},
 
 
  {path: "/StudentReport",
  element: <StudentReport/>,
},
{path: "/TeacherReport",
  element: <TeacherReport/>,
},

{path: "/claimform",
  element: <ClaimForm/>,
},
{
  path: "/ChatbotComponent",
  element: <ChatbotComponent />, 
},

{
  path: "/EventList",
  element: <ListEvent/>,
},
  {
    path: "/Cart",
    element: <CartEvent/>,
  },  {
    path: "/login",
    element: <LoginFormik />,
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
    path: "/paiementInscri/:userId",
    element: <PriceDetails/>,
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

  { path: '/msg', name: 'form-validation', exact: true, element:<Auth> <Chat /> </Auth>},

  {
    path: "*",
    element: <Error />,
  }

        

 
]);

function Routers() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default Routers;
