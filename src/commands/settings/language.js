const { mongo_db } = process.env;
const Command = require("@structures/Command");
const createEmbed = require("@utils/CreateEmbed");
const getCollection = require("@utils/GetCollection");

module.exports = class LanguageCommand extends Command {
    constructor(client) {
        super(client, {
            name: "language",
            group: "settings",
            memberName: "language",
            guildOnly: true,
            description: "Allows you to set the bot's language.",
            args: [
                {
                    key: "language",
                    prompt: "What language do you want to use?",
                    type: "string",
                    oneOf: client.locales,
                }
            ]
        });
    };

    run(message, { language }) {
        let translations = this.client.getServerLocale(message.guild.id);

        if(!message.member.hasPermission("ADMINISTRATOR") && !this.client.isOwner(message.author)) {
            return message.reply(translations.GLOBAL.ADMIN_ONLY);
        };

        getCollection(mongo_db, "Guild Settings", async function(collection, client) {
            let guildData = await collection.findOne({ GuildID: message.guild.id });

            await collection.updateOne(guildData, { $set: { Language: language } });
            return client.close();
        });

        message.guild.locale = language;

        let embed = createEmbed({
            title: `${message.client.user.username}: Language`,
            description: `Successfully set language to ${language}`
        });

        return message.say(embed);
    };
};
