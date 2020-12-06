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
        let embed = createEmbed({
            title: "Ashlyn: Ping",
            description: `My ping is ${this.client.ws.ping}ms.`
        });

        return message.say(embed);
    };
};