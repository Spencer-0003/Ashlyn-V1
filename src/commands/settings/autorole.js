const { mongo_db } = process.env;

const Command = require("@structures/Command");
const createEmbed = require("@utils/CreateEmbed");
const getCollection = require("@utils/GetCollection");

module.exports = class AutoRoleCommand extends Command {
    constructor(client) {
        super(client, {
            name: "autorole",
            group: "settings",
            memberName: "autorole",
            guildOnly: true,
            description: "Allows you to auto role members when they join your server.",
            args: [
                {
                    key: "role",
                    prompt: "What role would like to set",
                    type: "role"
                }
            ]
        });
    };

    async run(message, { role }) {
        let translations = this.client.getServerLocale(message.guild.id);

        if(!message.member.hasPermission("ADMINISTRATOR") && !this.client.isOwner(message.author)) {
            return message.reply(translations.GLOBAL.ADMIN_ONLY);
        };

        getCollection(mongo_db, "Guild Settings", async function(collection, client) {
            let guildData = await collection.findOne({ GuildID: message.guild.id });

            await collection.updateOne(guildData, { $set: { AutoRole: role.id } });

            return client.close();
        });

        let embed = createEmbed({
            title: `${message.client.user.username}: ${translations.COMMANDS.AUTO_ROLE.TITLE}`,
            description: translations.COMMANDS.AUTO_ROLE.CONFIRMATION_MESSAGE
        });

        return message.say(embed);
    };
};