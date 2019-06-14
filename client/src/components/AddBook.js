import React, { Component } from 'react';
import axios from 'axios';

import { getAuthorsQuery, addBookMutation } from '../queries/queries';

class AddBook extends Component {
  state = {
    authors: null,
    name: '',
    genre: '',
    authorid: '',
  }

  constructor(props) {
    super(props);

    this.showAuthors = this.showAuthors.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentWillMount() {
    this.showAuthors();
  }

  showAuthors() {
    axios({
      url: 'http://localhost:4000/graphql',
      method: 'post',
      data: {
        query: getAuthorsQuery
      }
    }).then((result) => {
      let authors = result.data.data.authors;
      this.setState({authors});
      this.setState({authorid: authors[0].id});

    }).catch(error => console.log(error));
  }

  submitForm(event) {
    event.preventDefault();

    axios({
      url: 'http://localhost:4000/graphql',
      method: 'post',
      data: {
        query: addBookMutation,
        variables: {
          name: this.state.name,
          genre: this.state.genre,
          authorId: this.state.authorid,
        }
      }
    }).then((result) => {
      this.props.callback(result);
    }).catch(error => console.log(error));
  }

  render() {
    let {authors} = this.state;

    if(!authors) {
      return null;
    }

    return authors.length ? (
      <form className="add-book" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
          <label htmlFor="book">Book Name:</label>
          <input type="text" name="book" onChange={(e) => this.setState({name: e.target.value})} />
        </div>
        <div className="field">
          <label htmlFor="genre">Book Genre: </label>
          <input type="text" name="genre" onChange={(e) => this.setState({genre: e.target.value})} />
        </div>
        <div className="field">
          <label htmlFor="author">Book Author: </label>
          <select name="author" onChange={(e) => this.setState({authorid: e.target.value})}>
            {authors.map((author) => {
              return <option value={author.id} key={author.id}>{author.name}</option>;
            })}
          </select>
        </div>
        <button type="submit">+</button>
      </form>
    ) : null
  }
}

export default AddBook;
