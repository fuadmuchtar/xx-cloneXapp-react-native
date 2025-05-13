const { database } = require("../config/mongodb")

class PostsModel {
    static collection() {
        return database.collection("posts")
    }

    static async getAll() {
        return await this.collection().find().toArray()
    }
}

module.exports = PostsModel