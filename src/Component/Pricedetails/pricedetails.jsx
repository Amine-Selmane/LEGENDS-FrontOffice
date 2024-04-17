import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PriceCard  from "../price-card/price-card.component";
import PriceCard2  from "../price-card/price-card2.component";
import PriceCard3  from "../price-card/price-card3.component";

import "./price.css";

function PriceDetails() {
  const { userId } = useParams();
  const [courses, setCourses] = useState([]);
  const [selectMonthly, setSelectMonthly] = useState(true);
  const [halfYearlyPriceTotal, setHalfYearlyPriceTotal] = useState(0);
  const [yearlyPriceTotal, setYearlyPriceTotal] = useState(0);

  useEffect(() => {
    const fetchCourses = async () => {
        console.log(userId);
      try {
        const response = await axios.get(`http://localhost:5000/api/${userId}/courses`);
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [userId]);

  useEffect(() => {
    // Calculate total price for half yearly and yearly
    let halfYearlyTotal = 0;
    let yearlyTotal = 0;

    courses.forEach((course) => {
      halfYearlyTotal += parseFloat(course.halfYearlyPrice);
      yearlyTotal += parseFloat(course.yearlyPrice);
    });

    setHalfYearlyPriceTotal(halfYearlyTotal);
    setYearlyPriceTotal(yearlyTotal);
  }, [courses]);

  console.log("Courses:", courses);


  return (
    <div className="PricingApp">
      <div className="app-container">
        {/* Header */}
        <header>
          <h1 className="header-topic">Our Pricing Plan</h1>
          
        </header>
        {/* Cards here */}
        <div className="pricing-cards">
          <PriceCard
            title="Paying in cash in person."
            price={selectMonthly ? "Cash " : "Cash "}
            storage="Instantaneous Transactions"
            users="No Fees or Interest"
            sendUp="Universal Acceptance"
          />
          <PriceCard2
            title="Annual"
            price={selectMonthly ? yearlyPriceTotal : yearlyPriceTotal}
            storage="Maximum Savings"
            users="Streamlined Finances"
            sendUp="Uninterrupted Service"
          />
          <PriceCard3
            title="Semi-Annual"
            price={selectMonthly ? halfYearlyPriceTotal : halfYearlyPriceTotal}
            storage="Reduced Financial Stress"
            users="Enhanced Commitment"
            sendUp="Reduced Administrative Hassle"
          />
        </div>
      </div>
    </div>
  );
}

export default PriceDetails;