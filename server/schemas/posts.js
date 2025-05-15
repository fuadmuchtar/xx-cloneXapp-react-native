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
        commentsUser: [userDetail]
        likesUser: [userDetail]
        authorDetail: userDetail
    }

    type userDetail {
        name: String
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
        postById(_id: ID!): Posts
    }

    type Mutation {
        addPost(content: String!, tags: [String], imgUrl: String): String
        likePost(_id: ID!): String
        commentPost(_id: ID!, content: String!): String
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
        },
        postById: async (_, { _id }, { auth }) => {
            await auth()
            const post = await PostsModel.getPostById(_id)
            return post
        }
    },
    Mutation: {
        addPost: async (_, { content, tags, imgUrl }, { auth }) => {
            const newPost = { content, tags, imgUrl }
            const { _id: id } = await auth()

            const post = await PostsModel.addPost(newPost, id)
            redis.del("posts")
            return post
        },
        likePost: async (_, { _id }, { auth }) => {
            let user = await auth()

            const post = await PostsModel.likePost(_id, user.username)
            redis.del("posts")
            return post
        },
        commentPost: async (_, { _id, content }, { auth }) => {
            let user = await auth()

            const post = await PostsModel.commentPost(_id, content, user.username)
            redis.del("posts")
            return post
        }
    }
}

// Lookup - Mengambil data user ketika mengambil data Post
// Lookup - Mengambil data following dan followers ketika mengambil data Profile User

module.exports = { typeDefs, resolvers }