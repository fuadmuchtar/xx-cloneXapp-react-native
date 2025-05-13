const { database } = require("../config/mongodb")

class PostsModel {
    static collection() {
        return database.collection("posts")
    }

    static async getAll() {
        return await this.collection().find().toArray()
    }

    static async likePost(_id) { // not fixed yet
        const post = await this.collection().findOne({ _id })
    }
}

module.exports = PostsModel