import React, { Component } from 'react';

import BookList from './components/BookList';
import AddBook from './components/AddBook';

class App extends Component {
  state = {
    hasBookAdded: false,
  }

  addBook(params) {
    this.setState({hasBookAdded: true});
  }

  render() {
    return (
      <div id="main">
        <h1>Kelsy's Ready List</h1>
        <BookList />
        <AddBook callback={this.addBook.bind(this)} />
      </div>
    );
  }
}

export default App;
