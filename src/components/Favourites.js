import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  // Function to refresh favorites after add/remove
  const refreshFavorites = () => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  };

  return (
    <div className="favorites-page">
      <h2>My Favorite Books</h2>
      {favorites.length === 0 ? (
        <p>No favorite books yet. Go add some ❤️</p>
      ) : (
        <div className="book-list">
          {favorites.map((book) => (
            <BookCard key={book.key} book={book} onToggle={refreshFavorites} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
