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
        users: [User],
        usersByNameUsername(user: String, username: String): [User]
    }

    type Mutation {
        register(name: String, username: String, email: String, password: String): String
        # login
    }
`;

const resolvers = {
    Query: {
        users: async () => {
            const users = await UserModel.getAll()
            return users
        },
        usersByNameUsername: async (_, { name, username }) => {
            const findUser = await UserModel.findUser(name, username)
            return findUser
        }
    },
    Mutation: {
        register: async (_, { name, username, email, password }) => {
            let newUser = { name, username, email, password }

            await UserModel.register(newUser)

            return "Success"
        },
        // login: async(_, {username, password}) => {
        // }
    }
}

module.exports = { typeDefs, resolvers }