const { mongo_db, bot_name } = process.env;

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

        getCollection(mongo_db, "Auto Roles", async function(collection, client) {
            let guildData = await collection.findOne({ GuildID: message.guild.id });

            if (!guildData) {
                await collection.insertOne({ GuildID: message.guild.id, Role: role.id });
            } else {
                await collection.updateOne(guildData, { $set: { GuildID: message.guild.id, Role: role.id } });
            };

            return client.close();
        });

        let embed = createEmbed({
            title: `${bot_name}: ${translations.COMMANDS.AUTO_ROLE.TITLE}`,
            description: translations.COMMANDS.AUTO_ROLE.CONFIRMATION_MESSAGE
        });

        return message.say(embed);
    };
};