import React, { Component } from 'react';
import axios from 'axios';

import { getBooksQuery } from '../queries/queries';

import BookDetail  from './BookDetail';

class BookList extends Component {
  state = {
    books: null,
    currentBook: null,
  }

  constructor(props) {
    super(props);

    this.showBooks = this.showBooks.bind(this);
  }

  componentWillMount() {
    this.showBooks();
  }

  showBooks() {
    axios({
      url: 'http://localhost:4000/graphql',
      method: 'post',
      data: {
        query: getBooksQuery
      }
    }).then((result) => {
      let books = result.data.data.books;
      this.setState({books});

    });
  }

  render() {
    let {books} = this.state;

    if(!books) {
      return null;
    }

    this.showBooks(); // re-render when App.js hits callback from AddBook.js

    return books.length ? (
      <div >
        <ul id="book-list">
          {books.map((book) => {
            return <li key={book.id} onClick={(e) => { this.setState({currentBook: book.id})}}>
              <h2>{book.name}</h2>
            </li>;
          })}
        </ul>
        <BookDetail id={this.state.currentBook} />
      </div>
    ) : null
  }
}

export default BookList;
