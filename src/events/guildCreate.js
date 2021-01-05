const { mongo_db } = process.env;
const createEmbed = require("@utils/CreateEmbed");
const getCollection = require("@utils/GetCollection");

module.exports = async (client, guild) => {
    let guildSchema = require("@schemas/guild");

    let embed = createEmbed({
        title: `${client.user.username}: Welcome`,
        description: `Thanks for adding me to ${guild.name}! To get a list of my commands, use !help`
    });

    await getCollection(mongo_db, "Guild Settings", async function(collection, _client) {
        guildSchema.GuildID = guild.id;
        await collection.insertOne(guildSchema);

        return _client.close();
    });

    if (guild.systemChannel && guild.systemChannel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
        return guild.systemChannel.send(embed);
    } else {
        let defaultChannel;
        guild.channels.cache.map(channel => {
            if (channel.type == "text" && channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
                defaultChannel = channel;
                return;
            };
        });

        return defaultChannel.send(embed);
    };
};