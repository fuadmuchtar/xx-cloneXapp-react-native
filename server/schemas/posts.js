const redis = require("../config/redisConnection");
const PostsModel = require("../models/PostsModel")

// Query - Get Posts: mengambil daftar post berdasarkan yang terbaru

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

// Mutation - Follow User: untuk kebutuhan memfollow user
// Query - Get Post by Id: mengambil post berdasarkan id beserta data komentar dan likes
// Mutation - Comment Post: untuk menambahkan komentar pada post
// Redis - Invalidate cache pada Add Post (Mutation)
// Lookup - Mengambil data user ketika mengambil data Post
// Lookup - Mengambil data following dan followers ketika mengambil data Profile User

module.exports = { typeDefs, resolvers }