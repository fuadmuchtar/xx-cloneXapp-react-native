const { database } = require("../config/mongodb")

class UserModel {
    static collection() {
        return database.collection("users")
    }

    static async create(newUser) {
        return await this.collection().insertOne(newUser)
    }

    static async getAll() {
        return await this.collection().find().toArray()
    }
}

module.exports = UserModel