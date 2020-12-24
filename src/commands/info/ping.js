const Command = require("@structures/Command");
const createEmbed = require("@utils/CreateEmbed");

module.exports = class PingCommand extends Command {
    constructor(client) {
        super(client, {
            name: "ping",
            group: "info",
            memberName: "ping",
            description: "Tells you the bot's ping."
        });
    };

    run(message) {
        let translations = this.client.getServerLocale(message.guild).COMMANDS.PING;
        let embedTitle = `${message.client.user.username}: ${translations.TITLE}`;

        let embed = createEmbed({
            title: embedTitle,
            description: `${translations.PING} ${this.client.ws.ping}ms.`
        });

        return message.say(embed);
    };
};