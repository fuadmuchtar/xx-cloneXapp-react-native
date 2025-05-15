const { ObjectId } = require("mongodb")
const { database } = require("../config/mongodb")

class PostsModel {
    static collection() {
        return database.collection("posts")
    }

    static async getAll() {
        const data = await this.collection().aggregate(
            [
                { $sort: { updatedAt: -1 } }
            ]
        ).toArray()

        return data
    }

    static async addPost(newPost, id) {
        const { content } = newPost

        if (!content) {
            throw new Error("Content is required")
        }

        const addedPost = {
            ...newPost,
            authorId: new ObjectId(String(id)),
            createdAt: new Date(),
            updatedAt: new Date()
        }

        const post = await this.collection().insertOne(addedPost)

        return "Create post Success"
    }

    static async likePost(id, username) {
        const post = await this.collection().findOne({ _id: new ObjectId(String(id)) })
        if (!post) {
            throw new Error("Post not found")
        }

        await this.collection().updateOne(
            { _id: new ObjectId(String(id)) },
            { $push: { likes: { username: username, createdAt: new Date(), updatedAt: new Date() } } }
        )
        return "Like post Success"
    }

    static async commentPost(id, content, username) {
        if (!content) {
            throw new Error("Comment is required")
        }

        const post = await this.collection().findOne({ _id: new ObjectId(String(id)) })
        if (!post) {
            throw new Error("Post not found")
        }

        await this.collection().updateOne(
            { _id: new ObjectId(String(id)) },
            { $push: { comments: { content: content, username: username, createdAt: new Date(), updatedAt: new Date() } } }
        )

        return "Comment post Success"
    }

    static async getPostById(id) {
        const post = await this.collection()
            .aggregate([
                {
                    '$match': {
                        '_id': new ObjectId(String(id))
                    }
                }, {
                    '$lookup': {
                        'from': 'users',
                        'localField': 'comments.username',
                        'foreignField': 'username',
                        'as': 'commentsUser'
                    }
                }, {
                    '$lookup': {
                        'from': 'users',
                        'localField': 'likes.username',
                        'foreignField': 'username',
                        'as': 'likesUser'
                    }
                }, {
                    '$lookup': {
                        'from': 'users',
                        'localField': 'authorId',
                        'foreignField': '_id',
                        'as': 'authorDetail'
                    }
                }, {
                    '$unwind': {
                        'path': '$authorDetail',
                        'preserveNullAndEmptyArrays': false
                    }
                }
            ]).toArray()
        if (!post) {
            throw new Error("Post not found")
        }
        return post[0]
    }
}

module.exports = PostsModel