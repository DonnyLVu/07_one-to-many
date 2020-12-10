const pool = require('../pool');


module.exports = class Page {
  id;
  length;
  bookId;

  constructor(row) {
    this.id = String(row.id);
    this.length = row.length;
    this.bookId = String(row.book_id);
  }

  static async insert({ length, bookId }) {
    const { rows } = await pool.query(
      `INSERT INTO pages
      (length, book_id)
      VALUES ($1, $2)
      RETURNING *`,
      [length, bookId]
    );
    return new Page(rows[0]);
  }
  static async find() {
    const { rows } = await pool.query('SELECT * FROM pages');
    return rows.map(row => new Page(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `SELECT * 
      FROM pages
      WHERE id=$1`,
      [id]
    );
    if (!rows[0]) throw new Error(`No book with id ${id}`);
    return new Page(rows[0]);
  }

  static async update(id, { title, description, author }) {
    const { rows } = await pool.query(
      `UPDATE pages 
          SET title=$1,
              length=$2
          WHERE id=$3
          RETURNING *
        `,
      [title, description, author, id]
    );
    return new Page(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM pages WHERE id=$1 RETURNING *',
      [id]
    );
    return new Page(rows[0]);
  }
};
