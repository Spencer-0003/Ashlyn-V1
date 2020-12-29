const { mongo_db } = process.env;
const Command = require("@structures/Command");
const createEmbed = require("@utils/CreateEmbed");
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
        value = Boolean(value);
        let translations = this.client.getServerLocale(message.guild.id).COMMANDS.MODERATION;

        if(!message.member.hasPermission("ADMINISTRATOR") && !this.client.isOwner(message.author)) {
            return message.reply(translations.GLOBAL.ADMIN_ONLY);
        };

        getCollection(mongo_db, "Guild Settings", async function(collection, client) {
            let guildData = await collection.findOne({ GuildID: message.guild.id });

            await collection.updateOne(guildData, { $set: { NoAlts: value } });

            return client.close();
        });

        this.client.serverSettings.set(message.guild.id, { NoAlts: value });

        let embed = createEmbed({
            title: `${message.client.user.username}: ${translations.TITLE}`,
            description: `Alt blocker set to: ${value.toString()}`
        });

        return message.say(embed).catch(console.error);
    };
};