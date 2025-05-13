const { database } = require("../config/mongodb")

class FollowModel {
    static collection() {
        return database.collection("follow")
    }

    static async getAll() {
        return await this.collection().find().toArray()
    }
}

module.exports = FollowModel