const Command = require("@structures/Command");
const createEmbed = require("@utils/CreateEmbed");

const moment = require("moment");
require("moment-duration-format");


module.exports = class UptimeCommand extends Command {
    constructor(client) {
        super(client, {
            name: "uptime",
            group: "info",
            memberName: "uptime",
            description: "Tells you the bot's uptime."
        });
    };

    run(message) {
        let uptime = moment.duration(this.client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
        let embed = createEmbed({
            title: "Aslhyn: Uptime",
            description: `My uptime is ${uptime}`
        });

        return message.say(embed);
    };
};