const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri)
const database = client.db("p3-gc1")

module.exports = { database }