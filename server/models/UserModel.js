const { database } = require("../config/mongodb")

class UserModel {
    static collection() {
        return database.collection("users")
    }

    static async register(newUser) {
        return await this.collection().insertOne(newUser)
    }

    // static login

    static async getAll() {
        return await this.collection().find().toArray()
    }

    static async findUser(user, username) {
        const findUser = await this.collection().find({
            user: {
                $regex: user,
                $options: "i"
            },
            username: {
                $regex: username,
                $options: "i"
            }
        }).toArray()
        return findUser
    }
}

module.exports = UserModel