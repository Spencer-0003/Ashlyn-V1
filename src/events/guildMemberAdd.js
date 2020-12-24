const { mongo_db } = process.env;
const getCollection = require("@utils/GetCollection");
const createEmbed = require("@utils/CreateEmbed");

module.exports = (client, member) => {
    if (member.bot) return;

    getCollection(mongo_db, "Auto Moderation", async function(collection, _client) {
        let guildData = await collection.findOne({ GuildID: member.guild.id });

        if (guildData && guildData.NoAlts == "true") {
            if (member.user.createdAt < "259200000") {
                let embed = createEmbed({
                    title: `${client.user.username}: Moderation`,
                    description: `You have been flagged as an alt and have been auto banned. DM ${member.guild.owner.tag} to appeal.`
                });

                try {
                    await member.send(embed);
                } finally {
                    member.ban({
                        reason: "Suspected alt."
                    });
                };
            };
        };

        return _client.close();
    });

    getCollection(mongo_db, "Auto Roles", async function(collection, _client) {
        let guildData = await collection.findOne({ GuildID: member.guild.id });

        if (guildData) {
            let role = guildData.Role;
            await member.roles.add(role);
        };

        return _client.close();
    });
};