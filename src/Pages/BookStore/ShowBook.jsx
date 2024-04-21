import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Rate, message } from 'antd';
import Header from "../../Component/Headers";
import Footer from "../../Component/Footer/Footer";
import './ShowBook.css'; // Import the CSS file
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPinterest,
  FaCartPlus,
} from 'react-icons/fa';

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [ratings, setRatings] = useState([]); // State to store ratings
  const [userReview, setUserReview] = useState(null); // State to store user's review for the current book
  const { id } = useParams();

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
        comment
      });

      message.success('Rating submitted successfully');
      setComment('');
      setRating(0);
    } catch (error) {
      console.error('Error submitting rating:', error);
      message.error('Failed to submit rating');
    }

    // Fetch ratings again after submission
    const updatedRatings = await axios.get(`http://localhost:5000/ratings/getratingsforbook/${id}`);
    setRatings(updatedRatings.data);
  };

  return (
    <>
      <Header /> {/* Include the Header component */}
      <div className='single-product-main-content'>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className='layout'>
            <div className='left'>
              <img alt={book.title} src={book.image} className='book-image' />
            </div>
            <div className='right'>
              <div className='details'>
                <h1 className='name'>{book.title}</h1>
                <p className='price'>${book.price}</p>
                <p className='desc'>{book.description}</p>
              </div>
              <div className='cart-buttons'>
                <div className='quantity-buttons'>
                  <button>-</button>
                  <span>5</span>
                  <button>+</button>
                </div>
                <button className='add-to-cart-button'>ADD TO CART</button>
              </div>
              <div className='info-item'>
                <span className='text-bold'>Category: Books</span>
                <span className='text-bold'>Share:</span>
                <span className='Social-icons'>
                  <FaFacebookF size={16} />
                  <FaTwitter size={16} />
                  <FaInstagram size={16} />
                  <FaLinkedinIn size={16} />
                  <FaPinterest size={16} />
                </span>
              </div>
              <div className='info-item'>
                <span className='text-bold'>Delivery Time:</span>
                <span className='normal-text'>24-48 hours</span>
              </div>
              <div className='info-item'>
                <span className='text-bold'>Delivery Area:</span>
                <span className='normal-text'>Nation wide delivery in Tunisia <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Flag_of_Tunisia.svg/1200px-Flag_of_Tunisia.svg.png" alt="Tunisia Flag" width="20" /></span>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer /> {/* Include the Footer component */}
    </>
  );
};

export default ShowBook;
