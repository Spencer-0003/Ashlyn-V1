const Command = require("@structures/Command");
const createEmbed = require("@utils/CreateEmbed");

module.exports = class InfoCommand extends Command {
    constructor(client) {
        super(client, {
            name: "info",
            group: "util",
            memberName: "info",
            description: "Gives you information about me.",
        });
    };

    run(message) {
        let embed = createEmbed({
            title: `${message.client.user.username}: Info`,
            description: `Hi, I'm ${message.client.user.username}!`,
            message: [{ name: "Creator", value: "Spencer#0003" }, { name: "GitHub Repository", value: "https://github.com/Spencer-0003/Ashlyn" }, { name: "Support Server Invite", value: "https://discord.gg/wfyhsxZ6CV" }]
        });

        return message.say(embed);
    };
};