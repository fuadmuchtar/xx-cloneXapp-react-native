const redis = require("../config/redisConnection");
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
        addPost(content: String!, tags: [String], imgUrl: String): String
        likePost(_id: ID!): String
    }
`;

const resolvers = {
    Query: {
        posts: async (_, __, { auth }) => {
            await auth()

            const postsRedis = JSON.parse(await redis.get("posts"))
            if (postsRedis) return postsRedis

            const posts = await PostsModel.getAll()
            redis.set("posts", JSON.stringify(posts))
            return posts
        }
    },
    Mutation: {
        addPost: async (_, { content, tags, imgUrl }, { auth }) => {
            const newPost = { content, tags, imgUrl }
                                                                                                                                                                                                                                                                                                                     
            const {_id: id} = await auth()
            const post = await PostsModel.addPost(newPost, id)
            redis.del("posts")
            return post
        },
        likePost: async (_, { _id }) => {
            const post = await PostsModel.likePost(_id)
            return post
        }
    }
}

module.exports = { typeDefs, resolvers }