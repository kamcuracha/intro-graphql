const getAuthorsQuery = `
{
  authors {
    id
    name
    age
    books {
      name
      genre
    }
  }
}
`

const getBooksQuery = `
{
  books {
    id
    name
    genre
    author {
      name
      age
    }
  }
}        
`

const getBookQuery = `
query($id: ID) {
  book(id: $id) {
    name
    genre
    author {
      name
      age
      books {
        name
        genre
      }
    }
  }
}        
`

const addBookMutation = `
  mutation addBook(
    $name: String!,
    $genre: String!,
    $authorId: ID!,
  ) {
  addBook(
    name: $name,
    genre: $genre,
    authorId: $authorId) {
      id
      name
      genre
      author {
        name
        age
      }
    }
  }
  `

export { getAuthorsQuery, getBooksQuery, addBookMutation, getBookQuery };