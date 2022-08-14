const { ApolloServer, gql } = require('apollo-server');
const { MongoClient, ObjectId } = require('mongodb');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
dotenv.config();

const { DB_URI, DB_NAME, JWT_SECRET } = process.env;

const getToken = (user) => jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '30 days' });

const getUserFromToken = async (token, db) => {
  if (!token) { return null }

  const tokenData = jwt.verify(token, JWT_SECRET);
  if (!tokenData?.id) {
    return null;
  }
  return await db.collection('Users').findOne({ _id: ObjectId(tokenData.id) });
}

const typeDefs = gql`
  type Query {
    myIdeas: [TaskList!]!
    getTaskList(id: ID!): TaskList
  }

  type Mutation {
    signUp(input: SignUpInput!): AuthUser!
    signIn(input: SignInInput!): AuthUser!

    createIdea(title1: String!,title2:String!,description:String,summary:String): TaskList!
    updateIdea(id: ID!, summary: String!, description:String!): TaskList!
    deleteTaskList(id: ID!): Boolean!
  }

  input SignUpInput {
    email: String!
    password: String!
    name: String!
    avatar: String
  }

  input SignInInput {
    email: String!
    password: String!
  }

  type AuthUser {
    user: User!
    token: String!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    avatar: String
  }

  type TaskList {
    id: ID!
    createdAt: String!
    title1: String!
    title2:String!
    description:String
    summary:String
    progress: Float

    users: [User!]!
  }

`;

const resolvers = {
  Query: {
    myIdeas: async (_, __, { db, user }) => {
      if (!user) { throw new Error('Authentication Error. Please sign in'); }

      return await db.collection('IdeaList')
                                .find({ userIds: user._id })
                                .toArray();
    },

    getTaskList: async(_, { id }, { db, user }) => {
      if (!user) { throw new Error('Authentication Error. Please sign in'); }
      
      return await db.collection('IdeaList').findOne({ _id: ObjectId(id) });
    }
  },
  Mutation: {
    signUp: async (root,{input},{db}) =>{
      const hashedPassword = bcrypt.hashSync(input.password);
      const user = {
        ...input,
        email:input.email.toLowerCase(),
        password:hashedPassword,
      }
      //now save to database
      const result = await db.collection('Users').insertOne(user);
      
      return{
        // the schema suggests also id returned which is why below mutation I added a User:{id:...} to manage the extra parameter.
        user,
        token:getToken(user),
      }
    },

    signIn: async (_, { input }, { db }) => {
      const user = await db.collection('Users').findOne({ email: input.email.toLowerCase()});
      const isPasswordCorrect = user && bcrypt.compareSync(input.password, user.password);

      // if (!user || !isPasswordCorrect) {
        // throw new Error('Invalid credentials!');
      // }

      return {
        user,
        token: getToken(user),
      }
    },

    createIdea: async(_, { title1,title2,description,summary }, { db, user }) => {
      if (!user) { throw new Error('Authentication Error. Please sign in'); }

      const newIdea = {
        title1,
        title2,
        description,
        summary,
        createdAt: new Date().toISOString(),
        userIds: [user._id]
      }
      const result = await db.collection('IdeaList').insertOne(newIdea);
      return newIdea;
    },

    updateIdea: async(_, { id, summary,description }, { db, user }) => {
      if (!user) { throw new Error('Authentication Error. Please sign in'); }

      const result = await db.collection('IdeaList')
                            .updateOne({
                              _id: ObjectId(id)
                            }, {
                              $set: {
                                summary,
                                description
                              }
                            })
 
      return await db.collection('IdeaList').findOne({ _id: ObjectId(id) });
    },

    deleteTaskList: async(_, { id }, { db, user }) => {
      if (!user) { throw new Error('Authentication Error. Please sign in'); }
      
      // TODO only collaborators of this task list should be able to delete
      // await db.collection('IdeaList').removeOne({ _id: ObjectId(id) });

      const res = await db.collection('IdeaList').findOne({ _id: ObjectId(id) });
      if(res.userIds[0].toString() !== user._id.toString()){
        console.log("Bad USER!");
        return false;
      }
      else{
        await db.collection('IdeaList').deleteOne({ _id: ObjectId(id) });
        return true;
      } 
    },
    
  },

  User: {
    id: ({ _id, id }) => _id || id,
  },

  TaskList: {
    id: ({ _id, id }) => _id || id,
    users: async ({ userIds }, _, { db }) => Promise.all(
      userIds.map((userId) => (
        db.collection('Users').findOne({ _id: userId}))
      )
    ),
  },

};

const start = async () => {
  const client = new MongoClient(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  const db = client.db(DB_NAME);

  // The ApolloServer constructor requires two parameters: your schema
  // definition and your set of resolvers.
  const server = new ApolloServer({ 
    typeDefs, 
    resolvers, 
    context: async ({ req }) => {
      const user = await getUserFromToken(req.headers.authorization, db);
      return {
        db,
        user,
      }
    },
  });

  // The `listen` method launches a web server.
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
}

start();