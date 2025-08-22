import React, { useState } from "react";
import BookSearch from "./pages/BookSearchPage";
import HomePage from "./pages/HomePage";
import DarkModeToggle from "./components/DarkModeToogle";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [bookshelf, setBookshelf] = useState([]);

  const addToBookshelf = (book) => {
    if (!bookshelf.some((b) => b.id === book.id)) {
      setBookshelf((prev) => [...prev, book]);
    }
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="logo">📚 BookHub</div>
        <div className="header-controls">
          <button
            className={`nav-btn ${currentPage === "home" ? "active" : ""}`}
            onClick={() => setCurrentPage("home")}
          >
            Home
          </button>
          <button
            className={`nav-btn ${currentPage === "search" ? "active" : ""}`}
            onClick={() => setCurrentPage("search")}
          >
            Search Books
          </button>
          <button
            className={`nav-btn ${currentPage === "bookshelf" ? "active" : ""}`}
            onClick={() => setCurrentPage("bookshelf")}
          >
            My Bookshelf
          </button>
          <DarkModeToggle />
        </div>
      </header>

      {/* Page Rendering */}
      <main className="main">
        {currentPage === "home" && <HomePage addToBookshelf={addToBookshelf} />}
        {currentPage === "search" && (
          <BookSearch addToBookshelf={addToBookshelf} />
        )}
        {currentPage === "bookshelf" && (
          <div className="bookshelf">
            <h2>My Bookshelf</h2>
            {bookshelf.length === 0 ? (
              <p>No books added yet 📖</p>
            ) : (
              <ul>
                {bookshelf.map((book) => (
                  <li key={book.id}>
                    <img src={book.thumbnail} alt={book.title} />
                    <div>
                      <h4>{book.title}</h4>
                      <p>{book.author}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
