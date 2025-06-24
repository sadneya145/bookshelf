import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BookSearchPage from './pages/BookSearchPage';
import BookshelfPage from './pages/BookshelfPage';
import HomePage from './pages/HomePage';
import './App.css';

const App = () => {
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    const storedBookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    setBookshelf(storedBookshelf);
  }, []);

  const addToBookshelf = (book) => {
    const newBookshelf = [...bookshelf, book];
    setBookshelf(newBookshelf);
    localStorage.setItem('bookshelf', JSON.stringify(newBookshelf));
  };

  const removeFromBookshelf = (index) => {
    const newBookshelf = bookshelf.filter((_, i) => i !== index);
    setBookshelf(newBookshelf);
    localStorage.setItem('bookshelf', JSON.stringify(newBookshelf));
  };

  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <span className="nav-link ">Book Haven</span>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/bookshelf" className="nav-link">My Bookshelf</Link>
          <Link to="/search" className="nav-link">Search</Link>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage addToBookshelf={addToBookshelf} />} />
          <Route path="/bookshelf" element={<BookshelfPage bookshelf={bookshelf} removeFromBookshelf={removeFromBookshelf} />} />
          <Route path="/search" element={<BookSearchPage addToBookshelf={addToBookshelf} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
