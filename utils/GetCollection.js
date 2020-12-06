const { mongo_url } = process.env;

const MongoDB = require("mongodb");
const MongoClient = MongoDB.MongoClient;

module.exports = (name, coll, cb) => {
    MongoClient.connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
        if (err) throw err;

        const db = client.db(name);
        const collection = db.collection(coll);
        cb(collection, client);
    });
};