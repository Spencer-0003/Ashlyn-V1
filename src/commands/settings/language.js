const { bot_name } = process.env;
const Command = require("@structures/Command");
const createEmbed = require("@utils/CreateEmbed");

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
                    oneOf: ["english", "spanish", "dutch"],
                }
            ]
        });
    };

    run(message, { language }) {
        let translations = this.client.getServerLocale(message.guild.id);

        if(!message.member.hasPermission("ADMINISTRATOR") && !this.client.isOwner(message.author)) {
            return message.reply(translations.GLOBAL.ADMIN_ONLY);
        };

        message.guild.locale = language;

        let embed = createEmbed({
            title: `${bot_name}: Language`,
            description: `Successfully set language to ${language}`
        });

        return message.say(embed);
    };
};