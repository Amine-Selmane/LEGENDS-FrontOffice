import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Rate, message, Button, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector
import { addToCartBook } from './Action/cartSliceBook'; // Import addToCartBook action creator
import Header from '../../Component/Headers';
import Footer from '../../Component/Footer/Footer';
import './ShowBook.css';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPinterest,
  FaCartPlus,
} from 'react-icons/fa';

const { TextArea } = Input;

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [ratings, setRatings] = useState([]);
  const [userReview, setUserReview] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch(); // Get the dispatch function

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/books/getbookbyid/${id}`)
      .then((response) => {
        setBook(response.data);
      })
      .catch((error) => {
        console.error('Error fetching book:', error);
      })
      .finally(() => {
        setLoading(false);
      });

    axios
      .get(`http://localhost:5000/ratings/getratingsforbook/${id}`)
      .then((response) => {
        setRatings(response.data);
      })
      .catch((error) => {
        console.error('Error fetching ratings:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleAddToCart = (book) => {
    dispatch(addToCartBook(book)); // Dispatch the addToCartBook action with the book data
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleRatingSubmit = async () => {
    try {
      if (userReview) {
        message.error('You have already submitted a review for this book');
        return;
      }
  
      if (rating < 1 || rating > 5) {
        throw new Error('Rating value must be between 1 and 5');
      }
  
      await axios.post('http://localhost:5000/ratings/addRate', {
        bookId: id,
        rating,
        comment,
      });
  
      message.success('Rating submitted successfully');
      setComment('');
      setRating(0);
      setUserReview(true); // Set userReview to true after successful submission
    } catch (error) {
      console.error('Error submitting rating:', error);
      message.error('Failed to submit rating');
    }
  
    const updatedRatings = await axios.get(
      `http://localhost:5000/ratings/getratingsforbook/${id}`
    );
    setRatings(updatedRatings.data);
  };
  

  return (
    <>
      <Header />
      <div className="single-product-main-content">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="layout">
            <div className="left">
              <img alt={book.title} src={book.image} className="book-image" />
            </div>
            <div className="right">
              <div className="details">
                <h1 className="name">{book.title}</h1>
                <p className="price">${book.price}</p>
                <p className="desc">{book.description}</p>
              </div>
              <div className="cart-buttons">
                <div className="quantity-buttons">
                  <button>-</button>
                  <span>5</span>
                  <button>+</button>
                </div>
                {/* Attach onClick event handler to call handleAddToCart */}
                <button className="add-to-cart-button" onClick={() => handleAddToCart(book)}>
                  ADD TO CART
                </button>
              </div>
              <div className="info-item">
                <span className="text-bold">Category: Books</span>
                <span className="text-bold">Share:</span>
                <span className="Social-icons">
                  <FaFacebookF size={16} />
                  <FaTwitter size={16} />
                  <FaInstagram size={16} />
                  <FaLinkedinIn size={16} />
                  <FaPinterest size={16} />
                </span>
              </div>
              <div className="info-item">
                <span className="text-bold">Delivery Time:</span>
                <span className="normal-text">24-48 hours</span>
              </div>
              <div className="info-item">
                <span className="text-bold">Delivery Area:</span>
                <span className="normal-text">
                  Nationwide delivery in Tunisia{' '}
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Flag_of_Tunisia.svg/1200px-Flag_of_Tunisia.svg.png"
                    alt="Tunisia Flag"
                    width="20"
                  />
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className='review-section'>
        <h2 className='text-2xl font-semibold mb-4'>Reviews</h2>
        {ratings && ratings.length > 0 ? (
          <div>
            {ratings.map((rating) => (
              <div key={rating._id} className='review-box'>
                <div className='review-header'>
                  <p className='user-name'>User: {rating.user}</p>
                </div>
                <div className='review-content'>
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
      <div className='review-section'>

      <h2 className='text-2xl font-semibold mb-4'>Your Review </h2>
      <TextArea
        id='comment'
        name='comment'
        value={comment}
        onChange={handleCommentChange}
        className='comment-input'
        rows='4'
        placeholder='Enter your comment...'
      />
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

      <Footer />
    </>
  );
};

export default ShowBook;
