import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Rate,message } from 'antd';
import bookImage from './bookImage.jpg';
import './ShowBook.css'; // Import the CSS file

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [ratings, setRatings] = useState([]); // State to store ratings
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/books/getbookbyid/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });

    // Fetch ratings for the book
    axios
      .get(`http://localhost:5000/ratings/getratingsforbook/${id}`)
      .then((response) => {
        console.log('Ratings:', response.data); // Log ratings data
        setRatings(response.data); // Update ratings state
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleRatingSubmit = async () => {
    try {
      // Check if the rating value is within the valid range (1 to 5)
      if (rating < 1 || rating > 5) {
        console.error('Rating value must be between 1 and 5');
        return;
      }
  
      // Submit the review if the rating value is valid
      await axios.post('http://localhost:5000/ratings/addRate', {
        bookId: id,
        rating,
        comment
      });
  
      message.success('Rating submitted successfully');
      setComment('');
      setRating(0); // Reset the rating after submission
    } catch (error) {
      console.error('Error submitting rating:', error);
      message.error('Failed to submit rating');
    }
      // Refresh ratings after submitting a new one
      axios
        .get(`http://localhost:5000/ratings/getratingsforbook/${id}`)
        .then((response) => {
          setRatings(response.data);
        })
        .catch((error) => {
          console.error('Error fetching ratings:', error);
        });
    
  
      // Refresh ratings after submitting a new one
      axios
        .get(`http://localhost:5000/ratings/getratingsforbook/${id}`)
        .then((response) => {
          setRatings(response.data);
        })
        .catch((error) => {
          console.error('Error fetching ratings:', error);
        });
   
  };

  return (
    <div className='show-book-container'>
      <h1 className='text-3xl my-4'>Book Details</h1>
      <div className='book-details'>
        <div className='book-image'>
          <img
            alt={book.title}
            src={bookImage}
            style={{ width: '200px', height: '300px', objectFit: 'cover', borderRadius: '10px', cursor: 'pointer' }}
          />
        </div>
        <div className='book-info'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-600 font-semibold'>Title:</span>
            <span className='text-lg'>{book.title}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-600 font-semibold'>Description:</span>
            <span className='text-lg'>{book.description}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-600 font-semibold'>Price:</span>
            <span className='text-lg'>${book.price}</span>
          </div>
        </div>
      </div>
      <div className='review-section'>
        <h2 className='text-2xl font-semibold mb-4'>Reviews</h2>
        {ratings && ratings.length > 0 ? (
          <div>
            {ratings.map((rating) => (
              <div key={rating._id} className="review-box">
                <div className="review-header">
                  <p className="user-name">User: {rating.userName}</p>
                </div>
                <div className="review-content">
                  <Rate value={rating.rating} disabled />
                  <p><strong className='review-comment'>Comment: </strong>{rating.comment}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
      <h2 className='text-2xl font-semibold mb-4'>Your Review </h2>

      <textarea
        id='comment'
        name='comment'
        value={comment}
        onChange={handleCommentChange}
        className='comment-input'
        rows='4'
        placeholder='Enter your comment...'
      ></textarea>
      <div className='rating-input'>
        <label className='block text-lg font-semibold mb-2'>Rating:</label>
        <Rate onChange={handleRatingChange} value={rating} />
      </div>
      <button
        className='submit-button'
        onClick={handleRatingSubmit}
      >
        Submit Review
      </button>
      <div className='continue-shopping mt-4'>
        <Link to='/books'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            fill='currentColor'
            className='bi bi-arrow-left'
            viewBox='0 0 16 16'
          >
            <path
              fillRule='evenodd'
              d='M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z'
            />
          </svg>
          <span>Continue Shopping</span>
        </Link>
      </div>
    </div>
  );
};

export default ShowBook;
