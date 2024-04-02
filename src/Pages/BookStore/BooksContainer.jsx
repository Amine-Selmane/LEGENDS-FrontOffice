import React, { useState, useEffect } from 'react';
import { Card, Typography, Button, Pagination, Modal, Rate } from 'antd';
import { ShoppingCartOutlined, HeartFilled, EyeOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'; 
import { addToCart } from "./Action/cartSlice";
import { addToWishlist } from "./Action/wishlistSlice";
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bookImage from './bookImage.jpg';

const { Meta } = Card;
const { Title } = Typography;

const BooksContainer = () => {
  const dispatch = useDispatch(); 

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(4);
  const [selectedBook, setSelectedBook] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

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
    dispatch(addToCart(book));
  };

  const handleAddToWishlist = (book) => {
    dispatch(addToWishlist(book));
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px' }}>
        {currentBooks.map(book => (
          <div key={book._id} style={{ width: '200px', height: '300px', position: 'relative' }}>
            <Link to={`/books/details/${book._id}`}>
              <img
                alt={book.title}
                src={bookImage}
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px', cursor: 'pointer' }}
              />
            </Link>
            <div style={{ position: 'absolute', bottom: '10px', left: '10px', right: '10px', background: 'rgba(255, 255, 255, 0.9)', padding: '5px', borderRadius: '5px', textAlign: 'center' }}>
              <Title level={5} style={{ margin: 0 }}>{book.title}</Title>
              <Rate value={book.averageRating} disabled allowHalf />
              <div style={{ marginTop: '5px' }}>
                <Button type="link" onClick={() => handleViewDetails(book)} icon={<EyeOutlined />} />
                <Button type="link"  onClick={() => handleAddToWishlist(book)}icon={<HeartFilled />} />
                <Button type="link" onClick={() => handleAddToCart(book)} icon={<ShoppingCartOutlined />} />
              </div>
            </div>
          </div>
        ))}
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
                src={bookImage}
                style={{ width: '30%', height: '50%', objectFit: 'cover', borderRadius: '10px', cursor: 'pointer' }}
              />
            <p>Title: {selectedBook.title}</p>
            <p>Description: {showFullDescription ? selectedBook.description : `${selectedBook.description.slice(0, 100)}...`} <Button type="link" onClick={toggleDescription}>{showFullDescription ? 'See Less' : 'See More'}</Button></p>
            <p>Price: {selectedBook.price}</p>

          </div>
        )}
      </Modal>
    </div>
  );
};

export default BooksContainer;
