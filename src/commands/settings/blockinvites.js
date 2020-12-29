const { mongo_db } = process.env;
const Command = require("@structures/Command");
const getCollection = require("@utils/GetCollection");
const createEmbed = require("@utils/CreateEmbed");

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
                    type: "string",
                    oneOf: ["true", "false"],
                }
            ]
        });
    };

    async run(message, { value }) {
        value = Boolean(value);
        let translations = this.client.getServerLocale(message.guild.id).COMMANDS.BLOCK_INVITES;

        if(!message.member.hasPermission("ADMINISTRATOR") && !this.client.isOwner(message.author)) {
            return message.reply(translations.GLOBAL.ADMIN_ONLY);
        };

        getCollection(mongo_db, "Guild Settings", async function(collection, client) {
            let guildData = await collection.findOne({ GuildID: message.guild.id });

            await collection.updateOne(guildData, { $set: { NoInvites: value } });
            return client.close();
        });

        this.client.serverSettings.set(message.guild.id, { NoInvites: value });

        let embed = createEmbed({
            title: `${message.client.user.username}: ${translations.TITLE}`,
            description: `${translations.DESCRIPTION.format(value)}`
        });

        return message.say(embed);
    };
};