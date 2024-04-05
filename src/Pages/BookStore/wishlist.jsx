import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist, clearWishlist } from './Action/wishlistSlice';
import { Link } from 'react-router-dom';
import bookImage from './bookImage.jpg';
import './wishlist.css';

const Wishlist = () => {
const wishlist = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  const handleRemoveFromWishlist = (bookId) => {
    dispatch(removeFromWishlist(bookId));
  };

  const handleClearWishlist = () => {
    dispatch(clearWishlist());
  };

  return (
    <div className="wishlist-container">
      <h2 className="wishlist-title">My Wishlist</h2>
      {wishlist.length === 0 ? (
        <div className="wishlist-empty">
          <p>Your wishlist is currently empty</p>
          <div className="go-home">
            <Link to="/">
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
              <span>Go back Home </span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="wishlist-items">
            {wishlist.map((item, index) => (
              <div className="wishlist-item" key={item._id}>
                <div className="wishlist-details">
                  <img src={bookImage} alt={item.title} />
                  <div className="book-info">
                    <h3>{item.title}</h3>
                    <p>Price: ${item.price}</p>
                
                  </div>
                </div>
                <div className="wishlist-actions">
                  <button className="remove-btn" onClick={() => handleRemoveFromWishlist(item._id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="wishlist-summary">
            <button className="clear-btn-wish" onClick={handleClearWishlist}>Clear Wishlist</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
