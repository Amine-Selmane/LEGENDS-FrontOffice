import { useEffect, useState } from "react";
import Preloader from "../../Component/Preloader";
import Topbar from "../../Component/Headers/Topbar";
import Header from "../../Component/Headers";
import Home2Header from "../../Component/Headers/Home2Header";

import HomeTowHero from "../../Component/Heros/HomeTowHero";
import Home2PopularCourse from "../../Component/Course/Home2PopularCourse";
import FeatureHome2 from "../../Component/Features/FeatureHome2";
import Teachers from "../../Component/Teachers/Teachers";
import Testimonial from "../../Component/Testimonials/Testimonial";
import Pricing from "../../Component/Pricing/Pricing";
import Customer from "../../Component/Customer/Customer";
import FooterHome2 from "../../Component/Footer/FooterHome2";
import GotoTop from "../../Component/GotoTop";
import React from 'react';

function Home2() {
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
        <Home2Header />
        <HomeTowHero />
        <Home2PopularCourse />
        <FeatureHome2 />
        <Teachers />
        <Testimonial />
        <Pricing />
        <Customer />
        <FooterHome2 />
        <GotoTop />
      </>
    );
  }
  return content;
}

export default Home2;
