const { mongo_db } = process.env;
const Command = require("@structures/Command");
const getCollection = require("@utils/GetCollection");

module.exports = class BlockAltsCommand extends Command {
    constructor(client) {
        super(client, {
            name: "blockalts",
            group: "settings",
            memberName: "blockalts",
            guildOnly: true,
            description: "Allows you to block alt accounts from this server.",
            args: [
                {
                    key: "value",
                    prompt: "True or false?",
                    type: "string",
                    oneOf: ["true", "false"],
                }
            ]
        });
    };

    async run(message, { value }) {
        let translations = this.client.getServerLocale(message.guild.id);

        if(!message.member.hasPermission("ADMINISTRATOR") && !this.client.isOwner(message.author)) {
            return message.reply(translations.GLOBAL.ADMIN_ONLY);
        };

        getCollection(mongo_db, "Auto Moderation", async function(collection, client) {
            let guildData = await collection.findOne({ GuildID: message.guild.id });

            if (!guildData) {
                await collection.insertOne({ GuildID: message.guild.id, NoInvites: "false", NoAlts: value });
            } else {
                await collection.updateOne(guildData, { $set: { GuildID: message.guild.id, NoInvites: guildData.NoInvites.Value, NoAlts: value } });
            };

            return client.close();
        });
    };
};