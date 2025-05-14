const { ObjectId } = require("mongodb");
const { database } = require("../config/mongodb")
const { hashPassword } = require("../helpers/bcrypt");


class UserModel {
    static collection() {
        return database.collection("users")
    }

    static async register(newUser) {
        const { username, email, password } = newUser

        if (!username || !email || !password) {
            throw new Error("All fields are required")
        }
        if (password.length < 5) {
            throw new Error("Password must be at least 6 characters")
        }

        let user = await this.collection().findOne({ username })
        if (user) {
            throw new Error("Username already exists")
        }

        user = await this.collection().findOne({ email })
        if (user) {
            throw new Error("Email already exists")
        }

        const hashedPassword = hashPassword(password)
        let addedUser = {...newUser, password: hashedPassword}

        await this.collection().insertOne(addedUser)

        return "User registered successfully"
    }

    static async findByEmail(email) {
        return await this.collection().findOne({ email })
    }

    static async findById(id) {
        const user = await this.collection().findOne({_id: new ObjectId(String(id))})
        return user
    }

    static async getAll() {
        return await this.collection().find().toArray()
    }
}

module.exports = UserModel