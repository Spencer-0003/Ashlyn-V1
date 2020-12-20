const { bot_name } = process.env;
const Command = require("@structures/Command");
const createEmbed = require("@utils/CreateEmbed");

module.exports = class UptimeCommand extends Command {
    constructor(client) {
        super(client, {
            name: "languages",
            aliases: ["locales"],
            group: "info",
            memberName: "languages",
            description: `Tells you all languages supported by ${bot_name}.`
        });
    };

    run(message) {
        let languages = "";

        this.client.locales.forEach(language => {
            languages = languages += ` \`${language}\``;
        });

        let embed = createEmbed({
            title: "Languages available",
            message: [{ name: languages, value: "\u200b" }]
        });

        return message.channel.send(embed);
    };
};