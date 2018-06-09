import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import mongoose from 'mongoose';


import typeDefs from './schema'
import resolvers from './resolvers'

let Schema = mongoose.Schema

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})


const userSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  email: String,
  posts: [{
    _id: Schema.Types.ObjectId,
    title: String,
    body: String
  }]
})
export const User = mongoose.model("User", userSchema);


mongoose.connect('mongodb://localhost:/user');





const PORT = 4000;

const app = express();

// bodyParser is needed just for POST.
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema, context: {User} }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql'}))

app.listen(PORT);
