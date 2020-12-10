const express = require('express');
const Book = require('./models/Books');
const Page = require('./models/Pages');
const app = express();
app.use(express.json());


// POST BOOKS
app.post('/books', (req, res, next) => {
  Book
    .insert(req.body)
    .then(book => res.send(book))
    .catch(next);
});

app.get('/books', (req, res, next) => {
  Book
    .find()
    .then(books => res.send(books))
    .catch(next);
});
// PROBLEM CHILD AGIAN ----------------------------------
app.get('/books/:id', (req, res, next) => {
  Book
    .findById(req.params.id)
    .then(book => res.send(book))
    .catch(next);
});
// ----------------------------------

app.put('/books/:id', (req, res, next) => {
  Book
    .update(req.params.id, req.body)
    .then(book => res.send(book))
    .catch(next);
});

app.delete('/books/:id', (req, res, next) => {
  Book
    .delete(req.params.id)
    .then(book => res.send(book))
    .catch(next);
});

// POST PAGES
app.post('/pages', (req, res, next) => {
  Page
    .insert(req.body)
    .then(page => res.send(page))
    .catch(next);
});


app.get('/pages', (res) => {
  Page
    .find()
    .then(page => res.send(page));
});
app.get('/pages/:id', (req, res, next) => {
  Page
    .findById(req.params.id)
    .then(page => res.send(page))
    .catch(next);
});

app.put('/pages/:id', (req, res, next) => {
  Page
    .update(req.params.id, req.body)
    .then(page => res.send(page))
    .catch(next);
});

app.delete('/pages/:id', (req, res, next) => {
  Page
    .delete(req.params.id)
    .then(page => res.send(page))
    .catch(next);
});

module.exports = app;
// 41:41 min speaker
