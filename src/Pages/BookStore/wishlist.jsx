import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist, clearWishlist } from './Action/wishlistSlice';
import { Card, Typography, Button, Pagination, Modal, Rate, Avatar } from 'antd';

import { Link } from 'react-router-dom';
import Footer from "../../Component/Footer/Footer";
import Banner from "../../Component/Banner/Banner";
import Header from '../../Component/Headers';
import GotoTop from "../../Component/GotoTop";
import { ShoppingCartOutlined } from '@ant-design/icons';
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

  // handleAddToCart function definition if needed
  const handleAddToCart = (item) => {
    // Add item to cart logic
  };

  return (
    <div>
      <Header />
      <div className="wishlist-space"></div> {/* Add a div for space */}

      <div className="wishlist-container">
        {wishlist.length === 0 ? (
          <div className="wishlist-empty">
            <p>Your wishlist is currently empty</p>
            <div className="go-home">
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
                    <img
                      alt={item.title}
                      src={item.image}
                      style={{ maxWidth: "200%", height: "auto" }}
                    />
                    <div className="book-info">
                      <h3>{item.title}</h3>
                      <p>Price: ${item.price}</p>
                      {/* Additional JSX: Add a button/link to view details */}
                      <Link to={`/books/details/${item._id}`} className="view-details-btn">
                        View Details
                      </Link>
                    </div>
                  </div>
                  <div className="wishlist-actions">
                    <button className="remove-btn" onClick={() => handleRemoveFromWishlist(item._id)}>
                      Remove
                    </button>
                    <Button type="link" onClick={() => handleAddToCart(item)} icon={<ShoppingCartOutlined />} />
                  </div>
                </div>
              ))}
            </div>
            <div className="wishlist-summary">
              <button className="clear-btn-wish" onClick={handleClearWishlist}>
                Clear Wishlist
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Note: These components will render globally */}
      <Footer />
    </div>
  );
};

export default Wishlist;
