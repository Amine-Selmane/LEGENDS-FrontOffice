import React, { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Rate, message, Modal, Input } from 'antd';
import { useDispatch } from 'react-redux';
import Header from '../../Component/Headers';
import Banner from "../../Component/Banner/Banner";
import { ReactMic } from 'react-mic';
import AudioTimer from './AudioTimer';
import Footer from '../../Component/Footer/Footer';
import HTMLFlipBook from 'react-pageflip';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPinterest,
  FaThumbsUp,
  FaMicrophone, FaStop, FaTrash,
  FaThumbsDown,
  FaHeart, FaAngry,
  FaSmile,
} from 'react-icons/fa';

import './ShowBook.css';
import EmojiPicker from 'emoji-picker-react';
import { addToCartBook } from './Action/cartSliceBook';
const { TextArea } = Input;

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [ratings, setRatings] = useState([]);
  const [userReview, setUserReview] = useState(null);
  const [pdfModalVisible, setPdfModalVisible] = useState(false);
  const [flipBookVisible, setFlipBookVisible] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [voice, setVoice] = useState(false);
  const [recordBlobLink, setRecordBlobLink] = useState(null);
  const [reactions, setReactions] = useState({}); // State to store reactions for each review

  const audioRef = useRef(null); // Add useRef

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const bookResponse = await axios.get(`http://localhost:5000/books/getbookbyid/${id}`);
        setBook(bookResponse.data);
        const ratingsResponse = await axios.get(`http://localhost:5000/ratings/getratingsforbook/${id}`);
        setRatings(ratingsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleAudioPlayback = async (audioId) => {
    try {
      const response = await axios.get(`http://localhost:5000/ratings/api/reviews/${audioId}/audio`, {
        responseType: 'arraybuffer', // Set responseType to arraybuffer
      });
  
      const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(audioBlob);
  
      const audio = new Audio();
      audio.src = audioUrl;
      audio.controls = true;
      audio.autoplay = true;
      audio.play()
        .then(() => {
          console.log("Audio playback started successfully");
        })
        .catch((error) => {
          console.error("Error playing audio:", error);
        });
    } catch (error) {
      console.error("Error fetching audio:", error);
    }
  };
  
  const handleAddToCart = (book) => {
    dispatch(addToCartBook(book));
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleEmojiClick = (emojiObject) => {
    setComment(prevComment => prevComment + emojiObject.emoji);
  };

  const onStop = (recordedBlob) => {
    setRecordBlobLink(recordedBlob.blobURL);
    setIsRunning(false);
  };

  const startHandle = () => {
    setElapsedTime(0);
    setIsRunning(true);
    setVoice(true);
  };

  const stopHandle = () => {
    setIsRunning(false);
    setVoice(false);
  };

  const clearHandle = () => {
    setIsRunning(false);
    setVoice(false);
    setRecordBlobLink(null);
    setElapsedTime(0);
  };

  const handleRatingSubmit = async () => {
    try {
      // Convert recordedBlobLink to base64 string
      const audioBase64 = recordBlobLink ? await getBase64FromUrl(recordBlobLink) : null;
  
      await axios.post('http://localhost:5000/ratings/addRate', {
        bookId: id,
        rating,
        comment,
        recordedAudio: audioBase64, // Pass recorded audio as base64 string
      });
  
      message.success('Rating submitted successfully');
      setComment('');
      setRating(0);
      setUserReview(true);
      setRecordBlobLink(null);
    } catch (error) {
      console.error('Error submitting rating:', error);
      message.error('Failed to submit rating');
    }
  
    // Fetch updated ratings
    const updatedRatings = await axios.get(`http://localhost:5000/ratings/getratingsforbook/${id}`);
    setRatings(updatedRatings.data);
  };
  

  const getBase64FromUrl = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        resolve(reader.result.split(',')[1]);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const openPdfModal = () => {
    setPdfModalVisible(true);
  };
const handleRatingChange = (value) => {
  setRating(value);
};

  const closePdfModal = () => {
    setPdfModalVisible(false);
  };

  const openFlipBook = () => {
    setFlipBookVisible(true);
  };

  const closeFlipBook = () => {
    setFlipBookVisible(false);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleReaction = (reviewId, reaction) => {
    // Check if the opposite reaction has already been selected
    const oppositeReaction = reaction === 'like' ? 'dislike' : 'like';
    if (reactions[reviewId]?.[oppositeReaction] > 0) {
      // If the opposite reaction is selected, decrement its count
      setReactions(prevReactions => ({
        ...prevReactions,
        [reviewId]: {
          ...prevReactions[reviewId],
          [oppositeReaction]: prevReactions[reviewId][oppositeReaction] - 1
        }
      }));
    }
  
    // Toggle the selected reaction
    setReactions(prevReactions => ({
      ...prevReactions,
      [reviewId]: {
        ...prevReactions[reviewId],
        [reaction]: (prevReactions[reviewId]?.[reaction] || 0) + 1
      }
    }));
  
    // Show toast notification for the specific reaction
    switch (reaction) {
      case 'like':
        toast.success('You liked this review!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        break;
      case 'dislike':
        toast.error('You disliked this review!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        break;
      case 'love':
        toast.info('You loved this review!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        break;
      case 'angry':
        toast.warn('You are angry!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        break;
      default:
        break;
    }
  };
  
  return (
   
    <>
        <Header logo="assets/images/kindy.png" joinBtn={true} />
        <Banner title="Events" background="assets/images/banner3.jpg" />

      <div className="single-product-main-content">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="layout">
            <div className="left">
              <img alt={book.title} src={book.image} className="book-image" onClick={openFlipBook} />
            </div>
            <div className="right">
              <div className="details">
                <h1 className="name">{book.title}</h1>
                <p className="price">${book.price}</p>
                <p className="desc">{book.description}</p>
              </div>
              <div className="cart-buttons">
                <div className="quantity-buttons">
                  {book.quantity > 0 ? (
                    <span>In Stock</span>
                  ) : (
                    <span>Out of Stock</span>
                  )}
                </div>
                <button
                  className="add-to-cart-button"
                  onClick={() => handleAddToCart(book)}
                  disabled={book.quantity === 0}
                >
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

      <Modal
        title={book.title}
        visible={pdfModalVisible}
        onCancel={closePdfModal}
        footer={null}
        width={800}
      >
        <iframe src={book.pdfUrl} style={{ width: '100%', height: '500px' }} />
      </Modal>

      <Modal
        title="HTML Flip Book"
        visible={flipBookVisible}
        onCancel={closeFlipBook}
        footer={null}
        width={800}
      >
        <HTMLFlipBook width={800} height={600}>
          <div className="page">Page 1</div>
          <div className="page">Page 2</div>
          <div className="page">Page 3</div>
        </HTMLFlipBook>
      </Modal>

      <div className="review-container">
        <div className="review-section">
          <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
          {ratings && ratings.length > 0 ? (
            ratings.map((rating) => (
              <div key={rating._id} className="review-box">
                <div className="review-header">
                  <p className="user-name">User: {rating.user}</p>
                </div>
                <div className="review-content">
                  <Rate value={rating.rating} disabled />
                  <p><strong className="review-comment">Comment: </strong>{rating.comment}</p>
               
                  {rating.recordedAudio && (
                    <div className="audio-player" onClick={() => handleAudioPlayback(rating.recordedAudio)}>
                      <audio ref={audioRef} controls>
                        <source src={`data:audio/mpeg;base64,${rating.recordedAudio}`} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  )}
                     {/* Reaction buttons */}
                     <div>
                  <div className="reaction-buttons">
  <div className="reaction-button" onClick={() => handleReaction(rating._id, 'like')}>
    <FaThumbsUp className="like-button" />
  </div>
  <div className="reaction-button" onClick={() => handleReaction(rating._id, 'dislike')}>
    <FaThumbsDown className="dislike-button" />
  </div>
  <div className="reaction-button" onClick={() => handleReaction(rating._id, 'love')}>
    <FaHeart className="reaction-icon love" />
  </div>
  <div className="reaction-button" onClick={() => handleReaction(rating._id, 'angry')}>
    <FaAngry className="reaction-icon angry" />
  </div>
  {/* Add more reaction buttons as needed */}
</div>

  

                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}

          <h2 className="text-2xl font-semibold mb-4">Your Review</h2>
          <TextArea
            id="comment"
            name="comment"
            value={comment}
            onChange={handleCommentChange}
            className="comment-input"
            rows="4"
            placeholder="Enter your comment..."
          />
          <div className='emoji-picker-toggle' onClick={toggleEmojiPicker}>
            <FaSmile size={20} />
          </div>
          {showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick} />}
          <div className="rating-input">
            <label className="block text-lg font-semibold mb-2">Rating:</label>
            <Rate onChange={handleRatingChange} value={rating} />
          </div>
          <div>
            <div className="max-w-sm border py-4 px-6 mx-auto bg-black">
              <AudioTimer isRunning={isRunning} elapsedTime={elapsedTime} setElapsedTime={setElapsedTime} />
              <ReactMic
                record={voice}
                className="sound-wave w-full"
                onStop={onStop}
              />
              <div className="audio-recorder-container">
              
              <div className="audio-controls">
  {!voice ? (
    <FaMicrophone onClick={startHandle} className="icon" />
  ) : (
    <FaStop onClick={stopHandle} className="icon-stop" />
  )}
  {recordBlobLink && (
    <FaTrash onClick={clearHandle} className="icon" />
  )}
</div>

                {recordBlobLink && (
                  <div className="audio-player">
                    <audio controls src={recordBlobLink}></audio>
                  </div>
                )}
              </div>
            </div>
          </div>
          <button className="submit-button" onClick={handleRatingSubmit}>
            Submit Review
          </button>
          <div className="continue-shopping mt-4">
            <Link to="/books">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ShowBook;
