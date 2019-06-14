const express = require('express');
const graphqlHTTP  = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors')

const app = express();

mongoose.connect('mongodb+srv://kamlig:1234@graphql-playlist-rdvhj.mongodb.net/test?retryWrites=true');
mongoose.connection.once('open', () => {
  console.log('Connected to GrapQL...');
})

app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(4000, () => {
  console.log('Listening on port 4000');
});