const FollowModel = require("../models/FollowModel")

const typeDefs = `#graphql
    type Follow {
        _id: ID
        followingId: ID
        followerId: ID
        createdAt: String
        updatedAt: String
    }

    type Query {
        follow: [Follow]
    }

    type Mutation {
        follow(followingId: ID!): String
    }
`;

const resolvers = {
    Query: {
        follow: async () => {
            const follow = await FollowModel.getAll()
            return follow
        }
    },
    Mutation: {
        follow: async (_, { followingId }, { auth }) => {
            let user = await auth()

            let follow = await FollowModel.follow(followingId, user._id)

            return follow
        }
    }
}

module.exports = { typeDefs, resolvers }