const { ObjectId } = require("mongodb")
const { database } = require("../config/mongodb")

class FollowModel {
    static collection() {
        return database.collection("follow")
    }

    static async follow(followingId, userId) {
        if (followingId === userId) throw new Error("You can't follow yourself")

        const data = await this.collection().findOne({ followingId: new ObjectId(String(followingId)), followerId: new ObjectId(String(userId)) })
        if (data) {
            await this.collection().deleteOne({ _id: data._id })
            return "Unfollow Success"
        }

        const follow = {
            followingId: new ObjectId(String(followingId)),
            followerId: new ObjectId(String(userId)),
            createdAt: new Date(),
            updatedAt: new Date()
        }

        await this.collection().insertOne(follow)

        return "Follow Success"
    }
}

module.exports = FollowModel