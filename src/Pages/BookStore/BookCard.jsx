import React from 'react';

const BookCard = ({ book }) => {
  // Check if book is defined before accessing its properties
  if (!book) {
    return <div>No book available</div>;
  }

  return (
    <div className="book-card">
      <p>Description: {book.description}</p>
      <p>Price: {book.price}</p>
      <p>File: {book.file}</p>
    </div>
  );
};

export default BookCard;
