require("dotenv").config();
const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require("@apollo/server/standalone")
const { typeDefs: userTypeDefs, resolvers: userResolvers } = require("./schemas/user")
const { typeDefs: postsTypeDefs, resolvers: postsResolvers } = require("./schemas/posts")
const { typeDefs: followTypeDefs, resolvers: followResolvers } = require("./schemas/follow");
const { verifyAccessToken } = require('./helpers/jwt');
const UserModel = require('./models/UserModel');

const server = new ApolloServer({
    typeDefs: [userTypeDefs, postsTypeDefs, followTypeDefs],
    resolvers: [userResolvers, postsResolvers, followResolvers]
})

startStandaloneServer(server, {
    listen: { port: 3000 },
    context: ({ req }) => {
        return {
            auth: async () => {
                const authorization = req.headers.authorization
                if (!authorization) throw new Error("Please login first")

                const [type, token] = authorization.split(" ")
                if (type !== "Bearer") throw new Error("Invalid token")

                const payload = verifyAccessToken(token)
                if (!payload) throw new Error("Invalid token")

                const user = await UserModel.findById(payload._id)
                if (!user) throw new Error("User not found")

                return user
            }
        }
    }
}).then(({ url }) => {
    console.log(`Server can be access at: ${url}`)
})