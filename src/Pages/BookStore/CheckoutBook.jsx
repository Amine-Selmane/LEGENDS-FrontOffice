import { useEffect, useState } from "react";
import Preloader from "../../Component/Preloader";
import Header from "../../Component/Headers";
import Footer from "../../Component/Footer/Footer";
import Banner from "../../Component/Banner/Banner";
import CallAction from "../../Component/CallAction";
import GotoTop from "../../Component/GotoTop";
import CheckoutSuccess from "./CheckoutSuccessBook";
import React from 'react';


function CheckoutBook() {
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
        <Banner title="Events" background="assets/images/banner3.jpg" />
        <section className="coursepage-section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                {/* Use the Event component here */}
                <CheckoutSuccess />
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

export default CheckoutBook;