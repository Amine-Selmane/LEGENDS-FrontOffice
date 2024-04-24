import { useEffect, useState } from "react";
import PackageCard from "../Cards/PackageCard";
import React from 'react';

function Package() {
  const [carusole, setCarusole] = useState({
    next: 3,
    current: 2,
    prev: 1,
  });

  useEffect(() => {
    const currentSlide = carusole.current === 4 ? 1 : carusole.current + 1;
    const nextSlide = carusole.next === 4 ? 1 : carusole.next + 1;
    const prevSlide = carusole.prev === 4 ? 1 : carusole.prev + 1;
    setTimeout(() => {
      setCarusole({
        next: nextSlide,
        current: currentSlide,
        prev: prevSlide,
      });
    }, 5000);
  }, [carusole]);

  return (
    <section
      className="package-section"
      style={{ backgroundImage: "url(assets/images/home/package-bg.jpg)" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h2 className="sec-title">
              <span>Learning path</span> We support kindies in essential teaching for acquiring the basics and pursuing qualitative and demanding learning.
            </h2>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div id="card-slider" className="pack-slid">
              <PackageCard
                packageInfo={{
                  img: "assets/images/home/p1.jpg",
                  memberShipStatus: "The Initiation Class",
                  description:
                    "The introductory class is a year during which students begin to discover the basic notions of music and experiment with an instrument according to their preferences. Music theory lessons take place in groups to avoid weariness and routine. You will discover innovative teaching methods assisted by specialists in musical and artistic education to facilitate the student's integration into the world of art, facilitate their understanding, develop their creativity and enrich their knowledge.",
                }}
                id={1}
                status={carusole}
              />
              <PackageCard
                packageInfo={{
                  img: "assets/images/home/p2.jpg",
                  memberShipStatus: "Over the next 5 years",
                  description:
                    "Over the next 5 years, teaching will be more in-depth and more specialized. Always under the supervision of one or more teachers. The student will thus be able to concentrate and feel in a serious and professional framework to prepare him for his last year of teaching which will end with obtaining the Arabic music diploma.",
                }}
                id={2}
                status={carusole}
              />
              <PackageCard
                packageInfo={{
                  img: "assets/images/home/p3.jpg",
                  memberShipStatus: "7th grade is a diploma class",
                  description:
                    "The 7th year is a diploma class, at the end of which the student is invited to take a national exam to crown their 7 years of learning with a diploma recognized by the state. Before taking this test, the student is subject to evaluation tests to introduce them to the exam conditions.",
                }}
                id={3}
                status={carusole}
              />
              <PackageCard
                packageInfo={{
                  img: "assets/images/home/p2.jpg",
                  memberShipStatus: "Over the next 5 years",
                  description:
                    "Over the next 5 years, teaching will be more in-depth and more specialized. Always under the supervision of one or more teachers. The student will thus be able to concentrate and feel in a serious and professional framework to prepare him for his last year of teaching which will end with obtaining the Arabic music diploma.",
                }}
                id={4}
                status={carusole}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Package;

// style={{opacity: "0",zIndex: "0", transform: "matrix(0.9, 0, 0, 0.9, 0, -120)"}}
// style={{opacity: "0.75",zIndex: "0",  transform: "matrix(0.9, 0, 0, 0.9, 0, 0)"}}
// style={{opacity: "1", zIndex: "1",  "transform: matrix(1, 0, 0, 1, 0, 125)" }}
// style={{opacity: "0.75",zIndex: "0",  transform: "matrix(0.9, 0, 0, 0.9, 0, 250)"}}
