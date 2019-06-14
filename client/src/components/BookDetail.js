import React, { Component } from 'react';
import axios from 'axios';

import { getBookQuery } from '../queries/queries';

class BookDetail extends Component {
  state = {
    book: null
  }

  constructor(props) {
    super(props);

    this.showBook = this.showBook.bind(this);
  }

  componentWillReceiveProps(props) {
    let {id} = props;

    this.showBook(id);
  }

  showBook(id) {
    axios({
      url: 'http://localhost:4000/graphql',
      method: 'post',
      data: {
        query: getBookQuery,
        variables: {
          id: id,
        }
      }
    }).then((result) => {
      this.setState({book: result.data.data.book});
    }).catch(error => console.log(error));
  }

  render() {
    let {book} = this.state;

    if(!book) {
      return null;
    }
 
    return (
      <div id="book-detail">
        <h2>{book.name}</h2>
        <h3>{book.genre}</h3>
        <h3>{book.author.name}</h3>
        {
          book.author.books.length ? (
            book.author.books.map((book, index) => {
              return <p key={`${index}`}>{book.name}</p>
            })
          )
          : null
        }
      </div>
    );
  }
}

export default BookDetail;
