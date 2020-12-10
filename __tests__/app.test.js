const fs = require('fs');
const pool = require('../lib/utils/pool.js');
const request = require('supertest');
const app = require('../lib/utils/app.js');
const Book = require('../lib/utils/models/Books.js');
const Page = require('../lib/utils/models/Pages.js');

describe('app tests for one to many', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  });

  it('creates a book', async () => {
    const res = await request(app)
      .post('/books')
      .send({
        title: 'creates book 1',
        description: 'create book should go here',
        author: 'Donny'
      });
    expect(res.body).toEqual({
      id: '1',
      title: 'creates book 1',
      description: 'create book should go here',
      author: 'Donny'
    });
  });

  // GET
  it('Get All books', async () => {
    const books = await Promise.all([
      {
        title: 'get book 1',
        description: 'create book should go here',
        author: 'Donny1'
      },
      {
        title: 'get book 1',
        description: 'create book should go here',
        author: 'Donny2'
      },
      {
        title: 'get book 1',
        description: 'create book should go here',
        author: 'Donny3'
      }
    ].map(book => Book.insert(book)));
    const res = await request(app)
      .get('/books');
    expect(res.body).toEqual(expect.arrayContaining(books));
    expect(res.body).toHaveLength(books.length);
  });

  // THE PROBLEM CHILD -----------------------
  it('Get by id', async () => {
    const book = await Book.insert({ title: 'GET id', description: 'GET id should go here', author: 'donny' });
    const pages = await Promise.all([
      { length: 23, bookId: book.id },
      { length: 99, bookId: book.id },
      { length: 1, bookId: book.id }
    ].map(page => Page.insert(page)));

    const res = await request(app)
      .get(`/books/${book.id}`);
    expect(res.body).toEqual({
      ...book,
      pages: expect.arrayContaining(pages)
    });
  });
  //  ------------------------------------------

  it('UPDATE a book', async () => {
    const book = await Book.insert({ title: 'get id', description: 'get id should go here', author: 'donny' });
    const res = await request(app)
      .put(`/books/${book.id}`)
      .send({
        title: 'UPdate book',
        description: 'UPDATE book should go here',
        author: 'UPDATE DONNiE'
      });

    expect(res.body).toEqual({
      ...book,
      title: 'UPdate book',
      description: 'UPDATE book should go here',
      author: 'UPDATE DONNiE'
    });
  });
  it('DELETES book', async () => {
    const book = await Book.insert({ title: 'DELETE ID', description: 'DELETE ID should go here', author: 'DELETE MYSELF' });
    const res = await request(app)
      .delete(`/books/${book.id}`);
    expect(res.body).toEqual(book);
  });
});
