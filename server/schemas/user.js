const UserModel = require("../models/UserModel")

const typeDefs = `#graphql
    type User {
        _id: ID
        name: String
        username: String
        email: String
        password: String
    }

    type Query {
        users: [User]
    }
`;

const resolvers = {
    Query: {
        users: async () => {
            const users = await UserModel.getAll()
            return users
        }
    }
}

module.exports = { typeDefs, resolvers }