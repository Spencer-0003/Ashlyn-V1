const { mongo_db } = process.env;
const getCollection = require("@utils/GetCollection");

module.exports = (client, guild) => {
    getCollection(mongo_db, "Guild Settings", async function(collection, _client) {
        await collection.findOneAndDelete({ GuildID: guild.id });

        return _client.close();
    });
};