import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseItemCard from '../Cards/CourseItemCard'; // Assuming CourseItemCard component is imported from the correct path

const baseURL = 'http://localhost:5000';

const PopularBooks = ({ heading }) => {
  const [popularBooks, setPopularBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPopularBooks();
  }, []);

  const fetchPopularBooks = async () => {
    try {
      const response = await axios.get(`${baseURL}/ratings/popular`);
      
      // Check if response.data is an array
      if (!Array.isArray(response.data)) {
        throw new Error('Response data is not an array');
      }
  
      // Filter the data only if it's an array
      const filteredBooks = response.data.filter(book => calculateAverageRating(book) > 4);
      setPopularBooks(filteredBooks);
    } catch (error) {
      console.error('Error fetching popular books:', error);
    }
  };
  
  const calculateAverageRating = (book) => {
    if (book.ratings.length === 0) return 0;
    const totalRating = book.ratings.reduce((acc, rating) => acc + rating, 0);
    return totalRating / book.ratings.length;
  };

  return (
    <section className="popular-course-section">
      <div className="container">
        {heading && (
          <div className="row">
            <div className="col-md-8">
              <h2 className="sec-title">
                <span>Explore</span> Our Popular Books
              </h2>
            </div>
            <div className="col-md-4">
              <a className="read-more" href="/books">
                Browse Online Books<i className="arrow_right"></i>
              </a>
            </div>
          </div>
        )}
        <div className="row">
          <div className="col-lg-12">
            <div className="course-wrapper">
              {loading ? (
                <p>Loading...</p>
              ) : (
                popularBooks.map(book => (
                  <CourseItemCard key={book.id} title={book.title} link="single-course">
                    <img src={book.image} alt={book.title} />
                  </CourseItemCard>
                ))
              )}
            </div>
          </div>
        </div>
        <div className="row mt-120">
          <div className="col-lg-7 col-md-6">
            <div className="ab-thumb">
              <img src="assets/images/home/1.png" alt="" />
            </div>
          </div>
          <div className="col-lg-5 col-md-6">
            <div className="ab-content">
              <h3>WHO ARE WE?</h3>
              <p className="mid-item">
                Who else do you know who'll have this history?
              </p>
              <p>
              Since 1999, Conservatoire El Kindy has supported generations of musical artists thanks to rich and demanding teaching
               and the rigor of a team of specialists and experienced teachers who continue to supervise and guide the seeds of 
               artists over the years. Students from the conservatory have excelled during national competitions: the amateur soloists
              of Megrine, the Néapolis days, etc. Their apprenticeship course is often crowned by obtaining the Arabic music diploma 
              recognized by the Tunisian Ministry of Culture.
              </p>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularBooks;
