import React, { useState, useEffect } from "react";

const BookCard = ({ book, onToggle }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(savedFavorites.some((fav) => fav.key === book.key));
  }, [book.key]);

  const toggleFavorite = () => {
    let savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorite) {
      // Remove from favorites
      savedFavorites = savedFavorites.filter((fav) => fav.key !== book.key);
    } else {
      // Add to favorites
      savedFavorites.push(book);
    }

    localStorage.setItem("favorites", JSON.stringify(savedFavorites));
    setIsFavorite(!isFavorite);

    // Notify parent to refresh (only if passed)
    if (onToggle) onToggle();
  };

  return (
    <div className="book-card">
      <img src={book.cover} alt={book.title} />
      <h3>{book.title}</h3>
      <p>{book.author}</p>

      <button onClick={toggleFavorite}>
        {isFavorite ? "❤️ Remove Favorite" : "🤍 Add Favorite"}
      </button>
    </div>
  );
};

export default BookCard;
