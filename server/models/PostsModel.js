const { ObjectId } = require("mongodb")
const { database } = require("../config/mongodb")

class PostsModel {
    static collection() {
        return database.collection("posts")
    }

    static async getAll() {
        return await this.collection().find().toArray()
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
    static async likePost(_id) { // not fixed yet
        const post = await this.collection().findOne({ _id })
    }
}

module.exports = PostsModel