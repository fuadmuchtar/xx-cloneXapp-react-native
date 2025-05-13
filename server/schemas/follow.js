const FollowModel = require("../models/FollowModel")

const typeDefs = `#graphql
    type Follow {
        _id: ID
        followingId: ID
        followerId: ID
    }

    type Query {
        follow: [Follow]
    }
`;

const resolvers = {
    Query: {
        follow: async () => {
            const follow = await FollowModel.getAll()
            return follow
        }
    }
}

module.exports = { typeDefs, resolvers }