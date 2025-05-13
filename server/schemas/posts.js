const PostsModel = require("../models/PostsModel")

const typeDefs = `#graphql
    type Posts {
        _id: ID
        content: String
        imgUrl: String
        authorId: ID
    }

    type Query {
        posts: [Posts]
    }
`;

const resolvers = {
    Query: {
        posts: async () => {
            const posts = await PostsModel.getAll()
            return posts
        }
    }
}

module.exports = { typeDefs, resolvers }