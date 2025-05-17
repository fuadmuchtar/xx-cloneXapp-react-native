const { comparePassword } = require("../helpers/bcrypt");
const { generateAccessToken } = require("../helpers/jwt");
const UserModel = require("../models/UserModel")

// Query - Get User by Id: untuk menampilkan profile user

const typeDefs = `#graphql
    type User {
        _id: ID
        name: String
        username: String!
        email: String!
        password: String!
        following: [followingDetail]
        followers: [followingDetail]
    }

    type LoginResponse {
        accessToken: String
    }

    type followingDetail {
        _id: String
        name: String
        username: String!
    }

    type Query {
        users: [User]
        searchUsers(input: String): [User]
        userById(id: ID!): User
    }

    type Mutation {
        register(name: String, username: String, email: String, password: String): String
        login(email: String, password: String): LoginResponse
        checkUser(input: String): Boolean
    }
`;

const resolvers = {
    Query: {
        users: async (_, __, { auth }) => {
            await auth()

            const users = await UserModel.getAll()
            return users
        },
        searchUsers: async (_, { input }, { auth }) => {
            await auth()
            const users = await UserModel.findUsers(input)
            return users
        },
        userById: async (_, { id }, { auth }) => {
            await auth()
            const user = await UserModel.findById(id)
            return user
        }
    },
    Mutation: {
        register: async (_, { name, username, email, password }) => {
            const newUser = { name, username, email, password }

            const user = await UserModel.register(newUser)

            return user
        },
        login: async (_, { email, password }) => {
            if (!email || !password) throw new Error("Email and password are required")

            const user = await UserModel.findByEmail(email)
            if (!user) throw new Error("User/password is invalid!")

            const isValid = comparePassword(password, user.password)
            if (!isValid) throw new Error("User/password is invalid")

            const accessToken = generateAccessToken({ _id: user._id })

            return { accessToken }
        },
        checkUser: async (_, { input }) => {
            if (!input) throw new Error("Email or username are required")

            const user = await UserModel.findOne(input)

            return user
        }
    }
}

module.exports = { typeDefs, resolvers }