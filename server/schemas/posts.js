const PostsModel = require("../models/PostsModel")

const typeDefs = `#graphql
    type Posts {
        _id: ID
        content: String!
        tags: [String]
        imgUrl: String
        authorId: ID!
        comments: [Comments]
        likes: [Likes]
        createdAt: String 
        updatedAt: String
    }

    type Comments {
        content: String!
        username: String!
        createdAt: String
        updatedAt: String
    }

    type Likes {
        username: String!
        createdAt: String
        updatedAt: String
    }

    type Query {
        posts: [Posts]
    }

    type Mutation {
        likePost(_id: ID!): String
    }
`;

const resolvers = {
    Query: {
        posts: async () => {
            const posts = await PostsModel.getAll()
            return posts
        }
    },
    Mutation: {
        likePost: async (_, { _id }) => {
            const post = await PostsModel.likePost(_id)
            return post
        }
    }
}

module.exports = { typeDefs, resolvers }