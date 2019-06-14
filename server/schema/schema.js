const graphql = require('graphql');
// const _ = require('lodash');
// const faker = require('faker');
const mongoose = require('mongoose');
// const ObjectId = require('mongoose').Types.ObjectId;

const Author = require('../models/author');
const Book = require('../models/book');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

// const books = [
//   { name: faker.random.words(4), genre: 'Fantasy', id: '1', authorId: '1' },
//   { name: faker.random.words(4), genre: 'Fantasy', id: '2', authorId: '2' },
//   { name: faker.random.words(4), genre: 'Sci-Fi', id: '3', authorId: '3' },
//   { name: faker.random.words(4), genre: 'Fantasy', id: '4', authorId: '1' },
//   { name: faker.random.words(4), genre: 'Fantasy', id: '5', authorId: '2' },
//   { name: faker.random.words(4), genre: 'Sci-Fi', id: '6', authorId: '3' },
// ];

// const authors = [
//   { name: faker.fake("{{name.firstName}} {{name.lastName}}"),
//     age: faker.random.number({
//       'min': 10,
//       'max': 80
//     }),
//     id: '1'},
//   { name: faker.fake("{{name.firstName}} {{name.lastName}}"),
//     age: faker.random.number({
//       'min': 10,
//       'max': 80
//     }),
//     id: '2'},
//   { name: faker.fake("{{name.firstName}} {{name.lastName}}"),
//     age: faker.random.number({
//       'min': 10,
//       'max': 80
//     }),
//     id: '3'},
// ];

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return _.filter(books, { authorId: parent.id })
        return Book.find({ authorId: parent.id });
      }
    }
  }),
});

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // return _.find(authors, { id: parent.authorId })
        return Author.findById(parent.authorId);
      }
    }
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return books
        // //return _.map(books)
        return Book.find({});
      }
    },
    book: {
      type: BookType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {
        // return _.find(books, { id: args.id })
        return Book.findById(args.id);
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        // return authors
        // // return _.map(authors)
        return Author.find({});
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {
        // return _.find(authors, { id: args.id })
        // return Author.findById(args.id); # error Cast to ObjectId failed for value \"2\" at path \"_id\" for model 
        return Author.findById(args.id);
      }
    }
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age
        });
        return author.save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        });
        return book.save();
      }
    },
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});