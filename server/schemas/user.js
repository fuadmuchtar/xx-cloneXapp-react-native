const UserModel = require("../models/UserModel")

const typeDefs = `#graphql
    type User {
        _id: ID
        name: String
        username: String!
        email: String!
        password: String!
    }

    type Query {
        users: [User]
    }

    type Mutation {
        register(name: String, username: String, email: String, password: String): String
    }
`;

const resolvers = {
    Query: {
        users: async () => {
            const users = await UserModel.getAll()
            return users
        }
    },
    Mutation: {
        register: async (_, { name, username, email, password }) => {
            let newUser = { name, username, email, password }

            await UserModel.create(newUser)

            return "Success"
        }
    }
}

module.exports = { typeDefs, resolvers }