const { ObjectId } = require("mongodb")
const { database } = require("../config/mongodb")

class FollowModel {
    static collection() {
        return database.collection("follow")
    }

    static async follow(followingId, userId) {
        const follow = {
            followingId: new ObjectId(String(followingId)),
            followerId: new ObjectId(String(userId)),
            createdAt: new Date(),
            updatedAt: new Date()
        }

        await this.collection().insertOne(follow)

        return "Follow Success"
    }

    static async unfollow(followingId, userId) {
        await this.collection().deleteOne({ followingId: new ObjectId(String(followingId)), followerId: new ObjectId(String(userId)) });
        return "Unfollow Success"
    }
}

module.exports = FollowModel