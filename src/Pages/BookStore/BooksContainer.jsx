import React, { useState, useEffect } from 'react';
import { Card, Typography, Button, Pagination, Modal, Rate, Avatar } from 'antd';
import { ShoppingCartOutlined, HeartFilled, EyeOutlined, AudioOutlined, AudioMutedOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartBook } from "./Action/cartSliceBook";
import { addToWishlist } from "./Action/wishlistSlice";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { Meta } = Card;
const { Title } = Typography;

const BooksContainer = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user); // Assuming the user state is stored in Redux

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(2);
  const [selectedBook, setSelectedBook] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/books');
      const booksWithRatings = await Promise.all(response.data.data.map(async (book) => {
        const averageRating = await fetchAverageRating(book._id);
        return { ...book, averageRating };
      }));
      setBooks(booksWithRatings);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching books:', error);
      setLoading(false);
    }
  };

  const fetchAverageRating = async (bookId) => {
    try {
      const response = await axios.get(`http://localhost:5000/ratings/getAverageRatingForBook/${bookId}`);
      return response.data.averageRating;
    } catch (error) {
      console.error('Error fetching average rating:', error);
      return null;
    }
  };

  const handleViewDetails = (book) => {
    setSelectedBook(book);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
    setModalVisible(false);
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handlePaginationChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddToCart = (book) => {
    dispatch(addToCartBook(book));
  };

  const handleAddToWishlist = (book) => {
    dispatch(addToWishlist(book));
  };

  const toggleAudio = () => {
    setIsMuted(!isMuted);
  };

  const speakDescription = (description) => {
    if (!isMuted) {
      const speech = new SpeechSynthesisUtterance(description);
      window.speechSynthesis.speak(speech);
    }
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  return (
    <section className="event-section">
      <div className="container">
        <Title level={2} style={{ textAlign: 'center', marginBottom: '30px' }}>Our Books</Title>
        <div className="row">
          {currentBooks.map(book => (
            <div className="col-md-6" key={book._id}>
              <div className="event-item-1">
                <div className="ci-thumb" style={{ width: "90%" }}>
                  <Link to={`/books/details/${book._id}`}>
                    <img
                      alt={book.title}
                      src={book.image}
                      style={{ maxWidth: "200%", height: "auto" }}
                    />
                  </Link>
                </div>
                <h4>{book.title}</h4>
                <Rate value={book.averageRating} disabled />
                <p>Price: ${book.price}</p>
                <Button type="link" onClick={() => handleViewDetails(book)} icon={<EyeOutlined />} />
                <Button type="link" onClick={() => handleAddToWishlist(book)} icon={<HeartFilled />} />
                <Button type="link" onClick={() => handleAddToCart(book)} icon={<ShoppingCartOutlined />} />
                <Button type="link" onClick={() => speakDescription(book.description)} icon={<AudioOutlined />} />
                {user && (
                  <div>
                    <Avatar src={user.profilePicture} />
                    <span>{user.username}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Pagination
          current={currentPage}
          total={books.length}
          pageSize={booksPerPage}
          onChange={handlePaginationChange}
          showSizeChanger={false}
        />
      </div>

      <Modal
        title="Book Details"
        visible={modalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        {selectedBook && (
          <div>
            <img
              src={selectedBook.image}
              style={{ width: '30%', height: '50%', objectFit: 'cover', borderRadius: '10px', cursor: 'pointer' }}
            />
            <p>Title: {selectedBook.title}</p>
            <p>Description: {showFullDescription ? selectedBook.description : `${selectedBook.description.slice(0, 100)}...`} <Button type="link" onClick={toggleDescription}>{showFullDescription ? 'See Less' : 'See More'}</Button></p>
            <p>Price: {selectedBook.price}</p>
            <Rate value={selectedBook.averageRating} disabled />
            {user && (
              <div>
                <Avatar src={user.profile} />
                <span>{user.username}</span>
              </div>
            )}
          </div>
        )}
      </Modal>
    </section>
  );
};

export default BooksContainer;
