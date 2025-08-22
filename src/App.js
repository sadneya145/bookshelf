import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import DarkModeToggle from './components/DarkModeToogle';

const App = () => {
  const [bookshelf, setBookshelf] = useState([]);

  const addToBookshelf = (book) => {
    setBookshelf(prev => [...prev, book]);
  };

  return (
    <>
      <DarkModeToggle />
      <HomePage addToBookshelf={addToBookshelf} />
      {/* other routes/components */}
    </>
  );
};

export default App;
