const { mongo_db } = process.env;
const getCollection = require("@utils/GetCollection");

module.exports = (client, member) => {
    if (member.bot) return;

    getCollection(mongo_db, "Auto Roles", async function(collection, _client) {
        let guildData = await collection.findOne({ GuildID: member.guild.id });

        if (guildData) {
            let role = guildData.Role;
            await member.roles.add(role);
        };

        return _client.close();
    });
};