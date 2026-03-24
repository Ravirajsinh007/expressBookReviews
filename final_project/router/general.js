const express = require('express');
const axios = require('axios');
const books = require("./booksdb.js");

const public_users = express.Router();

// Get all books (async)
public_users.get('/async/books', async (req, res) => {
  try {
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Get by ISBN (Promise)
public_users.get('/isbn/:isbn', (req, res) => {
  const isbn = req.params.isbn;

  new Promise((resolve, reject) => {
    if (books[isbn]) {
      resolve(books[isbn]);
    } else {
      reject("Book not found");
    }
  })
  .then(data => res.json(data))
  .catch(err => res.status(404).json({ message: err }));
});

// Get by Author (async)
public_users.get('/author/:author', async (req, res) => {
  const author = req.params.author;

  const result = Object.values(books).filter(book => book.author === author);
  return res.json(result);
});

// Get by Title (async)
public_users.get('/title/:title', async (req, res) => {
  const title = req.params.title;

  const result = Object.values(books).filter(book => book.title === title);
  return res.json(result);
});

// Get review
public_users.get('/review/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  return res.json(books[isbn].reviews);
});

module.exports.general = public_users;
