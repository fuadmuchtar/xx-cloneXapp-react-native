const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require("@apollo/server/standalone")
const { typeDefs: userTypeDefs, resolvers: userResolvers } = require("./schemas/user")
const { typeDefs: postsTypeDefs, resolvers: postsResolvers } = require("./schemas/posts")
const { typeDefs: followTypeDefs, resolvers: followResolvers } = require("./schemas/follow")

const server = new ApolloServer({
    typeDefs: [userTypeDefs, postsTypeDefs, followTypeDefs],
    resolvers: [userResolvers, postsResolvers, followResolvers]
})

startStandaloneServer(server, {
    listen: { port: 3000 },
}).then(({ url }) => {
    console.log(`Server can be access at: ${url}`)
})