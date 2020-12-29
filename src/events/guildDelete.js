const { mongo_db } = process.env;
const getCollection = require("@utils/GetCollection");

module.exports = (client, guild) => {
    getCollection(mongo_db, "Guild Settings", async function(collection, _client) {
        let guildData = await collection.findOne({ GuildID: guild.id });

        if (guildData) {
            await collection.findOneAndDelete({ GuildID: guild.id });
        };

        return _client.close();
    });
};