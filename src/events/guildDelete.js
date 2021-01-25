const { mongo_db } = process.env;
const getCollection = require("@utils/GetCollection");

module.exports = (_client, guild) => {
    getCollection(mongo_db, "Guild Settings", async function(collection, client) {
        await collection.findOneAndDelete({ GuildID: guild.id });

        return client.close();
    });
};