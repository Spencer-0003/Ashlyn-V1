const { mongo_db } = process.env;
const Command = require("@structures/Command");
const getCollection = require("@utils/GetCollection");

module.exports = class BlockInvitesCommand extends Command {
    constructor(client) {
        super(client, {
            name: "blockinvites",
            group: "settings",
            memberName: "blockinvites",
            guildOnly: true,
            description: "Allows you to block advertising of servers.",
            args: [
                {
                    key: "value",
                    prompt: "True or false?",
                    type: "boolean",
                    oneOf: ["true", "false"],
                }
            ]
        });
    };

    async run(message, { value }) {
        if(!message.member.hasPermission("ADMINISTRATOR") && !this.client.isOwner(message.author)) {
            return message.reply("Only administrators may change the bot's settings.");
        };

        getCollection(mongo_db, "Auto Moderation", async function(collection, client) {
            let guildData = await collection.findOne({ GuildID: message.guild.id });

            if (!guildData) {
                await collection.insertOne({ GuildID: message.guild.id, Blocked: value });
            } else {
                await collection.updateOne(guildData, { $set: { GuildID: message.guild.id, Blocked: value.id } });
            };

            return client.close();
        });
    };
};