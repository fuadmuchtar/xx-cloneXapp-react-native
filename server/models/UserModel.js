const { database } = require("../config/mongodb")

class UserModel {
    static collection() {
        return database.collection("users")
    }

    static async getAll() {
        return await this.collection().find().toArray()
    }
}

module.exports = UserModel