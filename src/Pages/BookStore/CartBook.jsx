import { useEffect, useState } from "react";
import Preloader from "../../Component/Preloader";
import Header from "../../Component/Headers";
import Footer from "../../Component/Footer/Footer";
import Banner from "../../Component/Banner/Banner";
import CallAction from "../../Component/CallAction";
import GotoTop from "../../Component/GotoTop";
import Cart from "./Cart"; // Import the Event component

function CartBook() {
  const [isLoading, setIsLoading] = useState(true);

  let content = undefined;
  useEffect(() => {
    setIsLoading(false);
  }, [isLoading]);

  if (isLoading) {
    content = <Preloader />;
  } else {
    content = (
      <>
        <Header logo="assets/images/kindy.png" joinBtn={true} />
        <Banner title="Shopping Cart" background="assets/images/banner3.jpg" />
        <section className="coursepage-section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                {/* Use the Event component here */}
                <Cart />
              </div>
            </div>
          </div>
        </section>
        <CallAction btnClass="bisylms-btn" />
        <Footer />
        <GotoTop />
      </>
    );
  }
  return content;
}

export default CartBook;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Preloader from "../../Component/Preloader";
// import Header from "../../Component/Headers";
// import Footer from "../../Component/Footer/Footer";
// import Banner from "../../Component/Banner/Banner";
// import CallAction from "../../Component/CallAction";
// import GotoTop from "../../Component/GotoTop";
// import EventListView from "./EventListView"; // Import the EventListView component

// function EventList() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     // Fetch events from Express backend when the component mounts
//     axios.get("http://localhost:5000/events")
//       .then(response => {
//         setEvents(response.data);
//         setIsLoading(false);
//       })
//       .catch(error => {
//         console.error("Error fetching events:", error);
//         setIsLoading(false);
//       });
//   }, []);

//   let content = undefined;

//   if (isLoading) {
//     content = <Preloader />;
//   } else {
//     content = (
//       <>
//         <Header logo="assets/images/logo4.png" joinBtn={true} />
//         <Banner title="Events" background="assets/images/banner3.jpg" />
//         <section className="coursepage-section">
//           <div className="container">
//             <div className="row">
//               {events.map(event => (
//                 <div className="col-md-6" key={event._id}>
//                   <EventListView event={event} />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//         <CallAction btnClass="bisylms-btn" />
//         <Footer />
//         <GotoTop />
//       </>
//     );
//   }

//   return content;
// }

// export default EventList;
