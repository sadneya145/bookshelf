# 📚 Book Haven

Welcome to Book Haven, a React application that allows users to search for books using the Open Library API and manage a personal bookshelf. Users can search for books, view random book recommendations, add books to their bookshelf, and remove books from their bookshelf.

## ✨ Features

- **🏠 Home Page**: Displays a random selection of 10 books from the Open Library API.
- **🔍 Search Page**: Allows users to search for books by title, author, or keyword and display results dynamically as they type.
- **📖 Bookshelf Page**: Displays the books that the user has added to their personal bookshelf, with the option to remove books.

## 🚀 Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

- Node.js (v12 or later)
- npm (v6 or later)

### 🛠️ Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/your-repository-name.git
   cd your-repository-name
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm start
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## 🗂️ Project Structure

- `src/`
  - `components/`
    - `BookCard.js`: Component for displaying individual book details.
  - `pages/`
    - `BookSearchPage.js`: Component for the book search page.
    - `BookshelfPage.js`: Component for the bookshelf page.
    - `HomePage.js`: Component for the home page displaying random books.
  - `App.js`: Main app component that includes routing.
  - `index.js`: Entry point of the application.
- `public/`
  - `index.html`: HTML template.

## 📝 Usage

### Home Page

The home page displays a random selection of 10 books from the Open Library API. Each book is displayed in a card format with its cover image (if available), title, author(s), and a button to add the book to the bookshelf.

### Search Page

The search page allows users to search for books by title, author, or keyword. Results are displayed dynamically as the user types. Each result is displayed in a card format with its cover image (if available), title, author(s), and a button to add the book to the bookshelf.

### Bookshelf Page

The bookshelf page displays the books that the user has added to their personal bookshelf. Each book is displayed in a card format with its cover image (if available), title, author(s), and a button to remove the book from the bookshelf.

## 🤝 Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## 🙏 Acknowledgements

- [Open Library API](https://openlibrary.org/developers/api) for providing book data.
- [React](https://reactjs.org/) for the UI library.

## Built by Avan 💖

