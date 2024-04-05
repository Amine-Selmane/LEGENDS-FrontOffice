import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import BookItemCard from "../Cards/BookItemCard"; // Assuming you have a BookItemCard component for displaying book items

function PopularBooks({ heading }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch books from the backend API when the component mounts
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      // Fetch books from your backend API
      const response = await fetch("http://localhost:5000/books"); // Replace "/api/books" with your actual API endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      const data = await response.json();
      setBooks(data); // Update component state with fetched books
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  return (
    <section className="popular-books-section">
      <div className="container">
        {heading && (
          <div className="row">
            <div className="col-md-8">
              <h2 className="sec-title">
                <span>Explore</span> Our Popular Books
              </h2>
            </div>
            <div className="col-md-4">
              <a className="read-more" href="#">
                Browse Online Books <i className="arrow_right"></i>
              </a>
            </div>
          </div>
        )}
        <div className="row">
          <div className="col-lg-12">
            <div className="d-flex flex-wrap justify-content-between">
              {/* Render fetched books */}
              {Array.isArray(books) && books.length > 0 ? (
                books.map((book) => (
                  <BookItemCard
                    key={book.id} // Assuming each book has a unique ID
                    book={book}
                  > <img src={bookImage} alt={book.title}  />
                  <p>Price: ${book.price}</p>
                    {/* You can place the book image or other content here */}
                  </BookItemCard>
                ))
              ) : (
                <p>No books available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

PopularBooks.propTypes = {
  heading: PropTypes.bool,
};

export default PopularBooks;
